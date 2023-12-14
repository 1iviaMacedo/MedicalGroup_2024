const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'seu_servidor',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'login_db'
});

db.connect(err => {
  if (err) {
    console.error('Erro de conexão com o banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida com o banco de dados.');
  }
});

app.use(express.json());

app.post('/login', (req, res) => {
  const { email, senha, cargo } = req.body;

  const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ? AND cargo = ?`;
  db.query(sql, [email, senha, cargo], (err, results) => {
    if (err) {
      console.error('Erro na consulta SQL:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ message: 'Usuário autenticado com sucesso' });
      } else {
        res.status(401).json({ error: 'Credenciais incorretas' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});