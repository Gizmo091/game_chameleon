#!/bin/bash

echo "Demarrage du Jeu du Cameleon..."
echo "=================================="

if ! command -v docker &> /dev/null; then
    echo "Docker n'est pas installe"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "Docker Compose n'est pas installe"
    exit 1
fi

echo "Docker et Docker Compose detectes"

echo "Lancement des services..."
docker compose up -d

echo "Attente du demarrage des services..."
sleep 5

echo "Statut des services :"
docker compose ps

API_PORT=${API_PORT:-3000}
WEBAPP_PORT=${WEBAPP_PORT:-80}

echo ""
echo "Services lances avec succes !"
echo ""
echo "URLs d'acces :"
echo "   API:    http://localhost:${API_PORT}"
echo "   WebApp: http://localhost:${WEBAPP_PORT}"
echo ""
echo "Commandes utiles :"
echo "   Logs:     docker compose logs -f"
echo "   Arret:    docker compose down"
echo "   Restart:  docker compose restart"
