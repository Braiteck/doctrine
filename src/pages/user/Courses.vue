<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Курсы -->
        <section class="courses block">
            <!-- Курсы - Верхняя часть страницы -->
            <div class="block_head">
                <div class="title">
                    <!-- Курсы - Верхняя часть страницы - Иконка -->
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>

                    <!-- Курсы - Верхняя часть страницы - Заголовок -->
                    {{ $t('message.page_title_user_courses') }}

                    <!-- Курсы - Верхняя часть страницы - Тотал -->
                    <span>{{ $store.state.userCourses.total_courses }}</span>
                </div>
            </div>


            <!-- Сообщение если нет ниодного курса -->
            <div class="empty_message" v-if="$store.state.userCourses.total_courses == 0">
                <img v-lazy="'/images/ic_empty_message.svg'" alt="" class="lazyload">
                <div class="title">На этой странице появяться<br> доступные для тебя курсы</div>
            </div>


            <!-- Курсы - Список -->
            <div class="row" v-else>
                <!-- Курсы - Список - Курс -->
                <CourseItem v-for="(course, index) in courses" :key="`${index}`" :course="course" />
            </div>

            <!-- Курсы - Кнопка дозагрузки курсов -->
            <div class="load_more" v-if="$store.state.userCourses.loadStatus" @click.prevent="loadCourses">
                <div class="btn">{{ $t('message.btn_load_more') }}</div>
            </div>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/courses.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import CourseItem from "@/components/courses/CourseItem.vue"

export default {
    name: 'UserCourses',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_user_courses')
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
        this.$store.dispatch('userCourses/loadCourses').then(() => {
            // Запись данных
            this.courses = this.$store.state.userCourses.data

            // Прелоадер
            this.preloader = false
        })
    },

    methods: {
        // Дозагрузка курсов
        loadCourses() {
            // Старт прогрессбара
            this.$Progress.start()

            this.$store.dispatch('userCourses/loadCourses').then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Обновление списка
                this.courses = this.$store.state.userCourses.data
            })
        }
    }
}
</script>