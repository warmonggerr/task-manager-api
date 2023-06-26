const taskData = require("../tasks.json");

class validator {
    static validateTaskDetails(taskInfo, taskData) {
        let isTaskUnique = this.validateUniqueTaskId(taskInfo, taskData);
        let isInputsNonEmpty = this.validateNonEmptyInputs(taskInfo);
        let isActiveType = this.validateIsActiveType(taskInfo);
        console.log("isTaskUnique :: ", isTaskUnique);
        console.log("isInputsNonEmpty :: ", isInputsNonEmpty);
        console.log("isActiveType :: ", isActiveType);
        if (taskInfo.hasOwnProperty("id") &&
            taskInfo.hasOwnProperty("title") &&
            taskInfo.hasOwnProperty("description") &&
            taskInfo.hasOwnProperty("isActive") &&
            isTaskUnique && isInputsNonEmpty && isActiveType){
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
        return (valueFound === undefined)
    }
}

module.exports = validator;