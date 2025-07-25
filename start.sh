#!/bin/bash

echo "🎯 Démarrage du Jeu du Caméléon..."
echo "=================================="

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé"
    exit 1
fi

echo "✅ Docker et Docker Compose détectés"

# Lancer les services
echo "🚀 Lancement des services..."
docker-compose up -d

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..."
sleep 10

# Vérifier le statut
echo "📊 Statut des services :"
docker-compose ps

echo ""
echo "🎉 Services lancés avec succès !"
echo ""
echo "📍 URLs d'accès :"
echo "   API:    http://localhost:3000"
echo "   WebApp: http://localhost:8080"
echo ""
echo "🌐 URLs de production (avec reverse proxy) :"
echo "   API:    http://api.cameleon.vedielaute.fr"
echo "   WebApp: http://cameleon.vedielaute.fr"
echo ""
echo "📋 Commandes utiles :"
echo "   Logs:     docker-compose logs -f"
echo "   Arrêt:    docker-compose down"
echo "   Restart:  docker-compose restart"