<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class MeController extends AbstractController
{
    public function __construct(private Security $security)
    {
    }

    public function __invoke(): JsonResponse
    {
        /** @var UserInterface|null $user */
        $user = $this->security->getUser();

        if (!$user) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        return $this->json($user, 200, [], ['groups' => ['user:read']]);
    }
}
