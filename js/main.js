new Vue({
    el: '#app',
    data() {
        return {
            plannedTasks: [], // чертов массив
            newTask: {
                title: '',
                description: '',
                deadline: '',
                createdAt: new Date().toLocaleString(),
                lastEdited: null,
            },
        };
    },
    methods: {
        addTask() {
            this.plannedTasks.push({
                title: this.newTask.title,
                description: this.newTask.description,
                deadline: this.newTask.deadline,
                createdAt: this.newTask.createdAt,
                lastEdited: this.newTask.lastEdited,
            });

            this.newTask.title = '';
            this.newTask.description = '';
            this.newTask.deadline = '';
        },
        deleteTask(taskIndex) {
            this.plannedTasks.splice(taskIndex, 1);
        },
    },
});