import Vue from 'vue'

export default {
    namespaced: true,

    state: () => ({
        limit: 6,
        loadStatus: false,
        total_lessons: 0,
        data: []
    }),


    mutations: {
        // Запись данных о уроках
        SET_LESSONS(state, lessons) {
            state.data = state.data.concat(lessons.data)
            state.total_lessons = lessons.total_lessons

            // Определение есть ли дозагрузка у уроков
            state.total_lessons - state.data.length > 0
                ? state.loadStatus = true
                : state.loadStatus = false
        }
    },


    actions: {
        // Получение списка уроков
        async loadLessons({ state, commit }) {
            return await Vue.axios.get('/auth/my/lessons', {
                params: {
                    limit: state.limit,
                    offset: state.data.length
                }
            })
                .then(res => {
                    commit('SET_LESSONS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        }
    }
}