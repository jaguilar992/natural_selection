const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const PORT = 8520
const conexion = require('./conexion')
app.use('/', express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`Server :: http://localhost:${PORT}`)
})

app.get('/simu', (req, res) => {
  conexion.getConnection((err, conexion) => {
    if (err) res.status(500).send(err)
    else {
      var query = `
      WITH last_simu AS(
        SELECT
          id_simulacion
        FROM simulacion
        ORDER BY fecha_simulacion DESC
        LIMIT 1
      ) SELECT * FROM dia WHERE id_simulacion IN (SELECT * FROM last_simu)
      `
      conexion.query(query, (err, rslt, fields) => {
        if (err) res.send(err)
        res.status(200).send(rslt)
      })
      conexion.release()
    }
  })
})

app.get('/simu/nueva', (req, res) => {
  conexion.getConnection((err, conexion) => {
    if (err) res.status(500).send(err)
    else {
      var query = 'INSERT INTO simulacion(fecha_simulacion) VALUES (NOW())'
      conexion.query(query, (err, rslt, fields) => {
        if (err) res.send(err)
      })
      conexion.release()
    }
  })
  conexion.getConnection((err, conexion) => {
    if (err) res.status(500).send(err)
    else {
      var query = 'SELECT MAX(id_simulacion) as id_simulacion FROM simulacion'
      conexion.query(query, (err, rslt, fields) => {
        if (err) res.send(err)
        res.status(200).send(rslt[0])
      })
      conexion.release()
    }
  })
})

app.post('/simu/:id/:dia', (req, res) => {
  conexion.getConnection((err, conexion) => {
    if (err) res.status(500).send(err)
    else {
      var idSimulacion = req.params.id
      var poblacion = req.body.poblacion
      var velocidad = req.body.velocidad
      var rango = req.body.rango
      var tamano = req.body.tamano
      var dia = req.params.dia

      var query = 'INSERT INTO dia (id_simulacion, poblacion, velocidad_media, rango_medio, tamano_medio, dia_simulacion) VALUES (?, ?, ?, ?, ?, ?)'
      var valores = [idSimulacion, poblacion, velocidad, rango, tamano, dia]
      conexion.query(query, valores, (err, rslt, fields) => {
        if (err) res.send(err)
        res.status(200).send(rslt)
      })
      conexion.release()
    }
  })
})
