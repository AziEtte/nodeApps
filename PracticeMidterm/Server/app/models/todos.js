var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var todoSchema = new Schema({
    todo: { type: String, required:true},
    Priority: { type: String, required:true},
    DueDate: { type: Date }
  });
  

module.exports =  Mongoose.model('Todo', todoSchema);

