<?php

namespace App\Story;
use App\Factory\UserFactory;
use App\Factory\TrackerFactory;
use App\Factory\EmotionFactory;
use Zenstruck\Foundry\Story;

final class UserStory extends Story
{
    public function build(): void
    {
        // Assurez-vous que les émotions par défaut sont créées
        DefaultEmotionsStory::load();

        // Récupérez toutes les émotions
        $emotions = EmotionFactory::all();

        // Créez un utilisateur
        $user = UserFactory::createOne();
        
        // Créez plusieurs trackers pour cet utilisateur
        for ($i = 0; $i < 5; $i++) {
            TrackerFactory::createOne([
                'creator' => $user,
                'emotion' => $emotions[array_rand($emotions)], // Choisissez une émotion aléatoire
                // Ajoutez d'autres champs nécessaires pour votre Tracker
            ]);
        }
    }
}
