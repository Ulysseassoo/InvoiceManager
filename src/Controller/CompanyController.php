<?php

namespace App\Controller;

use App\Entity\Company;
use App\Service\FileUploader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;


final class CompanyController extends AbstractController
{
    public function __invoke(Request $request, FileUploader $fileUploader): Company
    {
        $uploadedFile = $request->files->get('logo');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }
 
        // create a new entity and set its values
        $company = new Company();
        $company->setName($request->get('name'));
        $company->setAddress($request->get('address'));

        // upload the file and save its filename
        $company->setLogo($fileUploader->upload($uploadedFile));
 
        return $company;
    }
}
