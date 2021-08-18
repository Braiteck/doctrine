<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Уроки -->
        <section class="lessons block">
            <!-- Уроки - Верхняя часть страницы -->
            <div class="block_head">
                <div class="title">
                    <!-- Уроки - Верхняя часть страницы - Иконка -->
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_lesson"></use></svg>

                    <!-- Уроки - Верхняя часть страницы - Заголовок -->
                    {{ $t('message.page_title_user_lessons') }}

                    <!-- Уроки - Верхняя часть страницы - Тотал -->
                    <span>{{ $store.state.userLessons.total_lessons }}</span>
                </div>
            </div>


            <!-- Сообщение если нет ниодного урока -->
            <div class="empty_message" v-if="$store.state.userLessons.total_lessons == 0">
                <img v-lazy="'/images/ic_empty_message.svg'" alt="" class="lazyload">
                <div class="title">На этой странице появяться<br> доступные для тебя уроки</div>
            </div>


            <!-- Уроки - Список -->
            <div class="list" v-else>
                <!-- Уроки - Список - Урок -->
                <LessonItem v-for="(lesson, index) in lessons" :key="`${index}`" :lesson="lesson" />
            </div>

            <!-- Уроки - Кнопка дозагрузки уроков -->
            <div class="load_more" v-if="$store.state.userLessons.loadStatus" @click.prevent="loadLessons">
                <div class="btn">{{ $t('message.btn_load_more') }}</div>
            </div>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/lessons.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import LessonItem from "@/components/lessons/LessonItem.vue"

export default {
    name: 'UserLessons',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_user_lessons')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
        LessonItem // Шаблон урока
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            lessons: []
        }
    },

    beforeCreate () {
        // Загрузка уроков
        this.$store.dispatch('userLessons/loadLessons').then(() => {
            // Запись данных
            this.lessons = this.$store.state.userLessons.data

            // Прелоадер
            this.preloader = false
        })
    },

    methods: {
        // Дозагрузка уроков
        loadLessons() {
            // Старт прогрессбара
            this.$Progress.start()

            this.$store.dispatch('userLessons/loadLessons').then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Обновление списка
                this.lessons = this.$store.state.userLessons.data
            })
        }
    }
}
</script>