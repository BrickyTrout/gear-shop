const express = require('express')
const catalogue = require('./routes/catalogue')
const app = express()
const port = 3001
const dotenv = require('dotenv').config()
app.use('/catalogue',catalogue)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})