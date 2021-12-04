<?php

namespace App\Service;

use App\Entity\Order;
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
    
    public function checkAmountOrders(): Array
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
    public function checkOrdersDueDate()
    {
        $orders = $this->orderRepository->checkDueDate();
        $lateState = $this->stateRepository->find(3);
        foreach ($orders as $order) {
            $order->setState($lateState);
            $this->em->persist($order);
            $this->em->flush();
        }
        return $orders;
    }

    public function sendConfirmationMail(Order $order)
    {
        $treatedState = $this->stateRepository->find(2);
        $order->setState($treatedState);
        $this->em->persist($order);
        $this->em->flush();

        $email = (new TemplatedEmail())
        ->from('no-reply@invoice-manger.com')
        ->to('you@example.com')
        ->subject('Confirmation Command')
        ->htmlTemplate("invoice.html.twig")
        ->context([
            'data' => $order
        ]);
        $this->mailer->send($email);
    }

    public function sendReminderMail(Order $order)
    {
        $email = (new TemplatedEmail())
        ->from('no-reply@invoice-manger.com')
        ->to('you@example.com')
        ->subject('Unpaid Reminder: You need to pay your command')
        ->htmlTemplate("invoice.html.twig")
        ->context([
            'data' => $order
        ]);
        $this->mailer->send($email);
    }

}