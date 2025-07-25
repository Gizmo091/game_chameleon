# Jeu du Caméléon

Application web multilingue pour jouer au Caméléon en ligne.

## Architecture

- **API Backend** : Node.js + Express + Socket.IO (port 3000)
- **WebApp Frontend** : React + Vite (port 8080)
- **Base de données** : En mémoire (sessions temporaires)

## Déploiement avec Docker

### Prérequis

- Docker et Docker Compose installés
- Reverse proxy configuré pour :
  - `api.cameleon.vedielaute.fr` → `localhost:3000`
  - `cameleon.vedielaute.fr` → `localhost:8080`

### Lancement

```bash
# Cloner le repository
git clone <your-repo-url>
cd game_chameleon

# Lancer les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

### Configuration du reverse proxy

Exemple de configuration Nginx :

```nginx
# API
server {
    listen 80;
    server_name api.cameleon.vedielaute.fr;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# WebApp
server {
    listen 80;
    server_name cameleon.vedielaute.fr;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Développement local

```bash
# API
cd api
npm install
npm start

# WebApp
cd webapp
npm install
npm run dev
```

## Fonctionnalités

- ✅ Parties multilingues (FR/EN)
- ✅ Mots sémantiquement similaires pour le Caméléon
- ✅ QR codes pour rejoindre facilement
- ✅ Scanner QR intégré (HTTPS requis sur mobile)
- ✅ Reconnexion automatique après rafraîchissement
- ✅ Mode spectateur pour rejoindre en cours de partie
- ✅ Notifications de départ des joueurs
- ✅ Protection par mot de passe des parties
- ✅ Interface responsive mobile

## Base de mots

La base contient 1582 paires de mots répartis en :
- **Anglais** : 16 catégories
- **Français** : 11 catégories

Chaque paire contient un mot principal et un mot similaire pour tromper le Caméléon.