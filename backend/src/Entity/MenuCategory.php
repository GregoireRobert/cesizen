<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MenuCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Serializer\Annotation\Groups;
#[ORM\Entity(repositoryClass: MenuCategoryRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['menu:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Delete(),
        new Patch()
    ]
)]
class MenuCategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['menu:read', 'page:read'])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    /**
     * @var Collection<int, InformationPage>
     */
    #[ORM\OneToMany(targetEntity: InformationPage::class, mappedBy: 'menu')]
    private Collection $informationPages;

    #[ORM\Column(length: 255)]
    #[Groups(['menu:read', 'page:read'])]
    private ?string $slug = null;

    public function __construct()
    {
        $this->informationPages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection<int, InformationPage>
     */
    public function getInformationPages(): Collection
    {
        return $this->informationPages;
    }

    public function addInformationPage(InformationPage $informationPage): static
    {
        if (!$this->informationPages->contains($informationPage)) {
            $this->informationPages->add($informationPage);
            $informationPage->setMenu($this);
        }

        return $this;
    }

    public function removeInformationPage(InformationPage $informationPage): static
    {
        if ($this->informationPages->removeElement($informationPage)) {
            // set the owning side to null (unless already changed)
            if ($informationPage->getMenu() === $this) {
                $informationPage->setMenu(null);
            }
        }

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
