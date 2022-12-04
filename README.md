## Gestion des bateaux

Cette application est une simple implémentation de gestion de bateaux. Un bateau est caractérisé par un nom et une description. L'application permet les actions suivantes :
- Lister tous les bateaux
- Voir le détail d'un bateau
- Ajouter un nouveau bateau
- Modifier un bateau
- Supprimer un bateau

Le projet est découpé en 3 container Docker :
- PostgreSQL DB sur le port **5433**
- Java backend (Spring Boot) sur le port **8081**
- Angular frontend sur le port **4200**

Le projet peut être lancé localement et est disponible à l'adresse suivante: **http://localhost:4200/**

---

### Prérequis

Pour lancer l'application, deux outils doivent être installés : **Docker** et **Docker Compose**.

Un **navigateur internet** est aussi nécessaire pour visualiser le front de l'application.



### Comment lancer l'application ?

L'application peut être lancé depuis un terminal, en se rendant dans le répertoire et en lancant la commande suivante :

```
$ docker-compose up -d
```

Pour stopper l'application, lancez la commande suivante :

```
$ docker-compose down
```


---

#### boat-postgres (Base de données)

La base de données Postgres est lancé sur le port **5433** et contient une seule et unique table, **boat**, contenant elle même deux champs : **nom** et **description**.

Les accès de connexion à la base de données sont les suivants:


- Host: *localhost*
- Database: *boat*
- User: *postgres*
- Password: *root*

La base de donnée est containerisée en faisant appel à une image alpine.

```yml
  boat-postgres:
    image: "postgres:9.6-alpine"
    container_name: boat-postgres
    volumes:
      - boat-data:/var/lib/postgresql/data
    ports:
      - 5433:5432
    expose:
      - "5433"
    environment:
      - POSTGRES_DB=boat
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=root
    networks:
      - my_network
```

#### boat-back (REST API)

L'application Spring boot est l'intermediaire entre la base de données et le front.
Elle est lancée sur le port **8081** et expose des endpoints REST pour la lecture, l'ajout, la modification et la suppression de bateaux.

L'application est aussi dockerisé et défini dans le fichier *boat-back/Dockerfile*


#### boat-front (Frontend)

Le Front est la composante en interaction direct avec l'utilisateur.
Elle propose une interface simple permettant de manipuler les bateaux.

L'application est aussi dockerisé et défini dans le fichier *boat-front/Dockerfile*

L'utilsiateur peut y accéer via le lien suivant : **http://localhost:4200/**
