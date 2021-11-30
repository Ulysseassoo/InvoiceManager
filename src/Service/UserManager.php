<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserManager 
{
    private EntityManagerInterface $em;
    
    public function __construct(EntityManagerInterface $em,UserPasswordHasherInterface $userPasswordHasherInterface) 
    {
        $this->em = $em;
        $this->userPasswordHasherInterface = $userPasswordHasherInterface;
    }
    
    public function create(string $email, string $password) 
    {
        $user = new User();
        $user->setEmail($email);
        $user->setPassword(
            $this->userPasswordHasherInterface->hashPassword(
                    $user,
                    $password
            )
        );
        $this->em->persist($user);
        $this->em->flush($user);

    }
}