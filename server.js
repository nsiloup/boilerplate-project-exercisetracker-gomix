const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
let mongoose = require("mongoose");
let {usersRouter} = require("./routes/usersRoutes");
let {exercisesRouter} = require("./routes/exercisesRoutes");
let {logsRouter} = require("./routes/logsRoutes");
let {deleteSome} = require("./helpers/deleteSome");


let uriSting = process.env.MONGO_URI
let log = console.log;

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});




mongoose.connect(uriSting, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
      log("Connection to the DB succeeeeed!");

      //Mongo & Node manipulations will go here//
      app.use("/api/users", usersRouter, exercisesRouter, logsRouter);

      // Call a function to delete some exceeding data
      deleteSome()


    })
    .catch(err =>log("Error connecting to the DB :",err))



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
