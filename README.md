# Projet Docker Compose : Backend Symfony (API Platform) et Frontend React

Ce projet configure une application composée de deux principaux services : un backend Symfony avec API Platform et un frontend React utilisant Vite.js. Il inclut également une base de données PostgreSQL et un outil de gestion PGAdmin.

## Table des matières
- [Prérequis](#prérequis)
- [Services](#services)
  - [cesizen-web (Frontend)](#cesizen-web-frontend)
  - [backend (Symfony API)](#backend-symfony-api)
  - [database (PostgreSQL)](#database-postgresql)
  - [pgadmin (PGAdmin)](#pgadmin-pgadmin)
- [Réseaux](#réseaux)
- [Volumes](#volumes)
- [Lancement du projet](#lancement-du-projet)
- [Configuration des variables d'environnement](#configuration-des-variables-denvironnement)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Lancement du projet
Clonez le dépôt contenant ce fichier.

Assurez-vous que vos variables d'environnement sont correctement configurées dans un fichier .env.

Lancez les services avec Docker Compose :

```docker compose up --build -d```  
Pour le backend, accédez au conteneur et exécutez les migrations :

```
docker exec -it backend sh
```
```
bin/console doctrine:migrations:migrate
```
Accédez aux différentes parties du projet via les URLs suivantes :

Frontend React : http://localhost:3000

Backend Symfony API : http://localhost/api

PGAdmin : http://localhost:8888


## Services

### cesizen-web (Frontend)

Service pour l'application frontend développée avec React et Vite.js.

- **Image** : `cesizen-web`
- **Build** : 
  - Contexte : `./frontend`
  - Fichier Docker : `Dockerfile`
- **Ports exposés** :
  - `3000:3000` (accessible sur http://localhost:3000)
- **Variables d'environnement** :
  - `NODE_ENV=production`
- **Réseau** : `app-network`

---

### backend (Symfony API)

Service pour le backend Symfony utilisant API Platform.

- **Image** : `${IMAGES_PREFIX:-}app-php`
- **Redémarrage automatique** : `unless-stopped`
- **Ports exposés** :
  - HTTP : `${HTTP_PORT:-80}`
  - HTTPS : `${HTTPS_PORT:-443}`
  - HTTP/3 : `${HTTP3_PORT:-443}`
- **Volumes montés** :
  - `caddy_data:/data`
  - `caddy_config:/config`
- **Variables d'environnement principales** :
  - `SERVER_NAME` : Nom du serveur (par défaut `localhost`)
  - `DATABASE_URL` : URL de connexion à PostgreSQL
  - `MERCURE_URL` et `MERCURE_PUBLIC_URL` : Configuration pour Mercure
  - Voir le fichier pour plus de détails.
- **Réseau** : `app-network`

---

### database (PostgreSQL)

Service pour la base de données PostgreSQL.

- **Image** : `postgres:${POSTGRES_VERSION:-16}-alpine`
- **Ports exposés** :
  - `5432:5432` (accessible localement sur le port 5432)
- **Volumes montés** :
  - `database_data:/var/lib/postgresql/data:rw`
- **Variables d'environnement principales** :
  - `POSTGRES_DB` : Nom de la base de données (par défaut `app`)
  - `POSTGRES_USER` : Nom d'utilisateur PostgreSQL (par défaut `app`)
  - `POSTGRES_PASSWORD` : Mot de passe PostgreSQL (par défaut `!ChangeMe!`)
- **Healthcheck** :
  - Commande : Vérifie si la base est prête avec `pg_isready`.

---

### pgadmin (PGAdmin)

Service pour l'interface graphique PGAdmin permettant de gérer la base PostgreSQL.

- **Image** : `dpage/pgadmin4`
- **Nom du conteneur** : `pgadmin4_container`
- **Ports exposés** :
  - `8888:80` (accessible sur http://localhost:8888)
- 
