const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')

const app = express();

const dbURL = 'mongodb+srv://fahri:asd123@nodeblog.i6tpq.mongodb.net/node-blog?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.redirect('/blog')
})

app.use(blogRoutes)
app.use(adminRoutes)


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