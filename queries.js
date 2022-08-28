require('dotenv').config()

const { query } = require('express');
const { Client } = require('pg')
const client = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
})

client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});



const getUserRecords = (request, response) => {
    const user_id = parseInt(request.query.user_id)

    client.query('SELECT * FROM records WHERE user_id = ' + user_id, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            response.status(200).json(res.rows)
        }
    })
}

const getUserDeviations = (request, response) => {
    const user_id = parseInt(request.query.user_id)

    client.query('SELECT deviation FROM records WHERE user_id = $1', [user_id], (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            response.status(200).json(res.rows)
        }
    })
}

const createRecord = (request, response) => {
    const label = request.query.label
    const filepath = request.query.filepath
    const user_id = parseInt(request.query.user_id)
    const created_at = request.query.user_id
    const deviation = parseInt(request.query.deviation)

    client.query('INSERT INTO public.records(label, filepath, user_id, created_at, deviation) VALUES ($1, $2, $3, $4, $5)', 
                    [label, filepath, user_id, created_at, deviation], (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            response.status(200).json(res.rows)
        }
    })
}

const deleteRecord = (request, response) => {
    const id = parseInt(request.query.id)

    client.query('DELETE FROM records WHERE id = $1', [id], (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            response.status(200).json(res.rows)
        }
    })
}

module.exports = {
    getUserRecords,
    getUserDeviations,
    createRecord,
    deleteRecord,
}
