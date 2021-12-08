<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 */
class Invoice
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $unique_id;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $client_firstname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $client_lastname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $client_address;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $client_phone_number;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $due_date;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUniqueId(): ?int
    {
        return $this->unique_id;
    }

    public function setUniqueId(int $unique_id): self
    {
        $this->unique_id = $unique_id;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getClientFirstname(): ?string
    {
        return $this->client_firstname;
    }

    public function setClientFirstname(string $client_firstname): self
    {
        $this->client_firstname = $client_firstname;

        return $this;
    }

    public function getClientLastname(): ?string
    {
        return $this->client_lastname;
    }

    public function setClientLastname(string $client_lastname): self
    {
        $this->client_lastname = $client_lastname;

        return $this;
    }

    public function getClientAddress(): ?string
    {
        return $this->client_address;
    }

    public function setClientAddress(string $client_address): self
    {
        $this->client_address = $client_address;

        return $this;
    }

    public function getClientPhoneNumber(): ?string
    {
        return $this->client_phone_number;
    }

    public function setClientPhoneNumber(string $client_phone_number): self
    {
        $this->client_phone_number = $client_phone_number;

        return $this;
    }

    public function getDueDate(): ?\DateTimeImmutable
    {
        return $this->due_date;
    }

    public function setDueDate(\DateTimeImmutable $due_date): self
    {
        $this->due_date = $due_date;

        return $this;
    }
}
