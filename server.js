const { response } = require('express');
const express = require('express');
const fs = require('fs');
const knex = require('knex');
const path = require('path')
const bcrypt = require('bcryptjs');
const { env } = require('process');
 

let zalogowano = false;

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,
      ssl: true,
    }
});


const app = express();



app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(express.static(__dirname + '/login'));


app.use('/warsztat', express.static('public'));




app.post('/', function (req, res) {
    const { login, password } = req.body;
    if (login === 'majster' && bcrypt.compareSync(password, '$2b$10$ArSEuMhsuirSppa0uY9euefmKuWkdDhLV0j0ziKaoaleWCgPsfhFq')) {
        zalogowano = true;
        res.redirect('/warsztat')
    } else {
        res.send(`<h1>BAD LOGIN</h1>`)
    }
});

app.get('/warsztat', function (req, res){
    if (zalogowano === true) {
        res.sendFile(
            __dirname + '/index.html'
        )
    } else {
        res.redirect('/')
    }

})

app.get('/logout', function(req, res) {
    zalogowano = false
    res.redirect('/')
})

app.post('/warsztat', function (req, res) {
    const { rodzaj, nazwa, ilosc} = req.body
    if (zalogowano === true) {
    db('warsztat1').insert({
        rodzaj: rodzaj,
        opis: nazwa,
        ilość: ilosc
    }).then(res.redirect('back'))
    } else {
    res.redirect('/')
    }
})

app.delete('/:opis', function(req, res) {
    const { opis } = req.params
    db('warsztat1')
    .where('opis', opis)
    .delete()
    .then(res.end())
})

app.put('/minus/:opis1', function(req, res) {
    const { opis1 } = req.params
    db('warsztat1')
    .where('opis', opis1)
    .decrement('ilość', 1)
    .then(res.end())
})

app.put('/:opis', function(req, res) {
    const { opis } = req.params
    db('warsztat1')
    .where('opis', opis)
    .increment('ilość', 1)
    .then(res.redirect(req.get('referer')))
})



app.get('/items', function(req, res){
    db.select().from('warsztat1')
    .returning('*')
    .then(entries => {
        res.json(entries)
    })
})

app.get('/rowery', function(req, res){
    db('warsztat1').where({
        rodzaj: 'ROWER',
      }).select()
    .then(entries => {
        res.json(entries)
    })
})

app.get('/czesci', function(req, res){
    db('warsztat1').where({
        rodzaj: 'CZĘŚĆ',
      }).select()
    .then(entries => {
        res.json(entries)
    })
})


app.listen(process.env.PORT || 3000);
