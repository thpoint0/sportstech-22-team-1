const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/records/:id', db.getUserRecords)
app.get('/records/:id', db.getUserDeviations)
app.post('/records', db.createRecord)
app.delete('/records/:id', db.deleteRecord)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
