var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var todoSchema = new Schema({
    ToDo: { type: String, required:true},
    Priority: { type: String, required:true},
    DueDate: { type: Date, default: Date.now }
  });
  

module.exports =  Mongoose.model('todo', todoSchema);

