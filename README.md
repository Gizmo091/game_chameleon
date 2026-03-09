# Chameleon Game

![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
![Maintainer](https://img.shields.io/badge/maintainer-Mathieu%20Vedie-blue)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

[![GitHub latest commit](https://badgen.net/github/last-commit/Gizmo091/game_chameleon)](https://github.com/Gizmo091/game_chameleon/commit/)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/mathieuvedie)

Un jeu multilingue inspire du "Chameleon" ou tous les joueurs recoivent le meme mot principal, sauf un seul -- le Cameleon -- qui recoit un mot secondaire different mais du meme genre.

## Proposition

- Ne pas hesiter a proposer vos couples de mots (ouvrez une ISSUE ou faite une pull request)

## Regles du jeu

- 3 joueurs minimum requis
- Tous les joueurs recoivent le meme mot (ex: "Noel")
- Un joueur aleatoire (le Cameleon) recoit un mot different mais similaire (ex: "Paques")
- Les joueurs doivent deviner qui est le Cameleon lors des discussions

## Architecture

- **Backend API** : Node.js/Express avec Socket.IO pour le temps reel
- **Frontend WebApp** : React avec Vite
- **Containerisation** : Docker avec images pre-construites via GitHub Container Registry

## Installation et lancement

### Option 1 : Docker (recommande)

#### Prerequis

- Docker et Docker Compose installes

#### Demarrage rapide

```bash
git clone https://github.com/Gizmo091/game_chameleon
cd game_chameleon
./start.sh
```

Les images Docker pre-construites sont telechargees automatiquement depuis GHCR.

#### Configuration

Copiez `.env.example` et configurez votre environnement :

```bash
cp .env.example .env
# Editez .env avec votre URL d'API
```

Variables disponibles :

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | *(requis)* | URL de votre API (ex: `https://api.mon-domaine.fr`) |
| `API_PORT` | `3000` | Port de l'API |
| `WEBAPP_PORT` | `80` | Port de la webapp |

L'URL de l'API est injectee au demarrage du conteneur webapp, donc chaque utilisateur peut deployer avec sa propre URL sans reconstruire l'image.

#### Commandes utiles

```bash
docker compose up -d       # Demarrer
docker compose down        # Arreter
docker compose logs -f     # Voir les logs
docker compose restart     # Redemarrer
```

### Option 2 : Developpement local

```bash
# API
cd api && npm install && npm run dev

# WebApp (dans un autre terminal)
cd webapp && npm install && npm run dev
```

Configurez `webapp/.env` :
```
VITE_API_URL=http://localhost:3000
```

### Option 3 : Docker dev (build local)

```bash
docker compose -f docker-compose.dev.yml up --build
```

## CI/CD

A chaque push sur `main`, GitHub Actions build et publie automatiquement les images Docker sur GHCR :
- `ghcr.io/gizmo091/game_chameleon/api:latest`
- `ghcr.io/gizmo091/game_chameleon/webapp:latest`

L'image webapp est construite avec un placeholder pour l'URL de l'API. Chaque utilisateur configure `VITE_API_URL` dans son `.env` au deploiement, pas besoin de reconstruire.

## Variables d'environnement

### API
- `PORT` : Port du serveur (defaut: 3000)

### WebApp
- `VITE_API_URL` : URL de l'API (defaut: http://localhost:3000)

## API Endpoints

### REST

#### POST `/parties`
Cree une nouvelle partie.

**Query params** :
- `lang` : Langue (en, fr) - optionnel

**Response** :
```json
{
  "gameCode": "1234",
  "gameId": "game_1234567890"
}
```

#### GET `/parties/{gameCode}`
Recupere l'etat d'une partie.

**Response** :
```json
{
  "gameId": "game_1234567890",
  "gameCode": "1234",
  "players": [
    { "id": "player_123", "pseudo": "Alice" }
  ],
  "status": "waiting",
  "hostId": "player_123"
}
```

#### POST `/parties/{gameCode}/start`
Demarre la partie (reserve a l'hote).

#### POST `/parties/{gameCode}/end`
Termine la partie et revele le Cameleon (reserve a l'hote).

#### POST `/parties/{gameCode}/restart`
Relance une nouvelle manche.

### WebSocket Events

#### Client > Server

##### `joinGame`
Rejoint une partie.
```javascript
socket.emit('joinGame', {
  gameCode: "1234",
  playerId: "player_123",
  pseudo: "Alice",
  password: "optional"
});
```

##### `leaveGame`
Quitte la partie.
```javascript
socket.emit('leaveGame');
```

#### Server > Client

##### `room:update`
Mise a jour de la liste des joueurs.
```javascript
socket.on('room:update', ({ players, hostId }) => {
  // players: [{ id, pseudo }]
});
```

##### `game:word`
Reception du mot assigne.
```javascript
socket.on('game:word', ({ yourWord }) => {});
```

##### `game:started`
La partie a demarre.

##### `game:ended`
La partie est terminee, revele le cameleon et les mots.
```javascript
socket.on('game:ended', ({ chameleonId, mainWord, decoyWord }) => {});
```

##### `game:restarted`
Nouvelle manche lancee.

##### `host:left` / `player:left`
Un joueur ou l'hote a quitte la partie.

##### `error`
Erreur (Game not found, Wrong password, Game ended).

## Internationalisation (i18n)

L'application supporte plusieurs langues :
- Anglais (en)
- Francais (fr)

La langue peut etre selectionnee via l'interface, le parametre `?lang=` ou le header `Accept-Language`.

## Base de donnees des mots

Les mots sont organises par categories et langues :
- **Animaux** : chat/chien, elephant/girafe, requin/dauphin
- **Vacances** : Noel/Paques, Halloween/Thanksgiving
- **Voitures** : Ferrari/Lamborghini, BMW/Mercedes
- Et bien d'autres categories...

## Structure du projet

```
game_chameleon/
├── api/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── words-database.js
├── webapp/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
├── .github/workflows/
│   └── docker-publish.yml
├── docker-compose.yml
├── docker-compose.dev.yml
├── .env.example
└── README.md
```

## Technologies utilisees

- **Backend** : Node.js, Express, Socket.IO
- **Frontend** : React 19, Vite, React Router, Socket.IO Client
- **QR Code** : qrcode + @zxing/browser
- **Production** : Docker, nginx, GitHub Actions, GHCR
