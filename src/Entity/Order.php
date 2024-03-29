<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\ChangeOrderStates;
use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"order:read"}},
 *     denormalizationContext={"groups"={"order:write"}},
 *     itemOperations= {
 *      "get",
 *      "put",
 *      "patch",
 *      "delete",
 *      "post_confirmation" = {
 *          "method" = "GET",
 *          "path" = "/orders/{id}/confirmation",
 *          "controller" = ChangeOrderStates::class,
 *       }
 * }
 * )
 * @ORM\Entity(repositoryClass=OrderRepository::class)
 * @ORM\Table(name="`order`")
 */
class Order
{
	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 * @ORM\Column(type="integer")
	 * @Groups("order:read")
	 */
	private $id;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @Groups({"order:read", "order:write"})
	 */
	private $firstname;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @Groups({"order:read", "order:write"})
	 */
	private $lastname;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @Groups({"order:read", "order:write"})
	 */
	private $phoneNumber;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @Groups({"order:read", "order:write"})
	 */
	private $address;

	/**
	 * @ORM\Column(type="datetime_immutable")
	 * @Groups({"order:read", "order:write"})
	 */
	private $lastDate;

	/**
	 * @ORM\OneToMany(targetEntity=Payment::class, mappedBy="command", cascade={"persist"})
	 * @Groups({"order:read", "order:write"})
	 */
	private $payment;

	/**
	 * @ORM\OneToMany(targetEntity=Product::class, mappedBy="command", cascade={"persist"})
	 * @Groups({"order:read", "order:write"})
	 */
	private $products;

	/**
	 * @ORM\ManyToOne(targetEntity=State::class, inversedBy="commands", cascade={"persist"})
	 * @ORM\JoinColumn(nullable=false)
	 * @Groups({"order:read", "order:write"})
	 */
	private $state;

	public function __construct()
	{
		$this->payment = new ArrayCollection();
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
		return $this->phoneNumber;
	}

	public function setPhoneNumber(string $phoneNumber): self
	{
		$this->phoneNumber = $phoneNumber;

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
		return $this->payment;
	}

	public function addPayment(Payment $payment): self
	{
		if (!$this->payment->contains($payment)) {
			$this->payment[] = $payment;
			$payment->setCommand($this);
		}

		return $this;
	}

	public function removePayment(Payment $payment): self
	{
		if ($this->payment->removeElement($payment)) {
			// set the owning side to null (unless already changed)
			if ($payment->getCommand() === $this) {
				$payment->setCommand(null);
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

	public function getState(): ?State
	{
		return $this->state;
	}

	public function setState(?State $state): self
	{
		$this->state = $state;

		return $this;
	}
}
