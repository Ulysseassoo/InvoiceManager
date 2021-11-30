<?php

namespace App\Controller;

use App\Entity\Order;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class OrderController extends AbstractController
{
    #[Route('/api/orders', name: 'order', methods:'GET')]
    public function index(OrderRepository $orderRepository): Response
    {   
        $orders = $orderRepository->findAll();

        return $this->json($orders, 200, [], [
            'groups' => 'order'
        ]);
    }

    #[Route('/api/orders', name: 'create_order', methods: 'POST')]
    public function createMovie(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager): Response
    {

       $orderContent = $request->getContent();
       $order = $serializer->deserialize($orderContent, Order::class, 'json');
       $errors = $validator->validate($order);
       if (count($errors) > 0) {
               return $this->json($errors, 400);
        }
       $entityManager->persist($order);
       $entityManager->flush();

       return $this->json($order, 201, [], [
        'groups' => 'order'
    ]);
    }
}
