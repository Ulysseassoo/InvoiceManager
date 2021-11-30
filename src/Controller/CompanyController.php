<?php

namespace App\Controller;

use App\Entity\Company;
use App\Repository\CompanyRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CompanyController extends AbstractController
{
    #[Route('/api/company/{id}', name: 'company', methods:["PUT"])]
    public function index(Request $request, SerializerInterface $serializer, CompanyRepository $companyRepository,EntityManagerInterface $entityManager, int $id): Response
    {
    
        //    $input = $request->getContent();
        //    $company = $serializer->deserialize($input, Company::class, 'json');
        //    $databaseCompany = $companyRepository->find($id);
        //    dd($databaseCompany, $company);
        //    $entityManager->persist($company);
        //    $entityManager->flush();
    
           return $this->json($company, 201, [], ['groups' => 'company']);
    }
}
