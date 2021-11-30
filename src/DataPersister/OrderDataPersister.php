<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

final class OrderDataPersister implements ContextAwareDataPersisterInterface
{
    private $entityManager;
    
    public function __construct(EntityManagerInterface $entityManager, MailerInterface $mailer)
    {
        $this->entityManager = $entityManager;
        $this->mailer = $mailer;
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
        $email = (new TemplatedEmail())
        ->from('no-reply@invoice-manger.com')
        ->to('you@example.com')
        ->subject('Time for Symfony Mailer!')
        ->htmlTemplate("invoice.html.twig")
        // ->attachFromPath('/path/to/documents/terms-of-use.pdf')
        ->context([
            'data' => $data
        ]);
        
    
        $this->mailer->send($email);
    }

    public function remove($data, array $context = [])
    {
        // call your persistence layer to delete $data
    }
}