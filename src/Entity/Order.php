<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=OrderRepository::class)
 * @ORM\Table(name="`order`")
 */
class Order
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $phone_number;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $address;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $lastDate;

    /**
     * @ORM\OneToMany(targetEntity=Payment::class, mappedBy="command")
     */
    private $payments;

    /**
     * @ORM\OneToMany(targetEntity=Product::class, mappedBy="command")
     */
    private $products;

    public function __construct()
    {
        $this->payments = new ArrayCollection();
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phone_number;
    }

    public function setPhoneNumber(string $phone_number): self
    {
        $this->phone_number = $phone_number;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getLastDate(): ?\DateTimeImmutable
    {
        return $this->lastDate;
    }

    public function setLastDate(\DateTimeImmutable $lastDate): self
    {
        $this->lastDate = $lastDate;

        return $this;
    }

    /**
     * @return Collection|Payment[]
     */
    public function getPayment(): Collection
    {
        return $this->payments;
    }

    public function addPayment(Payment $payments): self
    {
        if (!$this->payments->contains($payments)) {
            $this->payments[] = $payments;
            $payments->setCommand($this);
        }

        return $this;
    }

    public function removePayment(Payment $payments): self
    {
        if ($this->payments->removeElement($payments)) {
            // set the owning side to null (unless already changed)
            if ($payments->getCommand() === $this) {
                $payments->setCommand(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Product[]
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
            $product->setCommand($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getCommand() === $this) {
                $product->setCommand(null);
            }
        }

        return $this;
    }
}
