<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250309162946 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE emotion (id SERIAL NOT NULL, base_id INT DEFAULT NULL, label VARCHAR(255) NOT NULL, color VARCHAR(16) DEFAULT NULL, creation_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, modif_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DEBC776967DF41 ON emotion (base_id)');
        $this->addSql('CREATE TABLE information_page (id SERIAL NOT NULL, menu_id INT DEFAULT NULL, content TEXT NOT NULL, title VARCHAR(255) NOT NULL, creation_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, modif_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_35A2BF3DCCD7E912 ON information_page (menu_id)');
        $this->addSql('CREATE TABLE menu_category (id SERIAL NOT NULL, title VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE tracker (id SERIAL NOT NULL, creator_id INT NOT NULL, emotion_id INT NOT NULL, creation_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, modif_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, note TEXT DEFAULT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AC632AAF61220EA6 ON tracker (creator_id)');
        $this->addSql('CREATE INDEX IDX_AC632AAF1EE4A582 ON tracker (emotion_id)');
        $this->addSql('CREATE TABLE "user" (id SERIAL NOT NULL, email VARCHAR(180) NOT NULL, password VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, active BOOLEAN NOT NULL, creation_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, modif_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, roles JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL ON "user" (email)');
        $this->addSql('ALTER TABLE emotion ADD CONSTRAINT FK_DEBC776967DF41 FOREIGN KEY (base_id) REFERENCES emotion (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE information_page ADD CONSTRAINT FK_35A2BF3DCCD7E912 FOREIGN KEY (menu_id) REFERENCES menu_category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tracker ADD CONSTRAINT FK_AC632AAF61220EA6 FOREIGN KEY (creator_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE tracker ADD CONSTRAINT FK_AC632AAF1EE4A582 FOREIGN KEY (emotion_id) REFERENCES emotion (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE emotion DROP CONSTRAINT FK_DEBC776967DF41');
        $this->addSql('ALTER TABLE information_page DROP CONSTRAINT FK_35A2BF3DCCD7E912');
        $this->addSql('ALTER TABLE tracker DROP CONSTRAINT FK_AC632AAF61220EA6');
        $this->addSql('ALTER TABLE tracker DROP CONSTRAINT FK_AC632AAF1EE4A582');
        $this->addSql('DROP TABLE emotion');
        $this->addSql('DROP TABLE information_page');
        $this->addSql('DROP TABLE menu_category');
        $this->addSql('DROP TABLE tracker');
        $this->addSql('DROP TABLE "user"');
    }
}
