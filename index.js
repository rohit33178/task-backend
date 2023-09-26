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

// start application
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

// API END POINT
app.get("/", (req, res) => {
    res.json({
        status: 200, 
        message: "OK"
    })
}); 


app.post("/create-task", async (req, res) => {
    let response = await creatTask(req, res)
    res.json(response);
});
app.get("/all-tasks", async (req, res) => {
    let response = await getTasks(req, res)
    res.json(response);
});

module.exports = app