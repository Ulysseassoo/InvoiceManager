<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Invoice;
use App\Entity\InvoiceRow;
use App\Entity\Order;
use App\Repository\CompanyRepository;
use DateTime;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Snappy\Pdf;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Twig\Environment;

final class OrderDataPersister implements ContextAwareDataPersisterInterface
{
	private $entityManager;

	public function __construct(
		EntityManagerInterface $entityManager,
		MailerInterface $mailer,
		Pdf $knpSnappyPdf,
		Environment $templating,
		CompanyRepository $companyRepository
	) {
		$this->entityManager = $entityManager;
		$this->mailer = $mailer;
		$this->knpSnappyPdf = $knpSnappyPdf;
		$this->templating = $templating;
		$this->companyRepository = $companyRepository;
	}

	public function supports($data, array $context = []): bool
	{
		return $data instanceof Order;
	}

	public function persist($data, array $context = [])
	{
		// call your persistence layer to save $data
		$this->entityManager->persist($data);
		$this->entityManager->flush();
		// Since it's here that we send the data to the database, we will send the invoice from here
		$invoice = new Invoice();
		$date = new DateTime();
		$uniqueId = $date->getTimestamp();
		$invoice->setUniqueId(intval($uniqueId));
		$invoice->setCreatedAt(new DateTimeImmutable());
		$invoice->setClientFirstname($data->getFirstname());
		$invoice->setClientLastname($data->getLastname());
		$invoice->setClientAddress($data->getAddress());
		$invoice->setClientPhoneNumber($data->getPhoneNumber());
		$invoice->setDueDate($data->getLastDate());

		// Save data to database
		$this->entityManager->persist($invoice);
		$this->entityManager->flush();

		// Then create the Invoice Rows
		$products = $data->getProducts();
		$totalOrderAmount = 0;
		foreach ($products as $product) {
			$row = new InvoiceRow();
			$row->setName($product->getName());
			$row->setAmount($product->getAmount());
			$row->setCommandId($product->getCommand()->getId());
			$this->entityManager->persist($row);
			$this->entityManager->flush();
			$totalOrderAmount += $product->getAmount();
		}

		// Selecting our Company
		$company = $this->companyRepository->find(1);

		// We create the invoice pdf
		$this->knpSnappyPdf->generateFromHtml(
			$this->templating->render("invoice/invoicepdf.html.twig", [
				"invoice" => $invoice,
				"company" => $company,
				"products" => $products,
				"order" => $data,
				"totalAmount" => $totalOrderAmount,
			]),
			__DIR__ . "..\\..\\InvoicePdf\\{$invoice->getUniqueId()}.pdf"
		);

		// Email to send after order creation
		$email = (new TemplatedEmail())
			->from("no-reply@Ubereats-society.com")
			->to("you@example.com")
			->subject("Invoice for a new order !")
			->htmlTemplate("invoiceCreated.html.twig")
			->attachFromPath(__DIR__ . "..\\..\\InvoicePdf\\{$invoice->getUniqueId()}.pdf")
			->context([
				"data" => $data,
			]);

		$this->mailer->send($email);
	}

	public function remove($data, array $context = [])
	{
		// call your persistence layer to delete $data
	}
}
