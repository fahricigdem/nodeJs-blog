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