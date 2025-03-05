<?php


namespace App\DataFixtures;

use App\Story\DefaultEmotionsStory;
use App\Story\UserStory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        DefaultEmotionsStory::load();
        UserStory::load();
    }
}