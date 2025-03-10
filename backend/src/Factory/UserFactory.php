<?php

namespace App\Factory;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

/**
 * @extends PersistentProxyObjectFactory<User>
 */
final class UserFactory extends PersistentProxyObjectFactory
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public static function class(): string
    {
        return User::class;
    }

    protected function defaults(): array|callable
    {
        return [
            'active' => true,
            'email' => self::faker()->unique()->safeEmail(),
            'firstName' => self::faker()->firstName(),
            'lastName' => self::faker()->lastName(),
            'plainPassword' => 'admin123', // Mot de passe brut
            'roles' => ['ROLE_ADMIN'],
        ];
    }

    protected function initialize(): static
    {
        return $this->afterInstantiate(function (User $user): void {
            // Hacher le mot de passe avant de persister
            if ($user->getPlainPassword()) {
                $hashedPassword = $this->passwordHasher->hashPassword($user, $user->getPlainPassword());
                $user->setPassword($hashedPassword);
                $user->eraseCredentials(); // Effacer le plainPassword pour des raisons de sécurité
            }
        });
    }
}
