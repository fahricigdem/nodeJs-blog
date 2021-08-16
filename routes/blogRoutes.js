const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs')

router.get('/blog', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'Home Page', blogs: result })
        })
        .catch((err) => {
            console.error(err)
        })
})


router.get('/blog/:id', (req, res) => {
    const id = req.params.id

    Blog.findById(id)
        .then((result) => {
            res.render('blog', { blog: result, title: 'Blog Detail' })
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Page is not found' })
        })
})

module.exports = router