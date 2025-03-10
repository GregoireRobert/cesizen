<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InformationPageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InformationPageRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['page:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Delete(),
        new Patch()
    ]
)]
class InformationPage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['page:read'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $content = null;

    #[Groups(['page:read'])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $creationDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $modifDate = null;

    #[Groups(['page:read'])]
    #[ORM\ManyToOne(inversedBy: 'informationPages')]
    private ?MenuCategory $menu = null;

    #[ORM\Column(length: 255)]
    #[Groups(['page:read'])]
    private ?string $slug = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(\DateTimeInterface $creationDate): static
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getModifDate(): ?\DateTimeInterface
    {
        return $this->modifDate;
    }

    public function setModifDate(\DateTimeInterface $modifDate): static
    {
        $this->modifDate = $modifDate;

        return $this;
    }

    public function getMenu(): ?MenuCategory
    {
        return $this->menu;
    }

    public function setMenu(?MenuCategory $menu): static
    {
        $this->menu = $menu;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }
}
