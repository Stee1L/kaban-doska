new Vue({
    el: '#app',
    data() {
        return {
            newTask: {
                title: '',
                description: '',
                deadline: '',
                reatedAt: new Date().toLocaleString(),
                lastEdited: null
            },


        }
    }})