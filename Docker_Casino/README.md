# Pour tester le projet avec Docker, il faut suivre les étapes suivantes:

A noter que malheureusement, le projet n'est pas fonctionnel avec Docker. En effet, le serveur NodeJS et le client Angular ne communiquent pas correctement entre eux. Cependant, le projet fonctionne correctement en local. Je pense que le problème vient de la configuration de mon projet angular, mais je n'ai pas encore réussi à trouver la solution.

## 1. Installation de Docker

Pour installer Docker, il suffit de suivre les instructions sur le site officiel de Docker: https://docs.docker.com/get-docker/

## 2. Installation de Docker Compose

Pour installer Docker Compose, il suffit de suivre les instructions sur le site officiel de Docker: https://docs.docker.com/compose/install/

## 4. Lancer le projet

Dans les 2 repertoires ("angular" et "nodejs"), lancer la commande suivante:
`docker-compose up`

## 5. Accéder au projet

Pour accéder au projet, il suffit d'ouvrir un navigateur et de taper l'URL suivante: http://localhost:4200 (Le serveur, quant à lui, tourne sur http://localhost:3000)

> Note: Pour arrêter le projet, il suffit de taper `Ctrl+C` dans le terminal où le projet a été lancé.
