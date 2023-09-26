const express = require("express"); 
require("dotenv").config();
const cors = require("cors"); 
const mongoose = require("mongoose"); 

const { creatTask, getTasks } = require("./controller/TaskController");
const MONGO_URI = require("./config");

const app = express(); 
const port = process.env.PORT || 8080

app.use(cors());
app.use(express.json({ limit: "500mb"}))
app.use(express.urlencoded({extended: true}))

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then( () => console.log(`MOngoDB Connected`)).catch(err => console.log(`DB Connecteion Error`));



// API END POINT
app.get("/api/", (req, res) => {
    res.json({
        status: 200, 
        message: "OK"
    })
}); 


app.post("/api/create-task", async (req, res) => {
    let response = await creatTask(req, res)
    res.json(response);
});
app.get("/api/all-tasks", async (req, res) => {
    let response = await getTasks(req, res)
    res.json(response);
});

// start application
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

module.exports = app