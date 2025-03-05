<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmotionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmotionRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['emotion:read']],
    operations: [
        new Get(),
        new GetCollection(),
    ]
)]
class Emotion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['emotion:read', 'tracker:read'])]
    private ?string $label = null;

    #[ORM\Column(length: 16, nullable: true)]
    #[Groups(['emotion:read', 'tracker:read'])]
    private ?string $color = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'shades')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['emotion:read'])]
    private ?self $base = null;

    /**
     * @var Collection<int, self>
     */
    #[ORM\OneToMany(targetEntity: self::class, mappedBy: 'base')]
    #[Groups(['emotion:read'])]
    private Collection $shades;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['emotion:read'])]
    private ?\DateTimeInterface $creationDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['emotion:read'])]
    private ?\DateTimeInterface $modifDate = null;

    public function __construct()
    {
        $this->shades = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getBase(): ?self
    {
        return $this->base;
    }

    public function setBase(?self $base): static
    {
        $this->base = $base;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getShades(): Collection
    {
        return $this->shades;
    }

    public function addShade(self $shade): static
    {
        if (!$this->shades->contains($shade)) {
            $this->shades->add($shade);
            $shade->setBase($this);
        }

        return $this;
    }

    public function removeShade(self $shade): static
    {
        if ($this->shades->removeElement($shade)) {
            // set the owning side to null (unless already changed)
            if ($shade->getBase() === $this) {
                $shade->setBase(null);
            }
        }

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
}
