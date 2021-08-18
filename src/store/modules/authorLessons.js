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
        // Запись данных об уроках
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
        async loadLessons({ state, commit }, filter) {
            return await Vue.axios.get('/auth/lessons', {
                params: {
                    limit: filter ? filter.limit : state.limit,
                    offset: filter ? filter.offset : state.data.length,
                    search: filter ? filter.search : ''
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