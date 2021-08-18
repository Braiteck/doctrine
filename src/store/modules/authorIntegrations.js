import Vue from 'vue'

export default {
    namespaced: true,

    state: () => ({
        limit: 10,
        data: [],
        tilda: {},
        taplink: {}
    }),


    mutations: {
        // Запись данных об интеграциях
        SET_INTEGRATIONS(state, integrations) {
            state.data = integrations.data
        },

        // Запись данных об интеграции с Tilda
        SET_INTEGRATION_TILDA(state, integration) {
            state.tilda = integration.data
        },

        // Запись данных об интеграции с Taplink
        SET_INTEGRATION_TAPLINK(state, integration) {
            state.taplink = integration.data
        }
    },


    actions: {
        // Получение списка интеграция
        async loadIntegrations({ commit }) {
            return await Vue.axios.get('/auth/integrations')
                .then(res => {
                    commit('SET_INTEGRATIONS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Получение данных об интеграции с Tilda
        async loadIntegrationTilda({ state, commit }, offset) {
            return await Vue.axios.get('/auth/integration/show', {
                params: {
                    slug: 'tilda',
                    limit: state.limit,
                    offset: offset
                }
            })
                .then(res => {
                    commit('SET_INTEGRATION_TILDA', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Получение данных об интеграции с Taplink
        async loadIntegrationTaplink({ state, commit }, offset) {
            return await Vue.axios.get('/auth/integration/show', {
                params: {
                    slug: 'taplink',
                    limit: state.limit,
                    offset: offset
                }
            })
                .then(res => {
                    commit('SET_INTEGRATION_TAPLINK', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Сохранение списка доменов
        async setIntegrationLinks({ app }, data) {
            console.log(app)

            return await Vue.axios.post('/auth/integration/add_links', data)
                .then(res => res.data)
                .catch(error => error.response.data)
        }
    }
}