<?php

namespace App\Controller;

use App\Entity\Order;
use App\Service\OrderManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChangeOrderStates extends AbstractController
{
    public function __invoke(Order $data, OrderManager $orderManager): Order
    {
        // dd($data);
        $stateId = $data->getState()->getId();
        switch ($stateId) {
            // If command is non treated
            case 1:
                $orderManager->sendConfirmationMail($data);
                break;
                // If unpaid order
            case 3:
                $orderManager->sendReminderMail($data);
                break;
        }
        return $data;
    }
}
