const express = require('express')
const session = require('express-session')
const app = express()
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    name: 'mySession',
    cookie: {
        httpOnly: true,
        maxAge: 60 * 1000
    }
}))

const userInfo = {
    id: 'kdt9',
    password: '1234'
}

app.get('/T2', (req, res) => {
    const user = req.session.user
    console.log(user)
    if (user === undefined) {
        res.render('T2', { isLogin: false })
    } else {
        res.render('T2', { isLogin: true, user })
    }
})

app.get('/T2_login', (req, res) => {
    res.render('T2_login')
})

app.post('/T2_login', (req, res) => {
    if (req.body.id === userInfo.id && req.body.pw === userInfo.password) {
        req.session.user = req.body.id
        res.redirect('/T2')
    } else {
        res.send(`<script> alert('로그인 실패'); document.location.href='/T2' </script>`)
    }
})

app.get('/T2_logout', (req, res) => {
    const user = req.session.user;
    if (user === undefined) {
        res.send(`<script> alert('잘못된 접근입니다'); document.location.href = '/T2'; </script>`)
    } else {
        req.session.destroy(() => {
            res.clearCookie('mySession')
            res.redirect('/T2')
        })
    }
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})