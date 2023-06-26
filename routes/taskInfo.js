const taskInfo = require('express').Router();
const taskData = require('../tasks.json');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
const validator = require('../helper/requestValidator')
const file = require("../helper/dataReader");

taskInfo.use(bodyParser.urlencoded({ extended: false }));
taskInfo.use(bodyParser.json());


taskInfo.get("/",(req, res)=>{
    let data = file.getData();
    res.status(200)
    res.send(data)
})

taskInfo.get("/:taskId",(req, res)=>{
    let data = file.getData();
    let result = data.tasks.find(val => val.id === req.params.taskId);
    console.log("result :: ", result)
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
    let data = file.getData()
    let isReqValid = validator.validateTaskDetails(body, data)
    if (isReqValid.status){
        data.tasks.push(body);
        fs.writeFileSync(writePath, JSON.stringify(data), { encoding: 'utf8', flag: 'w' });
        res.status(200);
        res.json(body)
    }else {
        res.status(400);
        res.json(isReqValid.message)
    }

})

taskInfo.put("/:id", (req,res)=>{
    let taskId = req.params.id;
    let data = file.getData();
    let writePath = path.join(__dirname, "..",'tasks.json');
    let taskDetails = data.tasks.find((item) => item.id === taskId);
    if (taskDetails === undefined){
        res.status(400);
        res.send("no resource found");
    }else{
        data.tasks = data.tasks.filter((item) => item.id !== taskId)
        taskDetails = JSON.parse(JSON.stringify(taskDetails));
        taskDetails.isActive = !taskDetails.isActive;
        data.tasks.push(taskDetails);
        fs.writeFileSync(writePath, JSON.stringify(data), { encoding: 'utf8', flag: 'w' });
        res.status(200);
        res.json("ok")
    }
})

taskInfo.delete("/:id", (req, res)=>{
    let taskId = req.params.id;
    let writePath = path.join(__dirname, "..",'tasks.json');
    let data = file.getData()
    if(!validator.validateUniqueTaskId(taskId, data)){
        let filteredTasks = data.tasks.filter((item) => item.id !== taskId);
        console.log("filteredTasks :: ",filteredTasks)
        data.tasks = filteredTasks
        console.log("updated tasks :: ",data)
        fs.writeFileSync(writePath, JSON.stringify(data), { encoding: 'utf8', flag: 'w' });
        res.status(200);
        res.json("ok")
    }else{
        res.status(400);
        res.json("resource not found")
    }
})
module.exports = taskInfo;