<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\StateRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=StateRepository::class)
 * @ApiResource(
 *  normalizationContext={"groups"={"state:read"}},
 *  denormalizationContext={"groups"={"state:write"}}
 * )
 */
class State
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"order:read", "state:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"order:read", "order:write", "state:read", "state:write"})
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Order::class, mappedBy="state", cascade={"persist"})
     * @Groups({"state:read", "state:write"})
     */
    private $commands;

    public function __construct()
    {
        $this->commands = new ArrayCollection();
    }

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

    /**
     * @return Collection|Order[]
     */
    public function getCommands(): Collection
    {
        return $this->commands;
    }

    public function addCommand(Order $command): self
    {
        if (!$this->commands->contains($command)) {
            $this->commands[] = $command;
            $command->setState($this);
        }

        return $this;
    }

    public function removeCommand(Order $command): self
    {
        if ($this->commands->removeElement($command)) {
            // set the owning side to null (unless already changed)
            if ($command->getState() === $this) {
                $command->setState(null);
            }
        }

        return $this;
    }
}
