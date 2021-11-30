<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 */
class Product
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("order")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("order")
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     * @Groups("order")
     */
    private $amount;

    /**
     * @ORM\ManyToOne(targetEntity=Order::class, inversedBy="products", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $command;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getCommand(): ?Order
    {
        return $this->command;
    }

    public function setCommand(?Order $command): self
    {
        $this->command = $command;

        return $this;
    }
}
