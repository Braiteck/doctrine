<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Пользователь -->
        <section class="user_info block">
            <!-- Пользователь - Верхняя часть -->
            <section class="head">
                <!-- Пользователь - Верхняя часть - Кнопка "Назад" -->
                <router-link :to="`/${$store.state.user.data.route}/users`" class="back_link"></router-link>

                <!-- Пользователь - Верхняя часть - Аватар -->
                <div class="avatar">
                    <img v-lazy="imagesUrl + user.avatar.avatar_mini" alt="" class="lazyload" v-if="user.avatar">
                    <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>
                </div>

                <!-- Пользователь - Верхняя часть - ФИО -->
                <div class="name">{{ user.name }} {{ user.surname }}</div>

                <!-- Пользователь - Верхняя часть - Дата регистрации -->
                <div class="register_date">{{ $t('message.user_register_date') }}: {{ user.add_at }}</div>
            </section>


            <!-- Пользователь - Данные -->
            <section class="info">
                <!-- Пользователь - Данные - ФИО -->
                <div class="item">
                    <div class="name">
                        <svg class="icon icon1"><use xlink:href="/images/sprite.svg#ic_user"></use></svg>
                        <span>{{ $t('message.user_info_label_fio') }}</span>
                    </div>

                    <!-- Пользователь - Данные - Значение -->
                    <div class="val">{{ user.name }} {{ user.surname }}</div>
                </div>

                <!-- Пользователь - Данные - ФИО -->
                <div class="item">
                    <div class="name">
                        <svg class="icon icon2"><use xlink:href="/images/sprite.svg#ic_phone"></use></svg>
                        <span>{{ $t('message.user_info_label_phone') }}</span>
                    </div>

                    <!-- Пользователь - Данные - Значение -->
                    <div class="val">{{ user.phone }}</div>
                </div>

                <!-- Пользователь - Данные - ФИО -->
                <div class="item">
                    <div class="name">
                        <svg class="icon icon3"><use xlink:href="/images/sprite.svg#ic_email"></use></svg>
                        <span>{{ $t('message.user_info_label_email') }}</span>
                    </div>

                    <!-- Пользователь - Данные - Значение -->
                    <div class="val">{{ user.email }}</div>
                </div>
            </section>


            <!-- Пользователь - Доступы -->
            <section class="accesses">
                <!-- Пользователь - Доступы - Заголовок -->
                <div class="block_title">Доступы</div>

                <div class="data tabs_container">
                    <!-- Пользователь - Доступы - Табы -->
                    <div class="head">
                        <div class="tabs">
                            <!-- Пользователь - Доступы - Табы - "Курсы" -->
                            <button :class="{ active: activeTab == 'tab1' }" @click.prevent="activeTab = 'tab1'" v-if="user.courses && user.courses.length">
                                {{ $t('message.product_type_courses') }}
                            </button>

                            <!-- Пользователь - Доступы - Табы - "Уроки" -->
                            <button :class="{ active: activeTab == 'tab2' }" @click.prevent="activeTab = 'tab2'" v-if="user.lessons && user.lessons.length">
                                {{ $t('message.product_type_lessons') }}
                            </button>

                            <!-- Пользователь - Доступы - Табы - "Чаты" -->
                            <button :class="{ active: activeTab == 'tab3' }" @click.prevent="activeTab = 'tab3'" v-if="user.chats && user.chats.length">
                                {{ $t('message.product_type_chats') }}
                            </button>
                        </div>
                    </div>


                    <!-- Пользователь - Доступы - "Курсы" -->
                    <div class="tab_content" :class="{ active: activeTab == 'tab1' }" v-if="user.courses && user.courses.length">
                        <!-- Пользователь - Доступы - "Курсы" - Список -->
                        <div class="list">
                            <!-- Пользователь - Доступы - "Курсы" - Курс -->
                            <div class="item" v-for="(course, index) in user.courses" :key="`${index}`">
                                <!-- Пользователь - Доступы - "Курсы" - Курс - Изображение -->
                                <div class="thumb">
                                    <img v-lazy="imagesUrl + course.image" alt="" class="lazyload">
                                </div>

                                <div class="info">
                                    <!-- Пользователь - Доступы - "Курсы" - Курс - Название -->
                                    <div class="name">
                                        {{ course.name }}
                                        <svg class="icon" v-if="!course.status"><use xlink:href="/images/sprite.svg#ic_access2"></use></svg>
                                    </div>

                                    <!-- Пользователь - Доступы - "Курсы" - Курс - Описание -->
                                    <div class="desc">{{ course.short_description }}</div>
                                </div>

                                <div class="status">
                                    <!-- Пользователь - Доступы - "Курсы" - Курс - Кнопка открытия доступа -->
                                    <button class="btn open_btn" v-if="!course.status" @click.prevent="changeAccess({ id: course.id, type: 'course', user_id: user.id, status: 1 })">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_access2"></use></svg>
                                        <span>{{ $t('message.btn_access_open') }}</span>
                                    </button>

                                    <!-- Пользователь - Доступы - "Курсы" - Курс - Кнопка закрытия доступа -->
                                    <button class="btn close_btn" v-else @click.prevent="changeAccess({ id: course.id, type: 'course', user_id: user.id, status: 0 })">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_access"></use></svg>
                                        <span>{{ $t('message.btn_access_close') }}</span>
                                    </button>

                                    <!-- Пользователь - Доступы - "Курсы" - Курс - Дата открытия доступа -->
                                    <div class="date" v-if="course.status">{{ $t('message.user_accesses_open_date') }}: {{ course.date }}</div>

                                    <!-- Пользователь - Доступы - "Курсы" - Курс - Дата закрытия доступа -->
                                    <div class="date" v-else>{{ $t('message.user_accesses_close_date') }}: {{ course.date }}</div>
                                </div>
                            </div>
                        </div>


                        <!-- Пользователь - Доступы - Нижняя панель -->
                        <div class="bottom">
                            <!-- Пользователь - Доступы - Нижняя панель - Тотал -->
                            <div class="shown">
                                {{ $t('message.users_bottom_show') }}
                                <span>{{ user.courses.length }}</span>
                                {{ $t('message.from') }}
                                <span>{{ user.total_courses }}</span>
                            </div>

                            <!-- Пользователь - Доступы - Нижняя панель - Переход на страницу -->
                            <div class="go_to">
                                {{ $t('message.pages') }}
                                <input type="text" class="input" v-model.trim="coursesCurrentPage" @input="coursesSendRequest = true">
                                {{ $t('message.from') }}
                                {{ coursesTotalPages }}
                            </div>

                            <!-- Пользователь - Доступы - Нижняя панель - Кнопки -->
                            <button class="prev" v-if="coursesCurrentPage > 1" @click.prevent="coursesPrevPage"></button>
                            <button class="next" v-if="coursesCurrentPage < coursesTotalPages" @click.prevent="coursesNextPage"></button>
                        </div>
                    </div>


                    <!-- Пользователь - Доступы - "Уроки" -->
                    <div class="tab_content" :class="{ active: activeTab == 'tab2' }" v-if="user.lessons && user.lessons.length">
                        <!-- Пользователь - Доступы - "Уроки" - Список -->
                        <div class="list">
                            <!-- Пользователь - Доступы - "Уроки" - Урок -->
                            <div class="item" v-for="(lesson, index) in user.lessons" :key="`${index}`">
                                <!-- Пользователь - Доступы - "Уроки" - Урок - Изображение -->
                                <div class="thumb">
                                    <img v-lazy="imagesUrl + lesson.image" alt="" class="lazyload">
                                </div>

                                <div class="info">
                                    <!-- Пользователь - Доступы - "Уроки" - Урок - Название -->
                                    <div class="name">
                                        {{ lesson.name }}
                                        <svg class="icon" v-if="!lesson.status"><use xlink:href="/images/sprite.svg#ic_access2"></use></svg>
                                    </div>

                                    <!-- Пользователь - Доступы - "Уроки" - Урок - Описание -->
                                    <div class="desc">{{ lesson.short_description }}</div>
                                </div>

                                <div class="status">
                                    <!-- Пользователь - Доступы - "Уроки" - Урок - Кнопка открытия доступа -->
                                    <button class="btn open_btn" v-if="!lesson.status" @click.prevent="changeAccess({ id: lesson.id, type: 'lesson', user_id: user.id, status: 1 })">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_access2"></use></svg>
                                        <span>{{ $t('message.btn_access_open') }}</span>
                                    </button>

                                    <!-- Пользователь - Доступы - "Уроки" - Урок - Кнопка закрытия доступа -->
                                    <button class="btn close_btn" v-else @click.prevent="changeAccess({ id: lesson.id, type: 'lesson', user_id: user.id, status: 0 })">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_access"></use></svg>
                                        <span>{{ $t('message.btn_access_close') }}</span>
                                    </button>

                                    <!-- Пользователь - Доступы - "Уроки" - Урок - Дата открытия доступа -->
                                    <div class="date" v-if="lesson.status">{{ $t('message.user_accesses_open_date') }}: {{ lesson.date }}</div>

                                    <!-- Пользователь - Доступы - "Уроки" - Урок - Дата закрытия доступа -->
                                    <div class="date" v-else>{{ $t('message.user_accesses_close_date') }}: {{ lesson.date }}</div>
                                </div>
                            </div>
                        </div>


                        <!-- Пользователь - Доступы - Нижняя панель -->
                        <div class="bottom">
                            <!-- Пользователь - Доступы - Нижняя панель - Тотал -->
                            <div class="shown">
                                {{ $t('message.users_bottom_show') }}
                                <span>{{ user.lessons.length }}</span>
                                {{ $t('message.from') }}
                                <span>{{ user.total_lessons }}</span>
                            </div>

                            <!-- Пользователь - Доступы - Нижняя панель - Переход на страницу -->
                            <div class="go_to">
                                {{ $t('message.pages') }}
                                <input type="text" class="input" v-model.trim="lessonsCurrentPage" @input="lessonsSendRequest = true">
                                {{ $t('message.from') }}
                                {{ lessonsTotalPages }}
                            </div>

                            <!-- Пользователь - Доступы - Нижняя панель - Кнопки -->
                            <button class="prev" v-if="lessonsCurrentPage > 1" @click.prevent="lessonsPrevPage"></button>
                            <button class="next" v-if="lessonsCurrentPage < lessonsTotalPages" @click.prevent="lessonsNextPage"></button>
                        </div>
                    </div>


                    <!-- Пользователь - Доступы - "Чаты" -->
                    <div class="tab_content" :class="{ active: activeTab == 'tab3' }" v-if="user.chats && user.chats.length">
                        <!-- Пользователь - Доступы - "Чаты" - Список -->
                        <div class="list">
                            <!-- Пользователь - Доступы - "Чаты" - Чат -->
                            <div class="item aligncenter" v-for="(chat, index) in user.chats" :key="`${index}`">
                                <!-- Пользователь - Доступы - "Чаты" - Чат - Изображение -->
                                <div class="photos">
                                    <!-- Пользователь - Доступы - "Чаты" - Чат - Изображение - Юзер 1 -->
                                    <div class="user1">
                                        <img v-lazy="imagesUrl + chat.user_1.avatar.avatar_mini" alt="" class="lazyload" v-if="chat.user_1.avatar">
                                        <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>
                                    </div>

                                    <!-- Пользователь - Доступы - "Чаты" - Чат - Изображение - Юзер 2 -->
                                    <div class="user2">
                                        <img v-lazy="imagesUrl + chat.user_2.avatar.avatar_mini" alt="" class="lazyload" v-if="chat.user_2.avatar">
                                        <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>
                                    </div>
                                </div>

                                <div class="between">
                                    <!-- Пользователь - Доступы - "Чаты" - Чат - Между -->
                                    <div>
                                        {{ $t('message.user_accesses_chat_between') }}
                                        {{ chat.user_1.name }} {{ chat.user_1.surname.charAt(0) }}.
                                        {{ $t('message.and') }}
                                        {{ chat.user_2.name }} {{ chat.user_2.surname.charAt(0) }}.

                                        <svg class="icon" v-if="!chat.status"><use xlink:href="/images/sprite.svg#ic_access2"></use></svg>
                                    </div>

                                    <!-- Пользователь - Доступы - "Чаты" - Чат - Дата открытия доступа -->
                                    <div class="date" v-if="chat.status">{{ $t('message.user_accesses_open_date') }}: {{ chat.date }}</div>

                                    <!-- Пользователь - Доступы - "Чаты" - Чат - Дата закрытия доступа -->
                                    <div class="date" v-else>{{ $t('message.user_accesses_close_date') }}: {{ chat.date }}</div>
                                </div>

                                <div class="actions">
                                    <!-- Пользователь - Доступы - "Чаты" - Чат - Кнопка открытия доступа -->
                                    <button class="btn open_btn" v-if="!chat.status" @click.prevent="changeAccess({ id: chat.id, type: 'chat', user_id: user.id, status: 1 })">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_access2"></use></svg>
                                        <span>{{ $t('message.btn_access_open') }}</span>
                                    </button>

                                    <!-- Пользователь - Доступы - "Чаты" - Чат - Кнопка закрытия доступа -->
                                    <button class="btn close_btn" v-else @click.prevent="changeAccess({ id: chat.id, type: 'chat', user_id: user.id, status: 0 })">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_access"></use></svg>
                                        <span>{{ $t('message.btn_access_close') }}</span>
                                    </button>

                                    <!-- Пользователь - Доступы - "Чаты" - Чат - Кнопка удаления -->
                                    <button class="btn delete_btn">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
                                    </button>
                                </div>
                            </div>
                        </div>


                        <!-- Пользователь - Доступы - Нижняя панель -->
                        <div class="bottom">
                            <!-- Пользователь - Доступы - Нижняя панель - Тотал -->
                            <div class="shown">
                                {{ $t('message.users_bottom_show') }}
                                <span>{{ user.chats.length }}</span>
                                {{ $t('message.from') }}
                                <span>{{ user.total_chats }}</span>
                            </div>

                            <!-- Пользователь - Доступы - Нижняя панель - Переход на страницу -->
                            <div class="go_to">
                                {{ $t('message.pages') }}
                                <input type="text" class="input" v-model.trim="chatsCurrentPage" @input="chatsSendRequest = true">
                                {{ $t('message.from') }}
                                {{ chatsTotalPages }}
                            </div>

                            <!-- Пользователь - Доступы - Нижняя панель - Кнопки -->
                            <button class="prev" v-if="chatsCurrentPage > 1" @click.prevent="chatsPrevPage"></button>
                            <button class="next" v-if="chatsCurrentPage < chatsTotalPages" @click.prevent="chatsNextPage"></button>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/user.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"

