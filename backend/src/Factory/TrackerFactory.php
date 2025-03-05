<?php

namespace App\Factory;

use App\Entity\Tracker;
use Zenstruck\Foundry\Persistence\PersistentProxyObjectFactory;

/**
 * @extends PersistentProxyObjectFactory<Tracker>
 */
final class TrackerFactory extends PersistentProxyObjectFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
    }

    public static function class(): string
    {
        return Tracker::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function defaults(): array|callable
    {   
        $date = self::faker()->dateTimeBetween('-1 year', 'now');
        return [
            'creationDate' => $date,
            'creator' => UserFactory::new(),
            'emotion' => EmotionFactory::new(),
            'modifDate' => $date,
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(Tracker $tracker): void {})
        ;
    }
}
