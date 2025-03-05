<?php

namespace App\Story;

use Zenstruck\Foundry\Story;
use App\Factory\EmotionFactory;
final class DefaultEmotionsStory extends Story
{
    public function build(): void
    {
        $emotions = [
            ['label' => 'Joie', 'color' => '#58ef11', 'creationDate' => new \DateTime(), 'modifDate' => new \DateTime()], // Jaune
            ['label' => 'Peur', 'color' => '#ba60ff', 'creationDate' => new \DateTime(), 'modifDate' => new \DateTime()], // Gris
            ['label' => 'Colère', 'color' => '#ff3131', 'creationDate' => new \DateTime(), 'modifDate' => new \DateTime()], // Rouge
            ['label' => 'Tristesse', 'color' => '#76afe2', 'creationDate' => new \DateTime(), 'modifDate' => new \DateTime()], // Bleu
            ['label' => 'Surprise', 'color' => '#fff036', 'creationDate' => new \DateTime(), 'modifDate' => new \DateTime()], // Jaune clair
            ['label' => 'Dégoût', 'color' => '#ad5d00', 'creationDate' => new \DateTime(), 'modifDate' => new \DateTime()], // Brun
        ];
        foreach ($emotions as $emotion) {
            EmotionFactory::createOne($emotion);
        };
#        EmotionFactory::createMany(6, [
#            ['name' => 'Joie', 'color' => '#FFFF00', 'creationDate' => new \DateTime(), 'modifDate' => new \DateTime()], // Jaune
#            ['name' => 'Peur', 'color' => '#808080', 'creationDate' => new \DateTime(), 'modifDate' => new \DateTime()], // Gris
#            ['name' => 'Colère', 'color' => '#FF0000', 'creationDate' => new \DateTime(), 'modifDate' => new DateTime()], // Rouge
#            ['name' => 'Tristesse', 'color' => '#0000FF', 'creationDate' => new \DateTime(), 'modifDate' => new DateTime()], // Bleu
#            ['name' => 'Surprise', 'color' => '#FFFFCC', 'creationDate' => new \DateTime(), 'modifDate' => new DateTime()], // Jaune clair
#            ['name' => 'Dégoût', 'color' => '#964B00', 'creationDate' => new \DateTime(), 'modifDate' => new \DateTime()], // Brun
#        ]);
    }
}