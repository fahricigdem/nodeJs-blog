const express = require('express');
const morgan = require('morgan');

const app = express();
app.set('view engine', 'ejs');

app.listen(3000)

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' })
})

app.get('/aboutus', (req, res) => {
    res.redirect('/about')
})

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page is not found' })
})