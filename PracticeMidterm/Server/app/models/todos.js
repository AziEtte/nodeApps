var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var todoSchema = new Schema({
    todo: { type: String, required:true},
    Priority: { type: String, required:true},
    DueDate: { type: Date, default: Date.now}
  });
  

module.exports =  Mongoose.model('Todo', todoSchema);


