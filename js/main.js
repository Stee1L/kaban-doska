new Vue({
    el: '#app',
    data() {
        return {
            plannedTasks: [], // чертов массив
            inProgressTasks: [],
            newTask: {
                title: '',
                description: '',
                deadline: '',
                createdAt: new Date().toLocaleString(),
                lastEdited: null,
            },
            editingTaskIndex: -1,
        };
    },
    methods: {
        addTask() {
                if (this.editingTaskIndex !== -1) {
                    // Редактирование
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

            // Получение задачи для перемещения
            const taskToMove = this.plannedTasks[index];


            this.plannedTasks.splice(index, 1);


            this.inProgressTasks.push(taskToMove);
        },
    },

});