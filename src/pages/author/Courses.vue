<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Курсы -->
        <section class="courses author_courses block">
            <!-- Курсы - Верхняя часть страницы -->
            <div class="block_head tablet_hide">
                <div class="title">
                    <!-- Курсы - Верхняя часть страницы - Иконка -->
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>

                    <!-- Курсы - Верхняя часть страницы - Заголовок -->
                    {{ $t('message.page_title_author_courses') }}

                    <!-- Курсы - Верхняя часть страницы - Тотал -->
                    <span>{{ $store.state.authorCourses.total_courses }}</span>
                </div>
            </div>


            <!-- Курсы - Моб. меню -->
            <div class="mob_menu">
                <carousel :navigationEnabled="false" :paginationEnabled="false">
                    <!-- Курсы - Моб. меню - Ссылка -->
                    <slide>
                        <router-link :to="`/${$store.state.user.data.route}/courses`" class="link">
                            <!-- Курсы - Моб. меню - Ссылка - Иконка -->
                            <svg class="icon"><use xlink:href="/images/menu.svg#ic_course"></use></svg>

                            <!-- Курсы - Моб. меню - Ссылка - Текст -->
                            <span>{{ $t('message.author_menu_courses') }}</span>
                        </router-link>
                    </slide>

                    <!-- Курсы - Моб. меню - Ссылка -->
                    <slide>
                        <router-link :to="`/${$store.state.user.data.route}/lessons`" class="link">
                            <!-- Курсы - Моб. меню - Ссылка - Иконка -->
                            <svg class="icon"><use xlink:href="/images/menu.svg#ic_lesson"></use></svg>

                            <!-- Курсы - Моб. меню - Ссылка - Текст -->
                            <span>{{ $t('message.author_menu_lessons') }}</span>
                        </router-link>
                    </slide>
                </carousel>
            </div>


            <!-- Сообщение если нет ниодного курса -->
            <div class="empty_message" v-if="$store.state.authorCourses.total_courses == 0">
                <img v-lazy="'/images/ic_empty_message.svg'" alt="" class="lazyload">

                <div class="title"  v-html="$t('message.empty_message_author_courses')"></div>
            </div>


            <!-- Курсы - Список -->
            <div class="row" v-else>
                <!-- Курсы - Список - Курс -->
                <CourseItem v-for="(course, index) in courses" :key="`${index}`" :course="course" />
            </div>

            <!-- Курсы - Кнопка дозагрузки курсов -->
            <div class="load_more" v-if="$store.state.authorCourses.loadStatus" @click.prevent="loadCourses">
                <div class="btn">{{ $t('message.btn_load_more') }}</div>
            </div>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/mobMenu.css'
import '@/assets/css/page/courses.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import CourseItem from "@/components/courses/CourseItem.vue"

export default {
    name: 'AuthorCourses',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_author_courses')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
        CourseItem // Шаблон курса
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            courses: []
        }
    },

    beforeCreate () {
        // Загрузка курсов
        this.$store.dispatch('authorCourses/loadCourses').then(() => {
            // Запись данных
            this.courses = this.$store.state.authorCourses.data

            // Прелоадер
            this.preloader = false
        })
    },

    methods: {
        // Дозагрузка курсов
        loadCourses() {
            // Старт прогрессбара
            this.$Progress.start()

            this.$store.dispatch('authorCourses/loadCourses').then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Обновление списка
                this.courses = this.$store.state.authorCourses.data
            })
        }
    }
}
</script>