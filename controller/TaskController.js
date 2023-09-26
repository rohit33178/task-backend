const MemberModel = require("../models/Member")
const TaskModel = require("../models/Task")

module.exports = {

    creatTask: async (req, res) => {
        try {
            let {task, team} = req.body
            let taskDate = new Date().toISOString()
            let members = await MemberModel.find({team: {$in: team}})
            let memberIds = members.map(member => member.name)
            let content = {task, team, taskDate, members: memberIds}
            let tasks = await TaskModel.create(content)
            return {
                status: 200, 
                tasks
            }
        } catch (error) {
            return {
                status: 500, 
                message: error.message
            }
        }
    }, 
    getTasks: async (req, res) => {
        try {
            let tasks = await TaskModel.find({}, {task:1, team: 1,members: 1,  taskDate: 1})
           
            return {
                status: 200, 
                tasks
            }
        } catch (error) {
            return {
                status: 500, 
                message: error.message
            }
        }
    }
}