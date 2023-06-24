task manager project

The functionalities supported

Add a task
View all tasks
View the task details
Delete the task

packages to be installed

body-parser cors express fs path

Commands to be run

Installing the packages - npm install

Starting the server - node index.js

curl to create a task (Modify the task details and other details as per the need) Method: POST

curl --location 'localhost:3000/tasks' \
--header 'Content-Type: application/json' \
--data '{
"id": "2",
"title": "Task 2",
"description": "Test 2",
"isActive": true
}'

curl to delete the task: DELETE
curl --location --request DELETE 'localhost:3000/tasks/2'

curl to get all the tasks Method GET
curl --location 'localhost:3000/tasks'

curl to get a particular task Method GET
curl --location 'localhost:3000/tasks/2'