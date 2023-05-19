const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const app = express();

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Créer la table 'messages' si elle n'existe pas
pool.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL
  );
`)
  .catch((error) => console.error(error));


// Afficher le formulaire
app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/submit">
      <label for="name">Nom :</label>
      <input type="text" name="name" id="name">
      <br>
      <label for="email">Email :</label>
      <input type="email" name="email" id="email">
      <br>
      <label for="message">Message :</label>
      <textarea name="message" id="message"></textarea>
      <br>
      <button type="submit">Envoyer</button>
    </form>
  `);
});

// Stocker les données du formulaire dans la base de données
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  const query = {
    text: 'INSERT INTO messages(name, email, message) VALUES($1, $2, $3)',
    values: [name, email, message],
  };
  pool.query(query)
    .then(() => res.send('Message envoyé avec succès !'))
    .catch((error) => console.error(error));
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
