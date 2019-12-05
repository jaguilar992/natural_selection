const express = require('express')
const app = express()
const PORT = 8520
app.use('/', express.static('./public'))

app.listen(PORT, () => {
  console.log('Running Front Server')
})
