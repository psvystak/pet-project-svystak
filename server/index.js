const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const usersRoutes = require('./routes/users')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(usersRoutes)
app.use(express.static(path.join(__dirname, '../dist')));
app.get('/', function(req, res) {
  res.sendFile('index.html');
});

async function start() {
  try {
    await mongoose.connect(
      'mongodb://admin:admin@127.0.0.1:27017/mydatabase',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => {
      console.log('Server has been started at http://127.0.0.1:3000')
    })
  } catch (e) {
    console.log(e)
  }
}

start()
