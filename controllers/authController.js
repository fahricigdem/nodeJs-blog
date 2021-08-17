const User = require('../models/users')

const login_get = (req, res) => {
    res.render('login', { title: "Login" })
}

const login_post = (req, res) => {

}

const signup_get = (req, res) => {
    res.render('signup', { title: "Sign Up" })
}

const signup_post = (req, res) => {
    const user = new User(req.body)
    user.save()
        .then((result) => { res.redirect('/login') })
        .catch((err) => { console.error(err) })
}

const logout_get = (req, res) => { }


module.exports = {
    login_get,
    login_post,
    signup_get,
    signup_post,
    logout_get
}