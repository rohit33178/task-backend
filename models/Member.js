const mongoose = require("mongoose");

const MemberSchema = mongoose.Schema({
    name: {type: String},
    team: {type: String}, 
    priority: {type: [String], enum: ['developer', 'designer']}
},{timestamp: true})

const MemberModel = mongoose.model("members", MemberSchema)

module.exports = MemberModel