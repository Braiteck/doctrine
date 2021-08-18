<template>
<!-- Прелоадер -->
    <Preloader v-if="preloader" />

   <section class="page_data" v-else>
        <!-- Нет доступа к курсу -->
        <AccessDenied v-if="accessDenied" />

        <!-- Курс -->
        <section class="course_info block" v-else>
            <!-- Курс - Верхняя часть страницы -->
            <div class="block_head">
                <!-- Курс - Кнопка "назад" -->
                <div class="back_link">
                    <router-link :to="`/${$store.state.user.data.route}/courses`">
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_back"></use></svg>
                        <span>{{ $t('message.user_menu_courses') }}</span>
                    </router-link>
                </div>
            </div>


            <!-- Курс - Информация -->
            <div class="head_info">
                <div class="info">
                    <!-- Курс - Информация - Название -->
                    <div class="name">{{ course.name }}</div>

                    <!-- Курс - Информация - Автор -->
                    <div class="author" v-if="course.author">{{ course.author.name }} {{ course.author.surname }}</div>
                </div>

                <div class="sep"></div>

                <!-- Курс - Информация - Продолжительность -->
                <div class="modules">
                    <div class="name">{{ $t('message.course_components_duration') }}</div>

                    <div class="val">
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_time"></use></svg>
                        <span>{{ course.lessons_duration }} {{ $t('message.time_minutes') }}</span>
                    </div>
                </div>

                <!-- Курс - Информация - Кол-во модулей -->
                <div class="modules">
                    <div class="name">{{ $t('message.course_components_modules') }}</div>

                    <div class="val">
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>
                        <span>{{ course.modules_count }}</span>
                    </div>
                </div>

                <!-- Курс - Информация - Кол-во уроков -->
                <div class="lessons">
                    <div class="name">{{ $t('message.course_components_lessons') }}</div>

                    <div class="val">
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_lesson"></use></svg>
                        <span>{{ course.lessons_count_all }}</span>
                    </div>
                </div>

                <!-- Курс - Информация - Кол-во материалов -->
                <div class="materials">
                    <div class="name">{{ $t('message.course_components_materials') }}</div>

                    <div class="val">
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_materials"></use></svg>
                        <span>{{ course.files_count_all }}</span>
                    </div>
                </div>
            </div>


            <!-- Курс - Модули -->
            <div class="modules" v-if="course.modules_count">
                <!-- Курс - Модули - Заголовок -->
                <div class="block_title">
                    {{ $tc('message.course_components_modules_count', course.modules_count) }}
                </div>

                <div class="accordion">
                    <!-- Курс - Модули - Модуль -->
                    <div class="item" v-for="(module, index) in course.modules" :key="`${index}`">
                        <div class="head" v-toggle>
                            <div class="info">
                                <!-- Курс - Модули - Модуль - Название -->
                                <div class="title">{{ module.name }}</div>

                                 <!-- Курс - Модули - Модуль - Кол-во уроков -->
                                <div class="lessons_count">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_lesson"></use></svg>
                                    <span>{{ $tc('message.course_components_lessons_count', module.lessons_count) }}</span>
                                </div>
                            </div>

                             <!-- Курс - Модули - Модуль - стрелка -->
                            <div class="arr"></div>
                        </div>

                        <div class="data lessons">
                            <!-- Курс - Модули - Модуль - Уроки -->
                            <div class="list">
                                <!-- Курс - Модули - Модуль - Урок -->
                                <LessonItem v-for="(lesson, index) in module.lessons" :key="`${index}`" :lesson="lesson" :lessonAuthor="course.author" :courseSlug="$route.params.courseSlug" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/error.css'
import '@/assets/css/page/courseInfo.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import AccessDenied from "@/components/AccessDenied.vue"
import LessonItem from "@/components/lessons/LessonItem.vue"

export default {
    name: 'CourseInfo',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.course.name
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
        AccessDenied, // Нет доступа к курсу
        LessonItem // Шаблон урока
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            accessDenied: false,
            course: {}
        }
    },

    beforeCreate () {
        // Загрузка данных о курсе
        this.$store.dispatch('courseInfo/loadCourseInfo', this.$route.params.courseSlug).then(res => {
            // Прелоадер
            this.preloader = false

            if(res.error){
                // Нет доступа к уроку
                this.accessDenied = true
            } else {
                // Запись данных
                this.course = this.$store.state.courseInfo.data
            }
        })
    }
}
</script>