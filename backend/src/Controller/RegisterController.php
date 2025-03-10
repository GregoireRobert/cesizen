<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegisterController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        UserRepository $userRepository
    ): JsonResponse {
        // Récupérer les données JSON envoyées dans la requête
        $data = json_decode($request->getContent(), true);

        // Vérifier que les champs obligatoires sont présents
        if (!isset($data['email']) || !isset($data['plainPassword'])) {
            return new JsonResponse(['error' => 'Email and password are required.'], Response::HTTP_BAD_REQUEST);
        }
        if (!isset($data['lastName']) || !isset($data['firstName'])) {
            return new JsonResponse(['error' => 'lastName and firstName are required.'], Response::HTTP_BAD_REQUEST);
        }

        // Créer une nouvelle instance de User
        $user = new User();
        $user->setLastName($data["lastName"]);
        $user->setfirstName($data["firstName"]);
        $user->setEmail($data['email']);
        $user->setPassword(
            $passwordHasher->hashPassword($user, $data['plainPassword'])
        );
        $user->setActive(true); // Définit l'utilisateur comme actif par défaut
        $user->setRoles(['ROLE_USER']); // Définit le rôle par défaut

        // Sauvegarder l'utilisateur dans la base de données
        $userRepository->save($user, true);

        // Retourner une réponse JSON
        return new JsonResponse(
            ['message' => 'User registered successfully.'],
            Response::HTTP_CREATED
        );
    }
}
