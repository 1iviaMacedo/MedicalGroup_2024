const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'mydb'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados');
  }
});

app.get('/index', (req, res) => {
  res.render('pages/index');
});

app.post('/index', (req, res) => {
  const data = req.body.data;
  const senha = req.body.senha;

  if (!medico || !data || !senha) {
    return res.status(400).json({ error: 'Campos incompletos' });
  }

  const consulta = { medico, data, senha };
  db.query('INSERT INTO consultas SET ?', consulta, (err, results) => {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    res.json({ message: 'Pedido de agendamento enviado' });
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


