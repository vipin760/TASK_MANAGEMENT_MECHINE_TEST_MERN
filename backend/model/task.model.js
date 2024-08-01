const mongoose= require('mongoose');

const taskSchema = mongoose.Schema({
    title:{type:String}
})

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;