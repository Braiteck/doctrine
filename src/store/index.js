import Vue from 'vue'
import Vuex from 'vuex'
import vuejsStorage from 'vuejs-storage'

// Модули
import moduleUser from './modules/user'
import moduleUserNotes from './modules/userNotes'
import moduleUserCourses from './modules/userCourses'
import moduleUserLessons from './modules/userLessons'
import moduleAuthorCourses from './modules/authorCourses'
import moduleAuthorLessons from './modules/authorLessons'
import moduleCourseInfo from './modules/courseInfo'
import moduleLessonInfo from './modules/lessonInfo'
import moduleAuthorUsers from './modules/authorUsers'
import moduleAuthorUser from './modules/authorUser'
import moduleAuthorTariffs from './modules/authorTariffs'
import moduleAuthorOrderHistory from './modules/authorOrderHistory'
import moduleAuthorIntegrations from './modules/authorIntegrations'

Vue.use(Vuex)
Vue.use(vuejsStorage)

export default new Vuex.Store({
    state: () => ({
        countries: [],
        courseСategories: []
    }),


    mutations: {
        SET_COUNTRIES(state, payload) {
            state.countries = payload
        },

        SET_COURSE_CATEGORIES(state, payload) {
            state.courseСategories = payload
        }
    },


    actions: {
        // Получение списка стран
        async loadCountries({ commit }) {
            return await Vue.axios.get('/countries')
                .then(res => {
                    commit('SET_COUNTRIES', res.data.data)
                })
        },


        // Получение списка категорий курсов
        async loadCourseСategories({ commit }) {
            return await Vue.axios.get('/auth/categories')
                .then(res => {
                    commit('SET_COURSE_CATEGORIES', res.data.data)
                })
        },


        // Проверка на существования slug курса
        async checkCourseSlug({ app }, { slug, id }) {
            console.log(app)

            const request = Vue.axios.CancelToken.source()
            request.cancel()

            return await Vue.axios.get('/auth/course/check_slug', {
                params: {
                    cancelToken: request.token,
                    slug,
                    id
                }
            }).then(res => res.data.data)
        },


        // Проверка на существования slug урока
        async checkLessonSlug({ app }, { slug, id }) {
            console.log(app)

            const request = Vue.axios.CancelToken.source()
            request.cancel()

            return await Vue.axios.get('/auth/lesson/check_slug', {
                params: {
                    cancelToken: request.token,
                    slug,
                    id
                }
            }).then(res => res.data.data)
        },


        // Поиск урока по названию
        async findLesson({ app }, lessonName) {
            console.log(app)

            const request = Vue.axios.CancelToken.source()
            request.cancel()

            return await Vue.axios.get('/auth/lesson/search', {
                params: {
                    cancelToken: request.token,
                    name: lessonName
                }
            }).then(res => res.data)
        },


        // Поиск урока  или курса по названию
        async findCourseLesson({ app }, query) {
            console.log(app)

            const request = Vue.axios.CancelToken.source()
            request.cancel()

            return await Vue.axios.get('/auth/user/search/lessons_courses', {
                params: {
                    cancelToken: request.token,
                    name: query
                }
            }).then(res => res.data)
        },


        // Поиск email юзера
        async findEmail({ app }, email) {
            console.log(app)

            const request = Vue.axios.CancelToken.source()
            request.cancel()

            return await Vue.axios.get('/auth/user/search', {
                params: {
                    cancelToken: request.token,
                    email
                }
            }).then(res => res.data)
        }
    },


    getters: {
        getCountries: state => state.countries,
        getCourseСategories: state => state.courseСategories
    },


    modules: {
        user: moduleUser,
        userNotes: moduleUserNotes,
        userCourses: moduleUserCourses,
        userLessons: moduleUserLessons,
        authorCourses: moduleAuthorCourses,
        authorLessons: moduleAuthorLessons,
        courseInfo: moduleCourseInfo,
        lessonInfo: moduleLessonInfo,
        authorUsers: moduleAuthorUsers,
        authorUser: moduleAuthorUser,
        authorTariffs: moduleAuthorTariffs,
        authorOrderHistory: moduleAuthorOrderHistory,
        authorIntegrations: moduleAuthorIntegrations
    },


    plugins: [
        // Синхронизация с localeStorage
        vuejsStorage({
            namespace: 'vuex',
            keys: ['user.data.token', 'user.isLogged'],
            driver: vuejsStorage.drivers.localeStorage
        })
    ]
})