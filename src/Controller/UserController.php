<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
	public function currentUser(): User
	{
		// Get the connected user
		$user = $this->getUser();

		return $user;
	}
}
