const priv = require('./private.env')

const Pool = require('pg').Pool
const pool = new Pool({
    user: priv.user,
    host: priv.host,
    database: priv.database,
    password: priv.password,
    port: priv.port,
})

const getUserRecords = (request, response) => {
    const user_id = parseInt(request.params.user_id)

    pool.query('SELECT * FROM records WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserDeviations = (request, response) => {
    const user_id = parseInt(request.params.user_id)

    pool.query('SELECT deviations FROM records WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
    })
}

const createRecord = (request, response) => {
    const { label, filepath, user_id, created_at, deviation } = request.body
  
    pool.query('INSERT INTO records (label, filepath, user_id, created_at, deviation) VALUES ($1, $2, $3, $4, $5) RETURNING *', [label, filepath, user_id, created_at, deviation], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Record added with ID: ${results.rows[0].id}`)
    })
}

const deleteRecord = (request, response) => {
    const user_id = parseInt(request.params.user_id)
  
    pool.query('DELETE FROM records WHERE id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Record deleted with ID: ${user_id}`)
    })
}

module.exports = {
    getUserRecords,
    getUserDeviations,
    createRecord,
    deleteRecord,
}
