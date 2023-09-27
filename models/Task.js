const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    task: {type: String}, 
    team: {type: [String]},
    taskDate: {type: Date}, 
    members: {type: [String], required: false,  default: []}, 
    priority: {type: Number}
},{timestamp: true})

const TaskModel = mongoose.model("tasks", TaskSchema)

module.exports = TaskModel