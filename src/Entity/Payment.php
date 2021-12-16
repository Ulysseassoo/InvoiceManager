<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PaymentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"payment:read"}},
 *     denormalizationContext={"groups"={"payment:write"}}
 * )
 * @ORM\Entity(repositoryClass=PaymentRepository::class)
 */
class Payment
{
	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 * @ORM\Column(type="integer")
	 * @Groups({"payment:read", "order:read"})
	 */
	private $id;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @Groups({"payment:read", "payment:write", "order:write", "order:read"})
	 */
	private $type;

	/**
	 * @ORM\Column(type="integer")
	 * @Groups({"payment:read", "payment:write", "order:write", "order:read"})
	 */
	private $amount;

	/**
	 * @ORM\ManyToOne(targetEntity=Order::class, inversedBy="payment", cascade={"persist"})
	 */
	private $command;

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getType(): ?string
	{
		return $this->type;
	}

	public function setType(string $type): self
	{
		$this->type = $type;

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
