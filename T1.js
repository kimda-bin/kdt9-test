const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = 8000;

app.set('view engine', 'ejs')
app.use(cookieParser())

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());



//cookie option 객체
const cookieConfig = {
    httpOnly: true,
    maxAge: 60 * 1000 * 60 * 24,
    //오류났던 부분
    //signed: true

}


app.get('/T1', (req, res) => {
    res.render('T1', { popup: req.cookies.modal })
})

app.post('/setCookie', (req, res) => {
    //쿠키생성
    res.cookie('modal', 'hide', cookieConfig)
    res.send({ result: true, msg: '쿠키생성완료' })
})



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})