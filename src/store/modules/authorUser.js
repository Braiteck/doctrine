import Vue from 'vue'

export default {
    namespaced: true,

    state: () => ({
        limit: 5,
        data: {}
    }),


    mutations: {
        // Запись данных о пользователе
        SET_USER(state, user) {
            state.data = user.data
        },

        // Запись данных о курсах пользователя
        SET_USER_COURSES(state, courses) {
            state.data.courses = courses.data
        },

        // Запись данных об уроках пользователя
        SET_USER_LESSONS(state, lessons) {
            state.data.lessons = lessons.data
        },

        // Запись данных о чатах пользователя
        SET_USER_CHATS(state, chats) {
            state.data.chats = chats.data
        }
    },


    actions: {
        // Получение данных пользователя
        async loadUser({ commit }, userId) {
            return await Vue.axios.get('/auth/user/show', {
                params: {
                    id: userId
                }
            })
                .then(res => {
                    commit('SET_USER', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Открытие/Закрытие доступа
        async changeAccess({ app }, data) {
            console.log(app)
            return await Vue.axios.post('/auth/user/change_status', data)
                .then(res => res.data)
                .catch(error => error.response.data)
        },


        // Получение списка курсов
        async loadCourses({ state, commit }, { userId, offset }) {
            return await Vue.axios.get('/auth/user/more_products', {
                params: {
                    id: userId,
                    type: 'course',
                    limit: state.limit,
                    offset: offset
                }
            })
                .then(res => {
                    commit('SET_USER_COURSES', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Получение списка уроков
        async loadLessons({ state, commit }, { userId, offset }) {
            return await Vue.axios.get('/auth/user/more_products', {
                params: {
                    id: userId,
                    type: 'lesson',
                    limit: state.limit,
                    offset: offset
                }
            })
                .then(res => {
                    commit('SET_USER_LESSONS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Получение списка курсов
        async loadChats({ state, commit }, { userId, offset }) {
            return await Vue.axios.get('/auth/user/more_products', {
                params: {
                    id: userId,
                    type: 'chat',
                    limit: state.limit,
                    offset: offset
                }
            })
                .then(res => {
                    commit('SET_USER_CHATS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },
    }
}