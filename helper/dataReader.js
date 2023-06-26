const fs = require("fs");
const path = require("path");

class Data{
    static getData(){
        let readPath = path.join(__dirname, "..",'tasks.json');
        let jsonString = fs.readFileSync(readPath,"utf-8")
        let tasks = JSON.parse(jsonString)
        console.log(tasks)
        return tasks
    }
}

module.exports = Data