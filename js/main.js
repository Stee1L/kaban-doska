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
    methods: {
        addTask() {
            if (this.editingTaskIndex !== -1) {
                this.plannedTasks.splice(this.editingTaskIndex, 1, {
                    title: this.newTask.title,
                    description: this.newTask.description,
                    deadline: this.newTask.deadline,
                    createdAt: this.newTask.createdAt,
                    lastEdited: this.newTask.lastEdited,
                });
                this.editingTaskIndex = -1;
            } else {
                this.plannedTasks.push({
                    title: this.newTask.title,
                    description: this.newTask.description,
                    deadline: this.newTask.deadline,
                    createdAt: this.newTask.createdAt,
                    lastEdited: this.newTask.lastEdited,
                });
            }

            this.newTask.title = '';
            this.newTask.description = '';
            this.newTask.deadline = '';
        },
        deleteTask(taskIndex) {
            this.plannedTasks.splice(taskIndex, 1);
        },
        startEditing(index) {
            this.editingTaskIndex = index;
            const taskToEdit = this.plannedTasks[index];

            this.newTask.title = taskToEdit.title;
            this.newTask.description = taskToEdit.description;
            this.newTask.deadline = taskToEdit.deadline;
        },
        moveToInProgress(index) {
            if (this.editingTaskIndex !== -1) {
                console.error("Завершите редактирование перед перемещением.");
                return;
            }

            const taskToMove = this.plannedTasks[index];

            this.plannedTasks.splice(index, 1);

            this.inProgressTasks.push(taskToMove);
        },
        moveToTesting(index) {
            if (this.editingTaskIndex !== -1) {
                console.error("Завершите редактирование перед перемещением.");
                return;
            }

            const taskToMove = this.inProgressTasks[index];

            this.inProgressTasks.splice(index, 1);

            this.testingTasks.push(taskToMove);
        },
        returnToInProgress(index) {
            const taskToReturn = this.testingTasks[index];


            const returnReason = prompt("Укажите причину возврата в работу:");

            if (returnReason) {
                this.testingTasks.splice(index, 1);
                taskToReturn.returnReason = returnReason;
                this.inProgressTasks.push(taskToReturn);
            }
        },
        moveToCompleted(index, column) {
            let taskToComplete;

            if (column === 'inProgressTasks') {
                taskToComplete = this.inProgressTasks[index];
            } else if (column === 'testingTasks') {
                taskToComplete = this.testingTasks[index];
            } else {
                console.error("Неподдерживаемый столбец");
                return;
            }

            const currentDateTime = new Date();
            const deadlineDateTime = new Date(taskToComplete.deadline);


            if (currentDateTime > deadlineDateTime) {
                taskToComplete.status = 'Просрочено';
            } else {
                taskToComplete.status = 'Выполнено в срок';
            }


            if (column === 'inProgressTasks') {
                this.inProgressTasks.splice(index, 1);
            } else if (column === 'testingTasks') {
                this.testingTasks.splice(index, 1);
            }

            this.completedTasks.push(taskToComplete);
        },
    },

});