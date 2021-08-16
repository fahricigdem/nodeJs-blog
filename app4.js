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
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'Home Page', blogs: result })
        })
        .catch((err) => {
            console.error(err)
        })
})


app.get('/blog/:id', (req, res) => {
    const id = req.params.id

    Blog.findById(id)
        .then((result) => {
            res.render('blog', { blog: result, title: 'Blog Detail' })
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Page is not found' })
        })
})

app.get('/admin', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('admin', { title: 'Admin Page', blogs: result })
        })
        .catch((err) => {
            console.error(err)
        })
})

app.get('/admin/add', (req, res) => {

    res.render('add', { title: 'Add Blog' })
})

app.post('/admin/add', (req, res) => {

    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/admin')
        })
        .catch((err) => {
            console.error(err)
        })
})

app.delete('/admin/delete/:id', (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ link: '/admin' })
        })
        .catch((err) => {
            console.log(err)
        })
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