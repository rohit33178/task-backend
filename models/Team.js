const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
    label: {type: String},
    value: {type: String}
},{timestamp: true})

const TeamModel = mongoose.model("tasks", TeamSchema)

module.exports = TeamModel