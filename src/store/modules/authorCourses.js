import Vue from 'vue'

export default {
    namespaced: true,

    state: () => ({
        limit: 6,
        loadStatus: false,
        total_courses: 0,
        data: []
    }),


    mutations: {
        // Запись данных о курсах
        SET_COURSES(state, courses) {
            state.data = state.data.concat(courses.data)
            state.total_courses = courses.total_courses

            // Определение есть ли дозагрузка у курсов
            state.total_courses - state.data.length > 0
                ? state.loadStatus = true
                : state.loadStatus = false
        }
    },


    actions: {
        // Получение списка курсов
        async loadCourses({ state, commit }) {
            return await Vue.axios.get('/auth/courses', {
                params: {
                    limit: state.limit,
                    offset: state.data.length
                }
            })
                .then(res => {
                    commit('SET_COURSES', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        }
    }
}