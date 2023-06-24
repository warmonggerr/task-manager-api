const taskInfo = require('express').Router();
const taskData = require('../tasks.json');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
const validator = require('../helper/requestValidator')

taskInfo.use(bodyParser.urlencoded({ extended: false }));
taskInfo.use(bodyParser.json());


taskInfo.get("/",(req, res)=>{
    let writePath = path.join(__dirname, "..",'tasks.json');
    let resData;
    fs.readFile(writePath, 'utf8', function(err, data){
        // Display the file content
        console.log(data);
        resData = JSON.parse(JSON.stringify(data));
    });
    res.status(200)
    res.send(resData)
})

taskInfo.get("/:taskId",(req, res)=>{
    let tasks = taskData.tasks;
    let result = tasks.filter(val => val.id === req.params.taskId);
    if (result.length === 0){
        res.status(400)
        res.send("task doesnt exist")
    }else{
        res.status(200);
        res.send(result);
    }
})

taskInfo.post("/", (req,res) => {
    let body = req.body;
    console.log("body :: ", body);
    let writePath = path.join(__dirname, "..",'tasks.json');
    if (validator.validateTaskDetails(body, taskData).status){
        let taskDataV2 = JSON.parse(JSON.stringify(taskData));
        taskDataV2.tasks.push(body);
        fs.writeFileSync(writePath, JSON.stringify(taskDataV2), { encoding: 'utf8', flag: 'w' });
        res.status(200);
        res.json(body)
    }else {
        res.status(400);
        res.json(validator.validateTaskDetails(body, taskData))
    }

})

// taskInfo.put("/:id", (req,res)=>{
//
// })

taskInfo.delete("/:id", (req, res)=>{
    let taskId = req.params.id;
    let writePath = path.join(__dirname, "..",'tasks.json');
    if(validator.validateTaskExists(taskId, taskData)){
        let taskDataV2 = JSON.parse(JSON.stringify(taskData));
        let filteredTasks = taskDataV2.tasks.filter((item) => item.id !== taskId);
        console.log("filteredTasks :: ",filteredTasks)
        taskDataV2.tasks = filteredTasks
        console.log("updated tasks :: ",taskDataV2)
        fs.writeFileSync(writePath, JSON.stringify(taskDataV2), { encoding: 'utf8', flag: 'w' });
        res.status(200);
        res.json("ok")
    }else{
        res.status(400);
        res.json("resource not found")
    }
})
module.exports = taskInfo;