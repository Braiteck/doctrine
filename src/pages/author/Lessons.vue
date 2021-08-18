<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Уроки -->
        <section class="lessons author_lessons block">
            <!-- Уроки - Моб. меню -->
            <div class="mob_menu">
                <carousel :navigationEnabled="false" :paginationEnabled="false">
                    <!-- Уроки - Моб. меню - Ссылка -->
                    <slide>
                        <router-link :to="`/${$store.state.user.data.route}/courses`" class="link">
                            <!-- Уроки - Моб. меню - Ссылка - Иконка -->
                            <svg class="icon"><use xlink:href="/images/menu.svg#ic_course"></use></svg>

                            <!-- Уроки - Моб. меню - Ссылка - Текст -->
                            <span>{{ $t('message.author_menu_courses') }}</span>
                        </router-link>
                    </slide>

                    <!-- Уроки - Моб. меню - Ссылка -->
                    <slide>
                        <router-link :to="`/${$store.state.user.data.route}/lessons`" class="link">
                            <!-- Уроки - Моб. меню - Ссылка - Иконка -->
                            <svg class="icon"><use xlink:href="/images/menu.svg#ic_lesson"></use></svg>

                            <!-- Уроки - Моб. меню - Ссылка - Текст -->
                            <span>{{ $t('message.author_menu_lessons') }}</span>
                        </router-link>
                    </slide>
                </carousel>
            </div>


            <!-- Уроки - Верхняя часть страницы -->
            <div class="block_head">
                <div class="title tablet_hide">
                    <!-- Уроки - Верхняя часть страницы - Иконка -->
                    <svg class="icon"> <use xlink:href="/images/sprite.svg#ic_lesson"></use></svg>

                    <!-- Уроки - Верхняя часть страницы - Заголовок -->
                    {{ $t('message.page_title_author_lessons') }}

                    <!-- Уроки - Верхняя часть страницы - Тотал -->
                    <span>{{ $store.state.authorLessons.total_lessons }}</span>
                </div>

                <!-- Уроки - Поиск -->
                <Search />
            </div>


            <!-- Сообщение если нет ниодного урока -->
            <div class="empty_message" v-if="$store.state.authorLessons.total_lessons == 0">
                <img v-lazy="'/images/ic_empty_message.svg'" alt="" class="lazyload">

                <div class="title" v-html="$t('message.empty_message_author_lessons')" v-if="!searchQuery.length"></div>
                <div class="title" v-html="$t('message.empty_message_author_lessons_search')" v-else></div>
            </div>


            <!-- Уроки - Список -->
            <div class="list" v-else>
                <!-- Уроки - Список - Урок -->
                <LessonItem v-for="(lesson, index) in lessons" :key="`${index}`" :lesson="lesson" :lesson_author="$store.state.user.data.slug" />
            </div>

            <!-- Уроки - Кнопка дозагрузки уроков -->
            <div class="load_more" v-if="$store.state.authorLessons.loadStatus" @click.prevent="loadLessons">
                <div class="btn">{{ $t('message.btn_load_more') }}</div>
            </div>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/mobMenu.css'
import '@/assets/css/page/lessons.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import LessonItem from "@/components/lessons/LessonItem3.vue"
import Search from "@/components/Search.vue"

export default {
    name: 'AuthorLessons',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_author_lessons')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
        LessonItem, // Шаблон урока
        Search, // Поиск
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            searchQuery: '',
            lessons: []
        }
    },

    beforeCreate () {
        // Загрузка уроков
        this.$store.dispatch('authorLessons/loadLessons').then(() => {
            // Запись данных
            this.lessons = this.$store.state.authorLessons.data

            // Прелоадер
            this.preloader = false
        })
    },

    mounted () {
        // Обновление списка уроков
        this.$root.$on('updateAuthorLessonsEvent', () => {
            // Загрузка уроков
            this.$store.state.authorLessons.data = []

            this.$store.dispatch('authorLessons/loadLessons', {
                limit: this.lessons.length > this.$store.state.authorLessons.limit ? this.lessons.length : this.$store.state.authorLessons.limit,
                offset: 0
            }).then(() => {
                // Запись данных
                this.lessons = this.$store.state.authorLessons.data
            })
        })


        // Поиск уроков
        this.$root.$on('searchSubmitEvent', searchQuery => {
            this.searchQuery = searchQuery

            // Загрузка уроков
            this.$store.state.authorLessons.data = []

            this.$store.dispatch('authorLessons/loadLessons', {
                limit: this.lessons.length ? this.lessons.length : this.$store.state.authorLessons.limit,
                offset: 0,
                search: searchQuery
            }).then(() => {
                // Запись данных
                this.lessons = this.$store.state.authorLessons.data
            })
        })
    },

    methods: {
        // Дозагрузка уроков
        loadLessons() {
            // Старт прогрессбара
            this.$Progress.start()

            this.$store.dispatch('authorLessons/loadLessons').then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Обновление списка
                this.lessons = this.$store.state.authorLessons.data
            })
        }
    }
}
</script>