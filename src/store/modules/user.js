import Vue from 'vue'

export default {
    namespaced: true,

    state: {
        isLogged: false,
        isRecovery: false,
        isLock: false,
        lockTimeEnd: null,
        recoveryEmail: null,
        data: {}
    },


    mutations: {
        // Запись данных о пользователе
        SET_USER(state, data) {
            state.data = data
            state.isLogged = true

            // Добавление поля route
            switch (data.user_type) {
                case 2:
                    state.data.route = process.env.VUE_APP_USER_TYPE2
                    break
                default:
                    state.data.route = process.env.VUE_APP_USER_TYPE1
                    break
            }

            // Список стран
            let countries = this.getters.getCountries

            // Данные о стране
            state.data.country = countries.filter(country => country.id == state.data.country_id)[0]
            state.data.code = state.data.country.code

            // Преобразование телефона
            state.data.phone_original = state.data.phone
            state.data.phone = (state.data.phone).replace(state.data.country.extension_code, '')

            // Добавление токена ко всем запросам
            Vue.axios.defaults.headers.common = { 'Authorization': `Bearer ${state.data.token}` }

            // Добавление id пользователя в куки
            document.cookie = `user_id=${state.data.id}`
        },

        // Запись данных о восстановлении пароля
        RECOVERY(state, email) {
            state.isRecovery = true
            state.recoveryEmail = email
        },

        // Удаление данных при выходе
        LOGOUT(state) {
            state.data = ''
            state.isLogged = false

            // Удаление токена cо всем запросам
            Vue.axios.defaults.headers.common = { 'Authorization': '' }

            // Удаление id пользователя из куков
            document.cookie = 'user_id=""; domain=doctrine.im; max-age=-1'
        },

        // Обновление данных юзера
        UPDATE_USER(state, user) {
            state.data.name = user.name
            state.data.surname = user.surname
        },

        // Обновление фото
        UPDATE_USER_PHOTO(state, photo) {
            state.data.avatar = photo
        },

        UPDATE_SOCIAL(state, social) {
            state.data.url_facebook = social.facebook
            state.data.url_vk = social.vk
            state.data.url_youtube = social.youtube
            state.data.url_instagram = social.instagram
        }
    },


    actions: {
        // Получение данных о юзере
        async loadUser({ state, commit }) {
            return await Vue.axios.get('/auth/user', { headers: { 'Authorization': `Bearer ${state.data.token}` } })
                .then(res => {
                    res.data.data.token = state.data.token

                    commit('SET_USER', res.data.data)
                    return res.data
                })
                .catch(error => error.response)
        },


        // Регистрация пользователя
        async register({ commit }, formData) {
            return await Vue.axios.post('/auth/register', formData)
                .then(res => {
                    commit('SET_USER', res.data.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Дорегистрация приглашённого пользователя
        async registerContinued({ commit }, formData) {
            return await Vue.axios.post('/auth/register/continued', formData)
                .then(res => {
                    commit('SET_USER', res.data.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Авторизация пользователя
        async login({ commit }, formData) {
            return await Vue.axios.post('/auth/login', formData)
                .then(res => {
                    commit('SET_USER', res.data.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Восстановление пароля
        async recovery({ commit }, formData) {
            return await Vue.axios.post('/auth/send_reset_password', formData)
                .then(res => {
                    commit('RECOVERY', formData.email)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Сброс пароля - новый пароль
        async reset_password({ app }, formData) {
            console.log(app)
            return await Vue.axios.put('/auth/reset_password', formData)
                .then(res => res.data)
                .catch(error => error.response.data)
        },


        // Выход пользователя
        async logout({ commit }) {
            return await Vue.axios.post('/auth/logout')
                .then(res => {
                    commit('LOGOUT')
                    return res
                })
                .catch(error => error.response.data)
        },


        // Выход пользователя
        errorToken({ commit }) {
            commit('LOGOUT')
        },


        async uploadAvatar({ app }, formData) {
            console.log(app)

            return await Vue.axios.post('/auth/profile/update/avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(res => res.data)
                .catch(error => error.response.data)
        },

        update_photo({ commit }, photo) {
            commit('UPDATE_USER_PHOTO', photo)
        },


        // Обновление данные пользователя
        async update({ commit }, formData) {
            return await Vue.axios.put('/auth/profile/update', formData)
                .then(res => {
                    commit('UPDATE_USER', formData)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Обновление пароля пользователя
        async update_password({ app }, formData) {
            console.log(app)
            return await Vue.axios.put('/auth/profile/update/password', formData)
                .then(res => res.data)
                .catch(error => error.response.data)
        },


        // Обновление соц. сети
        async update_social({ commit }, formData) {
            return await Vue.axios.put('/auth/profile/update/social', formData)
                .then(res => {
                    commit('UPDATE_SOCIAL', formData)
                    return res.data
                })
                .catch(error => error.response.data)
        }
    },


    getters: {
        getData: state => state.data
    }
}