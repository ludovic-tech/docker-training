# Utilisation de l'image de base Node.js version 14
FROM node:14

# Définition du répertoire de travail pour l'application
WORKDIR /app

# Copie du fichier package.json pour installer les dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Installation de concurrently
RUN npm install -g concurrently

# Installation des modules npm requis
RUN npm install express pg dotenv

# Copie de tous les fichiers sources de l'application
COPY . .

# Exposition du port 3000 pour les connexions entrantes
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]

