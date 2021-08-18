import Vue from 'vue'

export default {
    namespaced: true,

    state: () => ({
        data: []
    }),


    mutations: {
        // Запись данных о курсе
        SET_COURSE(state, course) {
            state.data = course.data
        }
    },


    actions: {
        // Получение данных о курсе
        async loadCourseInfo({ commit }, courseSlug) {
            return await Vue.axios.get('/auth/course', {
                params: {
                    slug: courseSlug
                }
            })
                .then(res => {
                    commit('SET_COURSE', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },

        // Создание нового курса
        async createCourse({ app }, formData) {
            console.log(app)
            return await Vue.axios.post('/auth/course/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(res => res.data)
                .catch(error => error.response.data)
        },

        // Получение данных о курсе для редактирования
        async editCourseInfo({ app }, courseId) {
            console.log(app)
            return await Vue.axios.get('/auth/course/show', {
                params: {
                    id: courseId
                }
            })
                .then(res => res.data)
                .catch(error => error.response.data)
        },

        // Редактирование курса
        async updateCourse({ app }, formData) {
            console.log(app)
            return await Vue.axios.post('/auth/course/update', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(res => res.data)
                .catch(error => error.response.data)
        },

        // Удаление курса
        async deleteCourse({ app }, courseID) {
            console.log(app)
            return await Vue.axios.delete('/auth/course/delete', {
                params: {
                    id: courseID
                }
            })
                .then(res => res.data)
                .catch(error => error.response.data)
        }
    }
}