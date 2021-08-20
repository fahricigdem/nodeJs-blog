const User = require('../models/users')
const jwt = require('jsonwebtoken')

const maxAge = 60 * 60 * 24
const createToken = (id) => {
    return jwt.sign({ id }, 'secret word', { expiresIn: maxAge })
}

const login_get = (req, res) => {
    res.render('login', { title: "Login" })
}

const login_post = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.redirect('/admin')
    }
    catch (e) {
        console.log(e)
        res.redirect('/login')
    }
}

const signup_get = (req, res) => {
    res.render('signup', { title: "Sign Up" })
}

const signup_post = (req, res) => {
    const user = new User(req.body)
    user.save()
        .then((result) => { res.redirect('/login') })
        .catch((err) => {
            console.error(err)
            res.redirect('/signuperror')

        })
}

const logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
}


module.exports = {
    login_get,
    login_post,
    signup_get,
    signup_post,
    logout_get
}