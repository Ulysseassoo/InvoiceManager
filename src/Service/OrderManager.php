<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\OrderRepository;
use App\Repository\StateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class OrderManager 
{
    private EntityManagerInterface $em;
    
    public function __construct(EntityManagerInterface $em,OrderRepository $orderRepository,StateRepository $stateRepository, MailerInterface $mailer) 
    {
        $this->em = $em;
        $this->orderRepository = $orderRepository;
        $this->stateRepository = $stateRepository;
        $this->mailer = $mailer;
    }
    
    public function CheckAmountOrders(): Array
    {
        $orders = $this->orderRepository->checkOrderAmounts();
        // Id = 4, paid state
        $paidState = $this->stateRepository->find(4);
        foreach ($orders as $order) {

            $order->setState($paidState);
            $this->em->persist($order);
            $this->em->flush();

            $email = (new TemplatedEmail())
            ->from('no-reply@invoice-manger.com')
            ->to('you@example.com')
            ->subject('Time for Symfony Mailer!')
            ->htmlTemplate("invoice.html.twig")
            // ->attachFromPath('/path/to/documents/terms-of-use.pdf')
            ->context([
                'data' => $order
            ]);
            $this->mailer->send($email);
        }
        
        return $orders;
    }
    public function CheckOrdersDueDate()
    {
        $orders = $this->orderRepository->checkDueDate();
        // Id = 4, paid state
        $lateState = $this->stateRepository->find(3);
        foreach ($orders as $order) {
            $order->setState($lateState);
            $this->em->persist($order);
            $this->em->flush();
        }
        return $orders;
    }

}