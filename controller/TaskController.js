const MemberModel = require("../models/Member")
const TaskModel = require("../models/Task")

async function checkPriority(team){
    let priorityMap = new Map()
    // checking the number of priority in members table
    let membersPriority = await MemberModel.distinct('priority')
    // we are storing the priority array into Map. 
    // reason behind Map is faster then array Includes or indexOf
    membersPriority.map(priority => priorityMap.set(priority, true));
    // check the team length
    let teamLength = team.length
    // here we are checking the last assigned task with priority with size. 
    /* 
        team: [frontend]
        priority: 1

        team: [frontend, backend]
        priority: 1

        here we are checking with size for adject both team have assigned task or not and getting one last assigned task
    */ 
    let modelData = await TaskModel.findOne({team: {$size: teamLength, $in: team }}).sort({"taskDate": -1}).limit(1); 
    
    let priority; 
    if(modelData === null){
        // here we check task is added to team or not if not then give priority to 1
        priority = membersPriority[0]
    }else{
        // here we check the next priority member available or not
        let lastPriproty = Number(modelData?.priority + 1);
        priority = priorityMap.has(lastPriproty) ? lastPriproty : 1
    }    
    return priority
            
}

module.exports = {

    creatTask: async (req, res) => {
        try {
            let {task, team} = req.body
            let taskDate = new Date().toISOString()

            let priority = await checkPriority(team); 
            
            // return;
            let members = await MemberModel.find({team: {$in: team}, priority})

            // mae priority dynamic and once completed then pick from first 
            let membersName = await members.map(member => member.name)

            let content = {task, team, taskDate, members: membersName, priority}
            let tasks = await TaskModel.create(content)
            return {
                status: 200, 
                content
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
            //.explain()
            let tasks = await TaskModel.find({}, {task:1, team: 1,members: 1})
           
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