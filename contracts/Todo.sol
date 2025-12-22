// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract Todo {
    struct Task {
        uint256 id;
        string name;
        uint256 createdAt;
        uint256 updatedAt;
        uint256 completedAt;
        uint256 deletedAt;
    }


    mapping(address => Task[]) public tasks;

   event TaskCreated(address indexed user, uint256 indexed taskId, string name);
   event TaskUpdated(address indexed user, uint256 indexed taskId, string name);
   event TaskDeleted(address indexed user, uint256 indexed taskId);
   event TaskCompleted(address indexed user, uint256 indexed taskId);



    function createTask (string memory _name) public returns (uint256) {
        uint256 id = tasks[msg.sender].length;

         tasks[msg.sender].push(
                Task({
                    id: id,
                    name: _name,
                    createdAt: block.timestamp,
                    updatedAt: block.timestamp,
                    completedAt: 0,
                    deletedAt: 0
                })
            ); 
        emit TaskCreated(msg.sender, id, _name);
        return id;
    }

    function getTaskById(uint256 _id) public view returns (Task memory) {
        Task[] storage userTasks = tasks[msg.sender];

        for (uint256 i = 0; i < userTasks.length; i++) {
            if (userTasks[i].id == _id && userTasks[i].deletedAt == 0) {
                return userTasks[i];
            }
        }

        revert("Task not found");
    }

    function updateTask(string memory _name, uint256 taskId) public {
        Task[] storage userTasks = tasks[msg.sender];

        for (uint256 i = 0; i < userTasks.length; i++) {
            if (userTasks[i].id == taskId && userTasks[i].deletedAt == 0) {
                userTasks[i].name = _name;
                userTasks[i].updatedAt = block.timestamp;
                emit TaskUpdated(msg.sender, taskId, _name);
                return;
            }
        }
        revert("Task not found");
   }

   function deleteTask (uint256 taskId) public {
        Task[] storage userTasks = tasks[msg.sender];

        for (uint256 i = 0; i < userTasks.length; i++) {
            if (userTasks[i].id == taskId && userTasks[i].deletedAt == 0) {
                userTasks[i].deletedAt = block.timestamp;
                emit TaskDeleted(msg.sender, taskId);
                return;
            }
        }
        revert("Task not found");
   }

   function getAllTasksForAUser() public view returns (Task[] memory) {
     Task[] storage userTasks = tasks[msg.sender];


     uint256 activeCount = 0;

     for (uint256 i = 0; i < userTasks.length; i++) {
        if (userTasks[i].deletedAt == 0) {
            activeCount++;
        }
    }

   
    Task[] memory activeTasks = new Task[](activeCount);
    uint256 j = 0;

    for (uint256 i = 0; i < userTasks.length; i++) {
        if (userTasks[i].deletedAt == 0) {
            activeTasks[j] = userTasks[i];
            j++;
        }
    }

    return activeTasks;
   }

   function markTaskAsCompleted(uint256 taskId) public {
     Task[] storage userTasks = tasks[msg.sender];

     for(uint256 i = 0; i < userTasks.length; i++){
        if(userTasks[i].id == taskId){
            userTasks[i].completedAt = block.timestamp;
            emit TaskCompleted(msg.sender, taskId);
            return;
        }
     }
     revert('Task not found');
   }
}