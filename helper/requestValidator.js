const taskData = require("../tasks.json");

class validator {
    static validateTaskDetails(taskInfo, taskData) {
        if (taskInfo.hasOwnProperty("id") &&
            taskInfo.hasOwnProperty("title") &&
            taskInfo.hasOwnProperty("description") &&
            taskInfo.hasOwnProperty("isActive") &&
            !this.validateUniqueTaskId(taskInfo, taskData) &&
            this.validateNonEmptyInputs(taskInfo) &&
            this.validateIsActiveType(taskInfo)) {
            return {
                "status": true,
                "message": "task can be added"
            };
        }
        if (!this.validateUniqueTaskId(taskInfo, taskData)) {
            return {
                "status": false,
                "message": "task id not unique"
            };
        }
        if (!this.validateIsActiveType(taskInfo)) {
            return {
                "status": false,
                "message": "invalid data type for isActive field."
            }
        }
        if (!this.validateNonEmptyInputs(taskInfo)) {
            return {
                "status": false,
                "message": "Title or Description of the task is empty"
            }
        }
        return {
            "status": false,
            "message": "Task Info is malformed please provide all the properties"
        }
    }

    static validateNonEmptyInputs(taskInfo) {
        let res = (taskInfo.title === "" || taskInfo.description === "")
        console.log("res :: ", res)
        return !(taskInfo.title === "" || taskInfo.description === "");
    }

    static validateIsActiveType(taskInfo) {
        let res = (typeof taskInfo.isActive === "boolean")
        console.log("res :: ", res)
        return (typeof taskInfo.isActive === "boolean")
    }

    static validateUniqueTaskId(taskInfo, taskData) {
        let valueFound = taskData.tasks.find(data => data.id === taskInfo.id);
        console.log("res validateUniqueTaskId :: ", !!valueFound)
        return !!valueFound;
    }
    static validateTaskExists(taskId, taskData) {
        let valueFound = taskData.tasks.find(data => data.id === taskId);
        console.log("res validateTaskIdExists :: ", !!valueFound)
        return !!valueFound;
    }
}

module.exports = validator;