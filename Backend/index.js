const connetToMongo = require('./db')
const express = require('express')
var cors = require('cors')


connetToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json()) //to send req.body
try {
  app.use('/api/auth', require('./routes/auth'))
  app.use('/api/notes', require('./routes/notes'))  
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})