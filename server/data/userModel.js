const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/reactjack');

// From solo project
// const resultsSchema = new Schema({
//   date: Date,
//   winner: String,
//   playerTotal: Number,
//   dealerTotal: Number,
// });

const userSchema = new Schema({
  user: 
  {
    username: {type:  }
  }
});
// const Result = mongoose.model('Results', resultsSchema);

module.exports = Result;
