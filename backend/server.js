const express = require('express')
const bodyParser = require("body-parser");
const db = require('./db')

const PORT = 5000
const app = express()

app.use(bodyParser.json())

// create db table
db.pool.query(`CREATE TABLE lists (id INTEGER AUTO_INCREMENT, value TEXT, PRIMARY KEY (id)`, (err, results, fields) => {
    console.log('results', results)
})

// DB Lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get("/api/values", function (req, res) {
    // db 에서 모든 정보 가져오기
    db.pool.query('SELECT * FROM lists', (err, results, fields) => {
        if (err) return res.status(500).send(err)
        else return res.json(results)
    })
})

// client 에서 입력한 값을 데이터베이스에 입력하기
app.post("/api/value", function (req, res) {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results, fields) => {
        if (err) return res.status(500).send(err)
        else return res.json({success: true, value: req.body.value})
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
