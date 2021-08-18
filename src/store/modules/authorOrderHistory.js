import Vue from 'vue'

export default {
    namespaced: true,

    state: () => ({
        limit: 10,
        total_orders: 0,
        data: []
    }),


    mutations: {
        // Запись данных о тарифах
        SET_ORDERS(state, orders) {
            state.data = orders.data
            state.total_orders = orders.total_orders
        }
    },


    actions: {
        // Получение списка заказов
        async loadOrders({ state, commit }, offset) {
            return await Vue.axios.get('/auth/history', {
                params: {
                    limit: state.limit,
                    offset: offset != 'undefined' ? offset : state.data.length
                }
            })
                .then(res => {
                    commit('SET_ORDERS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        }
    }
}