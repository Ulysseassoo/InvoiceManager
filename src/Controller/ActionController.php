<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

final class ActionController extends AbstractController
{
    public function __invoke(): User
    {
        $user = $this->getUser();

        return $user;
    }
}
