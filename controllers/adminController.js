const Blog = require('../models/blogs')
const User = require('../models/users')

// const admin_index = (req, res) => {

//     Blog.find().sort({ createdAt: -1 })
//         .then((result) => { res.render('admin', { title: 'Admin Page', blogs: result }) })
//         .catch((err) => { console.error(err) })
// }


const admin_index = (req, res) => {
    User.find()
        .then(user =>
            Blog.find().sort({ createdAt: -1 })
                .then(blog => res.render('admin', { title: 'Admin Page', blogs: blog, users: user })))
}


const admin_add = (req, res) => {
    res.render('add', { title: 'Add Blog' })
}

const admin_add_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => { res.redirect('/admin') })
        .catch((err) => { console.error(err) })
}

const admin_delete = (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((result) => { res.json({ link: '/admin' }) })
        .catch((err) => { console.log(err) })
}


module.exports = {
    admin_index,
    admin_add,
    admin_add_post,
    admin_delete
}
