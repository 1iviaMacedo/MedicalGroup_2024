const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 5000;

app.use(session({
    secret: 'sua_chave_secreta',
    resave: true,
    saveUninitialized: true,
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'aluno',
    database: 'mydb'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida.');
});

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(express.static('img'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(express.static('pdf'));
app.set('view engine', 'ejs');


// READ
app.get('/cadastro', (req, res) => {
    db.query('SELECT * FROM dados', (err, result) => {
        if (err) throw err;
        res.render('cadastro', { dados: result });
    });
});


//
app.get('/agendamentos', (req, res) => {

    res.render('/agendamentos');

});

//

//
app.get('/arte', (req, res) => {

    res.render('/arte');

});

//


//
app.get('/nutrição', (req, res) => {

    res.render('/nutrição');

});

//


app.get('/login1', (req, res) => {
    db.query('SELECT * FROM dados', (err, result) => {
        if (err) throw err;
        res.render('login1', { dados: result });
    });
});

app.post('/login1', (req, res) => {
    const { username, password } = req.body;
    console.log(`${username} senha: ${password}`)

    const query = 'SELECT * FROM users WHERE name = ? AND email = ?';

    console.log(`${query}`)

    db.query(query, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/dashboard');
        } else {
            // res.send('Credenciais incorretas. <a href="/">Tente novamente</a>');
            res.redirect('/dashboard');
        }
    });
});

app.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        res.render('inicio', { usernamekm: req.session.username });
    } else {
        res.send('Faça login para acessar esta página. <a href="/">Login</a>');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});


app.get('/senha', (req, res) => {
    db.query('SELECT * FROM dados', (err, result) => {
        if (err) throw err;
        res.render('senha', { dados: result });
    });
});



app.get('/login2', (req, res) => {
    db.query('SELECT * FROM dados', (err, result) => {
        if (err) throw err;
        res.render('login2', { dados: result });
    });
});

app.post('/login2', (req, res) => {
    const { username, password } = req.body;
    console.log(`${username} senha: ${password}`)

    const query = 'SELECT * FROM dados WHERE email = ? AND senha = ?';

    console.log(`${query}`)

    db.query(query, [username, password], (err, results) => {
        if (err) throw err;
        //console.log(`${results}`);
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/agendar2');
            console.log(`${req.session}`)
        } else {
            // res.send('Credenciais incorretas. <a href="/">Tente novamente</a>');
            res.redirect('/agendar2');
        }
    });
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM dados', (err, result) => {
        if (err) throw err;
        res.redirect('/login1');
        // res.render('login1', { dados: result });
    });
});

app.get('/agendar', (req, res) => {
    db.query('SELECT * FROM dados', (err, result) => {
        if (req.session.loggedin) {
            res.render('agendar', { usernamekm: req.session.username });
        } else {
            res.send('Faça login para acessar esta página. <a href="/">Login</a>');
        }
    });
});


app.get('/agendar2', (req, res) => {
    console.log("Processando a página /agendar2");

    db.query('SELECT * FROM dados', (err, result) => {
        if (req.session.loggedin) {
            res.render('agendar2', { usernamekm: req.session.username });
        } else {
            res.send('Faça login para acessar esta página. <a href="/login2">Login2</a>');
        }
    });
});

app.post('/agendar2', (req, res) => {
    console.log("Processando o formulário /agendar2");
    const { medico, data, email } = req.body;
    console.log(`${req.body}`);
    console.log(`medico: ${medico} data: ${data} email: ${email}`)
    // res.redirect("/agendar2");
    // const query = 'SELECT * FROM consultas WHERE medico = ? AND data = ? AND email = ?';
    const query = 'INSERT INTO consultas (email, data, medico) VALUES (?, ?, ? )'
    console.log(`${query}`)

    db.query(query, [medico, data, email], (err, results) => {
        if (err) throw err;
        //console.log(`${results}`);
        res.send('Consulta registrada')
    });
});


app.get('/consultas', (req, res) => {
    db.query('SELECT * FROM consultas', (err, result) => {
        console.log(`${typeof(result)}`)
        if (req.session.loggedin) {
            res.render('consultas', { usernamekm: req.session.username, consultas: result });
        } else {
            res.send('Faça login para acessar esta página. <a href="/">Login</a>');
        }
    });
});

app.get('/inicio', (req, res) => {
    db.query('SELECT * FROM dados', (err, result) => {
        if (err) throw err;
        res.render('inicio', { dados: result });
    });
});

app.get('/erro', (req, res) => {
    db.query('SELECT * FROM dados', (err, result) => {
        if (req.session.loggedin) {
            res.render('erro', { usernamekm: req.session.username });
        } else {
            res.send('Faça login para acessar esta página. <a href="/">Login</a>');
        }
    });
});

app.get('/index', (req, res) => {
    db.query('SELECT * FROM dados', (err, result) => {
        if (err) throw err;
        res.render('index', { dados: result });
    });
});

// CREATE
app.post('/add', (req, res) => {
    const { email, CPF, senha } = req.body;
    const sql = 'INSERT INTO dados (email, CPF, senha ) VALUES (?, ?, ?)';
    db.query(sql, [email, CPF, senha], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// UPDATE
app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { email, CPF } = req.body;
    const sql = 'UPDATE dados SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [email, id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// DELETE
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM dados WHERE id = ?';

    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});


// Rota para fazer logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