export default {
    name: 'AuthorUser',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_author_user')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
    },

    // Локальные данные
    data () {
        return {
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            preloader: false,
            chatsCurrentPage: 1,
            chatsTotalPages: 1,
            chatsSendRequest: false,
            coursesCurrentPage: 1,
            coursesTotalPages: 1,
            coursesSendRequest: false,
            lessonsCurrentPage: 1,
            lessonsTotalPages: 1,
            lessonsSendRequest: false,
            activeTab: 'tab1',
            user: {
                add_at: '01.03.2021',
                name: 'Демонстрационный',
                surname: 'пользователь',
                email: 'help@doctrine.im',
                phone: '+79112223344',
                total_lessons: 1,
                total_courses: 1,
                chats: [
                    {
                        id: 0,
                        status: true,
                        date: '01.03.2021',
                        user_1: {
                            id: 0,
                            name: 'Демонстрационный',
                            surname: 'Пользователь'
                        },
                        user_2: {
                            id: 0,
                            name: 'Андрей',
                            surname: 'Чмерёв',
                            avatar: {
                                avatar_full: '/public/images/testava.jpg',
                                avatar_mini: '/public/images/testava.jpg'
                            }
                        }
                    }
                ],
                total_chats: 1,
                lessons: [
                    {
                        id: 0,
                        name: 'Демонстрационный урок',
                        short_description: 'Этот урок показывается с целью демонстрации возможностей сервиса Doctrine.',
                        image: '/public/images/logo%20doc.jpg',
                        status: true,
                        date: '01.03.2021'
                    }
                ],
                courses: [
                    {
                        id: 0,
                        name: 'Демонстрационный курс',
                        short_description: 'Этот курс показывается с целью демонстрации возможностей сервиса Doctrine.',
                        image: '/public/images/logo%20doc.jpg',
                        status: true,
                        date: '01.03.2021'
                    }
                ]
            }
        }
    },

    beforeCreate () {
        // Загрузка данных пользователя
        if(this.$route.params.userId != 'demo'){
            this.$store.dispatch('authorUser/loadUser', this.$route.params.userId).then(() => {
                // Запись данных
                this.user = this.$store.state.authorUser.data

                // Всего страниц курсов
                this.coursesTotalPages = Math.ceil(this.$store.state.authorUser.data.total_courses / this.$store.state.authorUser.limit)

                // Всего страниц уроков
                this.lessonsTotalPages = Math.ceil(this.$store.state.authorUser.data.total_lessons / this.$store.state.authorUser.limit)

                // Всего страниц чатов
                this.chatsTotalPages = Math.ceil(this.$store.state.authorUser.data.total_chats / this.$store.state.authorUser.limit)

                // Определение активного таба
                this.activeTab = this.user.courses.length ? 'tab1' : this.user.lessons.length ? 'tab2' : 'tab3',

                // Прелоадер
                this.preloader = false
            })
        } else {
            setTimeout(() => {
                // Определение активного таба
                this.activeTab = this.user.courses.length ? 'tab1' : this.user.lessons.length ? 'tab2' : 'tab3',

                // Прелоадер
                this.preloader = false
            })
        }
    },

    methods: {
        // Переход на предыдущую страницу курсов
        coursesPrevPage () {
            this.coursesCurrentPage = this.coursesCurrentPage-1
            this.coursesSendRequest = true
        },

        // Переход на следующую страницу курсов
        coursesNextPage () {
            this.coursesCurrentPage++
            this.coursesSendRequest = true
        },


        // Переход на предыдущую страницу уроков
        lessonsPrevPage () {
            this.lessonsCurrentPage = this.lessonsCurrentPage-1
            this.lessonsSendRequest = true
        },

        // Переход на следующую страницу уроков
        lessonsNextPage () {
            this.lessonsCurrentPage++
            this.lessonsSendRequest = true
        },


        // Переход на предыдущую страницу чатов
        chatsPrevPage () {
            this.chatsCurrentPage = this.chatsCurrentPage-1
            this.chatsSendRequest = true
        },

        // Переход на следующую страницу чатов
        chatsNextPage () {
            this.chatsCurrentPage++
            this.chatsSendRequest = true
        },


        // Открытие/Закрытие доступа
        changeAccess ({ id, type, user_id, status }) {
            if(this.$route.params.userId != 'demo'){
                // Старт прогрессбара
                this.$Progress.start()

                // Подготовка данных к отправке
                let data = { id, type, user_id, status }

                // Запрос на сервер
                this.$store.dispatch('authorUser/changeAccess', data).then(res => {
                    // Финиш прогрессбара
                    this.$Progress.finish()

                    // Ошибка запроса на сервер
                    if(res.error) {
                        status
                            // Показ сообщения об ошибке
                            ? this.$toast.error(this.$t('message.notification_error_open_access'))

                            // Показ сообщения об ошибке
                            : this.$toast.error(this.$t('message.notification_error_close_access'))
                    }

                    // Успешный запрос на сервер
                    if(res.success) {
                        // Смена статуса в массиве
                        if(type === 'course') {
                            this.user.courses.find(с => с.id == id ).status = status
                            this.user.courses.find(с => с.id == id ).date = res.data.date
                        }

                        if(type === 'lesson') {
                            this.user.lessons.find(l => l.id == id ).status = status
                            this.user.lessons.find(l => l.id == id ).date = res.data.date
                        }

                        if(type === 'chat') {
                            this.user.chats.find(с => с.id == id ).status = status
                            this.user.chats.find(с => с.id == id ).date = res.data.date
                        }

                        status
                            // Показ сообщения об ошибке
                            ? this.$toast.success(this.$t('message.notification_success_open_access'))

                            // Показ сообщения об ошибке
                            : this.$toast.success(this.$t('message.notification_success_close_access'))
                    }
                })
            }
        }
    },

    watch: {
        // Смена страницы курсов
        'coursesSendRequest': function () {
            if(this.coursesSendRequest && this.$route.params.userId != 'demo'){
                // Запрос на сервер
                this.$store.dispatch('authorUser/loadCourses', {
                    userId: this.user.id,
                    offset: ((this.coursesCurrentPage-1)*this.$store.state.authorUser.limit)
                }).then(() => {
                    // Запись данных
                    this.user.courses = this.$store.state.authorUser.data.courses

                    // Всего страниц
                    this.coursesTotalPages = Math.ceil(this.$store.state.authorUser.data.total_courses / this.$store.state.authorUser.limit)

                    this.coursesSendRequest = false
                })
            }
        },

        // Смена страницы уроков
        'lessonsSendRequest': function () {
            if(this.lessonsSendRequest && this.$route.params.userId != 'demo'){
                // Запрос на сервер
                this.$store.dispatch('authorUser/loadLessons', {
                    userId: this.user.id,
                    offset: ((this.lessonsCurrentPage-1)*this.$store.state.authorUser.limit)
                }).then(() => {
                    // Запись данных
                    this.user.lessons = this.$store.state.authorUser.data.lessons

                    // Всего страниц
                    this.lessonsTotalPages = Math.ceil(this.$store.state.authorUser.data.total_lessons / this.$store.state.authorUser.limit)

                    this.lessonsSendRequest = false
                })
            }
        },

        // Смена страницы чатов
        'chatsSendRequest': function () {
            if(this.chatsSendRequest && this.$route.params.userId != 'demo'){
                // Запрос на сервер
                this.$store.dispatch('authorUser/loadChats', {
                    userId: this.user.id,
                    offset: ((this.chatsCurrentPage-1)*this.$store.state.authorUser.limit)
                }).then(() => {
                    // Запись данных
                    this.user.chats = this.$store.state.authorUser.data.chats

                    // Всего страниц
                    this.chatsTotalPages = Math.ceil(this.$store.state.authorUser.data.total_chats / this.$store.state.authorUser.limit)

                    this.chatsSendRequest = false
                })
            }
        }
    }
}
</script>