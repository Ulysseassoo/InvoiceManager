<?php

namespace App\Controller;

use App\Repository\CompanyRepository;
use App\Repository\InvoiceRepository;
use App\Repository\OrderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class InvoiceController extends AbstractController
{
	#[Route("/invoice", name: "invoice")]
	public function index(InvoiceRepository $invoiceRepository, CompanyRepository $companyRepository): Response {
		$invoice = $invoiceRepository->find(2);
		$company = $companyRepository->find(1);
		return $this->render("invoice/invoicepdf.html.twig", [
			"invoice" => $invoice,
			"company" => $company,
		]);
	}
}
