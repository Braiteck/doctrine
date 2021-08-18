import Vue from 'vue'

export default {
    namespaced: true,

    state: () => ({
        limit: 10,
        total_users: 0,
        data: []
    }),


    mutations: {
        // Запись данных о пользователях
        SET_USERS(state, users) {
            state.data = users.data
            state.total_users = users.total_users
        }
    },


    actions: {
        // Получение списка пользователей
        async loadUsers({ state, commit }, { search, offset }) {
            return await Vue.axios.get('/auth/users', {
                params: {
                    search: search,
                    limit: state.limit,
                    offset
                }
            })
                .then(res => {
                    commit('SET_USERS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Отправка приглашений пользователям
        async inviteUsers({ app }, formData) {
            console.log(app)

            return await Vue.axios.post('/auth/user/invite', formData)
                .then(res => res.data)
                .catch(error => error.response.data)
        }
    }
}