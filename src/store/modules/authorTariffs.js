import Vue from 'vue'

export default {
    namespaced: true,

    state: () => ({
        current: {},
        tariffs: {}
    }),


    mutations: {
        // Запись данных о тарифах
        SET_TARIFFS(state, tariffs) {
            state.tariffs = tariffs.data
        },


        // Запись данных о тарифах пользователей
        SET_STUDENTS_TARIFFS(state, tariffs) {
            state.tariffs.students = tariffs.data
        },


        // Запись данных о тарифах хранилища
        SET_MEMORY_TARIFFS(state, tariffs) {
            state.tariffs.memory = tariffs.data
        },


        // Запись данных о тарифах чатов
        SET_CHATS_TARIFFS(state, tariffs) {
            state.tariffs.chats = tariffs.data
        },


        // Запись данных о тарифах
        SET_CURRENT_TARIFFS(state, tariffs) {
            state.current = tariffs.data
        },
    },


    actions: {
        // Получение списка тарифов
        async loadTariffs({ commit }) {
            return await Vue.axios.get('/auth/tariffs')
                .then(res => {
                    commit('SET_TARIFFS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Получение списка тарифов пользователей
        async loadStudentsTariffs({ commit }, data) {
            return await Vue.axios.get('/auth/tariff/filter', {
                params: data
            })
                .then(res => {
                    commit('SET_STUDENTS_TARIFFS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Получение списка тарифов хранилища
        async loadMemoryTariffs({ commit }, data) {
            return await Vue.axios.get('/auth/tariff/filter', {
                params: data
            })
                .then(res => {
                    commit('SET_MEMORY_TARIFFS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Получение списка тарифов чатов
        async loadChatsTariffs({ commit }, data) {
            return await Vue.axios.get('/auth/tariff/filter', {
                params: data
            })
                .then(res => {
                    commit('SET_CHATS_TARIFFS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Получение списка текущих тарифов тарифов
        async loadCurrentTariffs({ commit }) {
            return await Vue.axios.get('/auth/tariff/current')
                .then(res => {
                    commit('SET_CURRENT_TARIFFS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Получение информации о тарифе
        async loadTariffsById({ commit }, data) {
            return await Vue.axios.get('/auth/tariff/show/order', {
                params: data
            })
                .then(res => {
                    commit('SET_CURRENT_TARIFFS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Покупка тарифа
        async buyTariff({ app }, data) {
            console.log(app)
            return await Vue.axios.post('/auth/tariff/buy', data)
                .then(res => res.data)
                .catch(error => error.response.data)
        },


        // Применение промокода
        async applyingPromocode({ app }, data) {
            console.log(app)
            return await Vue.axios.post('/auth/promo_code/apply', data)
                .then(res => res.data)
                .catch(error => error.response.data)
        }
    }
}