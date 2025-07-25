# Chameleon Game

Un jeu multilingue inspiré du "Chameleon" où tous les joueurs reçoivent le même mot principal, sauf un seul — le Caméléon — qui reçoit un mot secondaire différent mais du même genre.

## Règles du jeu

- 3 joueurs minimum requis
- Tous les joueurs reçoivent le même mot (ex: "Noël")
- Un joueur aléatoire (le Caméléon) reçoit un mot différent mais similaire (ex: "Pâques")
- Les joueurs doivent deviner qui est le Caméléon lors des discussions

## Architecture

- **Backend API** : Node.js/Express avec Socket.IO pour le temps réel
- **Frontend WebApp** : React avec Vite
- **Containerisation** : Docker avec images officielles

## Installation et lancement

### Prérequis

- Docker et Docker Compose installés
- Ports 3000 et 8080 disponibles

### Démarrage

1. Cloner le repository :
```bash
git clone https://github.com/Gizmo091/game_chameleon
cd game_chameleon
```

2. Démarrer l'API :
```bash
docker-compose -f docker-compose.api.yaml up --build
```

3. Dans un nouveau terminal, démarrer la WebApp :
```bash
docker-compose -f docker-compose.webapp.yaml up --build
```

4. Accéder à l'application :
- **API** : http://localhost:3000
- **WebApp** : http://localhost:8080

## Variables d'environnement

### API
- `PORT` : Port du serveur (défaut: 3000)

### WebApp
- `VITE_API_URL` : URL de l'API (défaut: http://localhost:3000)

## API Endpoints

### REST

#### POST `/parties`
Crée une nouvelle partie.

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
Récupère l'état d'une partie.

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
Démarre la partie (réservé à l'hôte).

**Response** :
```json
{
  "success": true
}
```

#### POST `/parties/{gameCode}/end`
Termine la partie et révèle le Caméléon (réservé à l'hôte).

**Response** :
```json
{
  "chameleonId": "player_456"
}
```

### WebSocket Events

#### Client → Server

##### `joinGame`
Rejoint une partie.
```javascript
socket.emit('joinGame', {
  gameCode: "1234",
  playerId: "player_123",
  pseudo: "Alice"
});
```

##### `leaveGame`
Quitte la partie.
```javascript
socket.emit('leaveGame');
```

#### Server → Client

##### `room:update`
Mise à jour de la liste des joueurs.
```javascript
socket.on('room:update', ({ players, hostId }) => {
  // players: [{ id, pseudo }]
  // hostId: "player_123"
});
```

##### `game:word`
Réception du mot assigné.
```javascript
socket.on('game:word', ({ yourWord }) => {
  // yourWord: "Christmas" ou "Easter"
});
```

##### `game:started`
La partie a démarré.
```javascript
socket.on('game:started', ({ status }) => {
  // status: "playing"
});
```

##### `game:ended`
La partie est terminée.
```javascript
socket.on('game:ended', ({ chameleonId, mainWord, decoyWord }) => {
  // chameleonId: "player_456"
  // mainWord: "Christmas"
  // decoyWord: "Easter"
});
```

##### `error`
Erreur.
```javascript
socket.on('error', ({ message }) => {
  // message: "Game not found"
});
```

## Internationalisation (i18n)

L'application supporte plusieurs langues :
- Anglais (en)
- Français (fr)

La langue peut être sélectionnée :
- Via l'interface utilisateur
- Via le paramètre `?lang=` dans l'URL de l'API
- Via le header `Accept-Language`

## Base de données des mots

Les mots sont organisés par catégories et langues :

- **Animaux** : chat/chien, éléphant/girafe, requin/dauphin
- **Vacances** : Noël/Pâques, Halloween/Thanksgiving
- **Voitures** : Ferrari/Lamborghini, BMW/Mercedes

## Sécurité

- CORS configuré pour accepter toutes les origines (à restreindre en production)
- Validation des codes de partie
- Nettoyage automatique des parties après 1 heure d'inactivité
- Limitation aux actions de l'hôte (démarrer/terminer la partie)

## Développement

### Structure du projet

```
game_chameleon/
├── api/
│   ├── package.json
│   └── server.js
├── webapp/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
├── docker-compose.api.yaml
├── docker-compose.webapp.yaml
└── README.md
```

### Technologies utilisées

- **Backend** : Node.js, Express, Socket.IO
- **Frontend** : React, Vite, React Router, Socket.IO Client
- **UI** : CSS personnalisé
- **QR Code** : qrcode library

## Notes de production

Pour un déploiement en production :

1. Configurer CORS pour limiter les origines autorisées
2. Utiliser HTTPS
3. Implémenter une base de données persistante
4. Ajouter de l'authentification
5. Configurer les variables d'environnement appropriées
6. Mettre en place du monitoring et des logs