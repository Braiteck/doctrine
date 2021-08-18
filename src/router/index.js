import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        // Редирект с главной на страницу входа
        {
            path: '/',
            redirect: { name: 'Login' }
        },

        // Авторизация
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/auth/Login'),
            meta: {
                layout: 'auth',
                accessDenied: ['authorized', 'locked']
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/pages/auth/Register'),
            meta: {
                layout: 'auth',
                accessDenied: ['authorized', 'locked']
            }
        },
        {
            path: '/recovery',
            name: 'Recovery',
            component: () => import('@/pages/auth/Recovery'),
            meta: {
                layout: 'auth',
                accessDenied: ['authorized', 'locked']
            }
        },
        {
            path: '/recovery_success',
            name: 'RecoverySuccess',
            component: () => import('@/pages/auth/RecoverySuccess'),
            meta: {
                layout: 'auth',
                accessDenied: ['authorized', 'locked', 'not_recovered']
            }
        },
        {
            path: '/change_password/:token',
            name: 'ChangePassword',
            component: () => import('@/pages/auth/ChangePassword'),
            meta: {
                layout: 'auth',
                accessDenied: ['authorized', 'locked']
            }
        },
        {
            path: '/link_not_valid',
            name: 'LinkNotValid',
            component: () => import('@/pages/auth/LinkNotValid'),
            meta: {
                layout: 'auth'
            }
        },
        {
            path: '/lock_auth',
            name: 'LockAuth',
            component: () => import('@/pages/auth/LockAuth'),
            meta: {
                layout: 'auth',
                accessDenied: ['not_locked']
            }
        },
        {
            path: '/social-auth/:provider/callback',
            component: {
                template: '<div class="auth-component"></div>'
            }
        },

        // Аккаунт пользователя
        {
            path: '/user/profile',
            name: 'UserProfile',
            component: () => import('@/pages/user/Profile'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_author']
            }
        },

        {
            path: '/user/courses',
            name: 'UserCourses',
            component: () => import('@/pages/user/Courses'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_author']
            }
        },

        {
            path: '/user/notes',
            name: 'UserNotes',
            component: () => import('@/pages/user/Notes'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_author']
            }
        },
        {
            path: '/user/notes/lesson/:slug',
            name: 'UserNotesLesson',
            component: () => import('@/pages/user/NotesLesson'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_author']
            }
        },

        {
            path: '/user/lessons',
            name: 'UserLessons',
            component: () => import('@/pages/user/Lessons'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_author']
            }
        },

        // Аккаунт автора
        {
            path: '/author/profile',
            name: 'AuthorProfile',
            component: () => import('@/pages/author/Profile'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/order_history',
            name: 'AuthorOrderHistory',
            component: () => import('@/pages/author/OrderHistory'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/add',
            name: 'AuthorMobAdd',
            component: () => import('@/pages/author/MobAdd'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/mob_menu',
            name: 'AuthorMobMenu',
            component: () => import('@/pages/author/MobMenu'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/courses',
            name: 'AuthorCourses',
            component: () => import('@/pages/author/Courses'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/add_course',
            name: 'AuthorAddCourse',
            component: () => import('@/pages/author/CourseForm'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/course/:authorSlug/:courseId/edit',
            name: 'AuthorEditCourse',
            component: () => import('@/pages/author/CourseForm'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/lessons',
            name: 'AuthorLessons',
            component: () => import('@/pages/author/Lessons'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/users',
            name: 'AuthorUsers',
            component: () => import('@/pages/author/Users'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/users/:userId',
            name: 'AuthorUser',
            component: () => import('@/pages/author/User'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/tariffs',
            name: 'AuthorTariffs',
            component: () => import('@/pages/author/Tariffs'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/integrations',
            name: 'AuthorIntegrations',
            component: () => import('@/pages/author/Integrations'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/integrations/tilda',
            name: 'AuthorIntegrationTilda',
            component: () => import('@/pages/author/IntegrationTilda'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },
        {
            path: '/author/integrations/taplink',
            name: 'AuthorIntegrationTaplink',
            component: () => import('@/pages/author/IntegrationTaplink'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized', 'type_user']
            }
        },

        // Страница курса
        {
            path: '/course/:authorSlug/:courseSlug',
            name: 'UserCourseInfo',
            component: () => import('@/pages/CourseInfo'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized']
            }
        },

        // Страница урока
        {
            path: '/lesson/:authorSlug/:lessonSlug',
            name: 'LessonInfo',
            component: () => import('@/pages/LessonInfo'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized']
            }
        },

        {
            path: '/lesson/:authorSlug/:courseSlug/:lessonSlug',
            name: 'CourseLessonInfo',
            component: () => import('@/pages/LessonInfo'),
            meta: {
                layout: 'account',
                accessDenied: ['not_authorized']
            }
        },

        // Страница ошибки
        {
            path: '*',
            name: 'Error',
            component: () => import('@/pages/Error'),
            meta: {
                layout: 'error'
            }
        }
    ]
})


// Запускается перед каждым роутом
router.beforeEach((to, from, next) => {
    // Загрузка стран если небыло выполнено ранее
    var countriesPromise = new Promise(resolve => resolve(true))

    if (!store.getters.getCountries.length) {
        countriesPromise = store.dispatch('loadCountries')
    }

    countriesPromise.then(() => {
        // Загрузка данных юзера если был авторизован
        if (store.state.user.isLogged && !store.state.user.data.slug) {
            var userPromise = store.dispatch('user/loadUser')
        }

        Promise.all([userPromise]).then(() => {
            // Проверка доступа к странице
            to.matched.some(record => {
                // Массив в запретами
                let access = record.meta.accessDenied

                if (access) {
                    // Запрещено авторизованному
                    if (access.includes('authorized') && store.state.user.isLogged) {
                        next({ path: `/${store.state.user.data.route}/courses` })
                    }

                    // Запрещено не авторизованному
                    if (access.includes('not_authorized') && !store.state.user.isLogged) {
                        next({ name: 'Login' })
                    }

                    // Запрещено если не после восстановления пароля
                    if (access.includes('not_recovered') && !store.state.user.isRecovery) {
                        next({ name: 'Recovery' })
                    }

                    // Запрещено забаненному
                    if (access.includes('locked') && store.state.user.isLock) {
                        next({ name: 'LockAuth' })
                    }

                    // Запрещено не забаненному
                    if (access.includes('not_locked') && !store.state.user.isLock) {
                        next({ name: 'Login' })
                    }

                    // Запрещено типу пользователя - автор
                    if (access.includes('type_author') && store.state.user.data.user_type == 1) {
                        next({ name: 'Login' })
                    }

                    // Запрещено типу пользователя - юзер
                    if (access.includes('type_user') && store.state.user.data.user_type == 2) {
                        next({ name: 'Login' })
                    }
                }

                next()
            })
        })
    })
})

export default router