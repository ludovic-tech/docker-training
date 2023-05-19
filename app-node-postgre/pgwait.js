const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = async function pgwait({ pool, timeout, interval }) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function waitForConnection() {
      pool.connect((err, client, done) => {
        if (err) {
          done();
          if (Date.now() - start > timeout) {
            reject(err);
          } else {
            setTimeout(waitForConnection, interval);
          }
        } else {
          done();
          resolve();
        }
      });
    })();
  });
};


// Connectez-vous à la base de données et exécutez des requêtes
pool.connect((err, client, done) => {
  if (err) throw err;
  console.log('Connecté à la base de données PostgreSQL');
  // Ici, vous pouvez exécuter des requêtes sur la base de données
});
