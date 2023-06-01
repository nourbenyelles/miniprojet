const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: "",
  database: 'miniprojet'
});

app.get('/api/age', (_req, res) => {
  const query = 'SELECT age, COUNT(*) as count FROM avocat GROUP BY age';
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données dâge des avocats.' });
    } else {
      const labels = results.map((row) => row.age);
      const data = results.map((row) => row.count);
      res.json({ labels, data });
    }
  });
});

app.get('/api/specialite', (_req, res) => {
  const query = 'SELECT specialite, COUNT(*) as count FROM avocat GROUP BY specialite';
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des données de spécialité des avocats." });
    } else {
      const labels = results.map((row) => row.spécialité);
      const data = results.map((row) => row.count);
      res.json({ labels, data });
    }
  });
});

app.post('/api/avocat', (req, response) => {
  const { nom, age } = req.body;
  const query = 'INSERT INTO avocat (nom_av, age) VALUES (?, ?)';
  db.query(query, [nom, age], (error, res) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'insertion des données de l'avocat." });
    } else {
      res.json({ success: true });
    }
  });
});
app.post('/sign', (req, res) => {
  const { name, email, password, code_barrau } = req.body;

  if (!code_barrau) {
    const sql3 = "INSERT INTO client (nom_cl,prenom_cl,email,password) VALUES (?, ?, ?,?)";
    const values3 = [
      req.body.name,
      req.body.prenom,
      req.body.email,
      req.body.password

    ];
    db.query(sql3, values3, (err, result) => {
      if (err) {
        return res.json({ Message: "Error in node.... " });
      }
      return res.json(result);
    });
  } else {
    const sql2 = "INSERT INTO avocat (code_barrau,nom_av,prenom_av,email,password) VALUES (?, ?, ?, ?)";
    const values2 = [
      req.body.code_barrau,
      req.body.name,
      req.body.prenom,
      req.body.email,
      req.body.password
    ];
    db.query(sql2, values2, (err, result) => {
      if (err) {
        return res.json({ Message: "Error in node.... " });
      }
      return res.json(result);
    });
  }
});


app.post('/rendez_vous', (req, res) => {
  const { date_re, heure } = req.body;
  const query = 'INSERT INTO rendez_vous (date_re, heure) VALUES (?, ?)';
  db.query(query, [date_re, heure], (error, _result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'enregistrement du rendez-vous." });
    } else {
      res.json({ success: true });
    }
  });
});
app.get('/avocats', (req, res) => {
  const query = 'SELECT prenom_av FROM avocat'; // Remplacez "avocat" par le nom de votre table

  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Erreur lors de la récupération des prénoms des avocats :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des prénoms des avocats' });
      return;
    }

    const prenomsAvocats = rows.map((row) => row.prenom_av);
    res.json(prenomsAvocats);
  });
});


app.listen(8081, () => {
  console.log("Running...");
});
