new Vue({
    el: '#app',
    data() {
        return {
            testingTasks: [],
            plannedTasks: [],
            inProgressTasks: [],
            completedTasks: [],
            newTask: {
                title: '',
                description: '',
                deadline: '',
                createdAt: new Date().toLocaleString(),
                lastEdited: null,
                returnReason: '',
            },
            editingTaskIndex: -1,
        };
    },
    computed: {
        isTaskValid() {
            return this.newTask.title.trim() !== '' &&
                this.newTask.description.trim() !== '' &&
                this.newTask.deadline.trim() !== '';
        }
    },
    methods: {
        addTask() {
            if (this.editingTaskIndex !== -1) {
                this.updateTask('plannedTasks');
                this.editingTaskIndex = -1;
            } else {
                this.plannedTasks.push({
                    ...this.newTask,
                    isEditing: false,
                });
            }

            this.resetNewTask();
        },
        deleteTask(column, taskIndex) {
            if (column === 'plannedTasks') {
                this.plannedTasks.splice(taskIndex, 1);
            } else if (column === 'inProgressTasks') {
                this.inProgressTasks.splice(taskIndex, 1);
            } else if (column === 'testingTasks') {
                this.testingTasks.splice(taskIndex, 1);
            } else if (column === 'completedTasks') {
                this.completedTasks.splice(taskIndex, 1);
            }
        },
        startEditing(column, index) {
            let tasks;
            if (column === 'plannedTasks') {
                tasks = this.plannedTasks;
            } else if (column === 'inProgressTasks') {
                tasks = this.inProgressTasks;
            } else if (column === 'testingTasks') {
                tasks = this.testingTasks;
            } else {
                console.error("Неподдерживаемый столбец");
                return;
            }
            this.endEditing(tasks);
            this.beginEditing(tasks, index);
        },
        saveEdit(index, column) {
            if (column === 'plannedTasks') {
                this.saveEditForTask(index, this.plannedTasks);
            } else if (column === 'inProgressTasks') {
                this.saveEditForTask(index, this.inProgressTasks);
            } else if (column === 'testingTasks') {
                this.saveEditForTask(index, this.testingTasks);
            }
        },
        deleteTask(taskIndex) {
            this.plannedTasks.splice(taskIndex, 1);
        },
        moveToInProgress(index) {
            this.moveTask(index, 'plannedTasks', 'inProgressTasks');
        },
        moveToTesting(index) {
            this.moveTask(index, 'inProgressTasks', 'testingTasks');
        },
        returnToInProgress(index) {
            const returnReason = prompt("Укажите причину возврата в работу:");
            if (returnReason) {
                const taskToReturn = this.testingTasks[index];
                this.testingTasks.splice(index, 1);
                taskToReturn.returnReason = returnReason;
                this.inProgressTasks.push(taskToReturn);
            }
        },
        moveToCompleted(index, column) {
            const taskToComplete = this.getTaskByColumnAndIndex(column, index);
            this.completeTask(column, index, taskToComplete);
        },
        resetNewTask() {
            this.newTask = {
                title: '',
                description: '',
                deadline: '',
                createdAt: new Date().toLocaleString(),
                lastEdited: null,
                returnReason: '',
            };
        },
        updateTask(column) {
            this.plannedTasks.splice(this.editingTaskIndex, 1, {
                ...this.newTask,
                isEditing: false,
            });
        },
        endEditing(tasks) {
            tasks.forEach((task) => {
                task.isEditing = false;
            });
        },
        beginEditing(tasks, index) {
            const taskToEdit = tasks[index];
            if (taskToEdit) {
                taskToEdit.isEditing = true;
                this.editingTaskIndex = index;
            }
        },
        saveEditForTask(index, tasks) {
            tasks[index].lastEdited = new Date().toLocaleString();
            tasks[index].isEditing = false;
        },
        moveTask(index, sourceColumn, destinationColumn) {
            const taskToMove = this.getTaskByColumnAndIndex(sourceColumn, index);
            this.removeTask(index, sourceColumn);
            this.addTaskToColumn(taskToMove, destinationColumn);
        },
        removeTask(index, column) {
            if (column === 'plannedTasks') {
                this.plannedTasks.splice(index, 1);
            } else if (column === 'inProgressTasks') {
                this.inProgressTasks.splice(index, 1);
            } else if (column === 'testingTasks') {
                this.testingTasks.splice(index, 1);
            } else if (column === 'completedTasks') {
                this.completedTasks.splice(index, 1);
            }
        },
        addTaskToColumn(task, column) {
            if (column === 'plannedTasks') {
                this.plannedTasks.push(task);
            } else if (column === 'inProgressTasks') {
                this.inProgressTasks.push(task);
            } else if (column === 'testingTasks') {
                this.testingTasks.push(task);
            } else if (column === 'completedTasks') {
                this.completedTasks.push(task);
            }
        },
        getTaskByColumnAndIndex(column, index) {
            if (column === 'plannedTasks') {
                return this.plannedTasks[index];
            } else if (column === 'inProgressTasks') {
                return this.inProgressTasks[index];
            } else if (column === 'testingTasks') {
                return this.testingTasks[index];
            } else if (column === 'completedTasks') {
                return this.completedTasks[index];
            }
        },
        completeTask(column, index, task) {
            const currentDateTime = new Date();
            const deadlineDateTime = new Date(task.deadline);

            if (currentDateTime > deadlineDateTime) {
                task.status = 'Просрочено';
            } else {
                task.status = 'Выполнено в срок';
            }


            this.completedTasks.push({
                ...task,
                isEditing: false,
            });

            this.removeTask(index, column);
        },
    },
});