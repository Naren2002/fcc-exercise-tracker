const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(process.env.MONGO_URI).catch(err => console.log(err));

// TODO: Replace the Objects with Mongoose Models

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

let userExerciseData = {

}

let userId = 0

app.post("/api/users", function(req, res){
  let userName = (req.body.username);
  userId += 1;
  userData[userId] = {
      _id: userId,
      username: userName
  }

  res.json(userData[userId]);

});

app.get("/api/users", function(req, res){
  res.json(userData);
});

app.post("/api/users/:_id/exercises", function(req, res){
  let inputId = req.params._id;

  let inputDescription = req.body.description;
  let inputDuration = req.body.duration;
  let inputDate = (!req.body.date? new Date(): new Date(req.body.date));

  let insertExerciseData = {
    description: inputDescription,
    duration: inputDuration,
    date: inputDate
  }

  userData[inputId][date] = inputDate.toDateString();
  userData[inputId][duration] = inputDuration;
  userData[inputId][description] = inputDescription;

  if(!(inputId in userExerciseData)){
    userExerciseData[inputId] = [insertExerciseData];
  }else{
    userExerciseData[inputId].push(insertExerciseData);
  }

  console.log(userData);
  console.log(userExerciseData);
  
  res.json(userData[inputId]);
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
