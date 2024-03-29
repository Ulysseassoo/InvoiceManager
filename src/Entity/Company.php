<?php

namespace App\Entity;

use App\Repository\CompanyRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CompanyController;

/**
 * @ApiResource(
 *  collectionOperations={
 *     "get",
 *     "post" = {
 *       "controller" = CompanyController::class,
 *       "deserialize" = false,
 *       "openapi_context" = {
 *         "requestBody" = {
 *           "description" = "File upload to an existing resource (company)",
 *           "required" = true,
 *           "content" = {
 *             "multipart/form-data" = {
 *               "schema" = {
 *                 "type" = "object",
 *                 "properties" = {
 *                   "name" = {
 *                     "description" = "The name of the company",
 *                     "type" = "string",
 *                     "example" = "Deliveroo",
 *                   },
 *                   "address" = {
 *                     "description" = "The address of the company",
 *                     "type" = "string",
 *                     "example" = "152 Avenue de l'arche, Courbevoie",
 *                   },
 *                   "logo" = {
 *                     "type" = "string",
 *                     "format" = "binary",
 *                     "description" = "Upload the logo of the company",
 *                   },
 *                 },
 *               },
 *             },
 *           },
 *         },
 *       },
 *     },
 *  },
 * itemOperations={"get", "put" = {
 *       "method" = "post",
 *       "controller" = CompanyController::class,
 *       "deserialize" = false,
 *       "openapi_context" = {
 *         "requestBody" = {
 *           "description" = "File upload to an existing resource (company)",
 *           "required" = true,
 *           "content" = {
 *             "multipart/form-data" = {
 *               "schema" = {
 *                 "type" = "object",
 *                 "properties" = {
 *                   "name" = {
 *                     "description" = "The name of the company",
 *                     "type" = "string",
 *                     "example" = "Deliveroo",
 *                   },
 *                   "address" = {
 *                     "description" = "The address of the company",
 *                     "type" = "string",
 *                     "example" = "152 Avenue de l'arche, Courbevoie",
 *                   },
 *                   "logo" = {
 *                     "type" = "string",
 *                     "format" = "binary",
 *                     "description" = "Upload the logo of the company",
 *                   },
 *                 },
 *               },
 *             },
 *           },
 *         },
 *       },
 *     },},
 * )
 * @ORM\Entity(repositoryClass=CompanyRepository::class)
 */
class Company
{
	/**
	 * @ORM\Id
	 * @ORM\GeneratedValue
	 * @ORM\Column(type="integer")
	 * @Groups("company")
	 */
	private $id;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @Groups("company")
	 */
	private $name;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @Groups("company")
	 */
	private $address;

	/**
	 * @ORM\Column(type="string", length=255)
	 * @Groups("company")
	 */
	private $logo;

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

	public function getAddress(): ?string
	{
		return $this->address;
	}

	public function setAddress(string $address): self
	{
		$this->address = $address;

		return $this;
	}

	public function getLogo(): ?string
	{
		return $this->logo;
	}

	public function setLogo(string $logo): self
	{
		$this->logo = $logo;

		return $this;
	}
}
