# API des articles
## Initialisation de la configuration de la bdd

- Initialiser docker mongoDB dans docker-compose.yml
- initialisation du fichier de config mongodb

```sh
docker compose up
// or
docker-compose up
```

- Installer MongoDB extention de vscode.

Connexion avec :
mongodb://localhost:27017/myapp

```sh
npx run serve
```

Pour lancer les instances pm2:

```sh
npm run dev // mode development
// or
npm run start // mode production
```

Pour stopper (app est le nom qui identifie nos instances, cf. ecosystem.config.js):

```sh
npx pm2 stop app
```

Vous pouvez exécuter l'ensemble des commandes pm2 en utilsant `npx pm2`
