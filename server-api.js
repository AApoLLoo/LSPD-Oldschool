// server-api.js
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg'); // On importe Pool de 'pg'
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuration de la connexion PostgreSQL (OVH)
const pool = new Pool({
    host: 'xw2252-001.eu.clouddb.ovh.net',
    user: 'admin',
    password: 'UasK6v3m19a0UK',
    database: 'MDT-LSPD',
    port: 35599, // Port par défaut de Postgres
    ssl: { rejectUnauthorized: false } // Souvent requis pour les connexions distantes (OVH/Cloud)
});

// Test de connexion au démarrage
pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Erreur de connexion PostgreSQL :', err.stack);
    }
    console.log('✅ Connecté à la base de données PostgreSQL (OVH)');
    release();
});

// --- ROUTES API ---

// Route de connexion
app.post('/auth/login', async (req, res) => {
    const { matricule, password } = req.body;

    // Syntaxe Postgres : on utilise $1 pour le premier paramètre
    const text = 'SELECT * FROM users_lspd WHERE matricule = $1';

    try {
        const result = await pool.query(text, [matricule]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Vérification simple (à sécuriser plus tard avec bcrypt)
            if (user.password === password) {
                // On ne renvoie pas le mot de passe au front
                delete user.password;
                res.json({ success: true, user: user });
            } else {
                res.json({ success: false, message: "Mot de passe incorrect" });
            }
        } else {
            res.json({ success: false, message: "Matricule introuvable" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.get('/dashboard/stats', async (req, res) => {
    try {
        // On fait 2 requêtes en parallèle (plus rapide)
        const reportsQuery = pool.query('SELECT * FROM reports ORDER BY created_at DESC LIMIT 3');
        const warrantsQuery = pool.query('SELECT * FROM warrants WHERE is_active = true ORDER BY created_at DESC LIMIT 3');

        const [reports, warrants] = await Promise.all([reportsQuery, warrantsQuery]);

        res.json({
            success: true,
            reports: reports.rows,
            warrants: warrants.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Erreur SQL Dashboard" });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Serveur API en écoute sur http://localhost:${PORT}`);
});