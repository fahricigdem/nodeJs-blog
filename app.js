const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs')

const app = express();

const dbURL = 'mongodb+srv://fahri:asd123@nodeblog.i6tpq.mongodb.net/node-blog?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(morgan('dev'))

app.get('/add', (req, res) => {

    const blog = new Blog({
        title: 'yeni yazi2',
        short: 'kisa aciklama',
        long: 'uzun aciklama'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/single', (req, res) => {
    Blog.findById('6117ff9bd0cb6d5b9255b631')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})



app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' })
})

app.get('/aboutus', (req, res) => {
    res.redirect('/about')
})

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
})

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page is not found' })
})