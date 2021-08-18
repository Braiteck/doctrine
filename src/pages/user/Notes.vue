<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Заметки -->
        <section class="notes user_notes block">
            <!-- Заметки - Верхняя часть страницы -->
            <div class="block_head">
                <div class="title">
                    <!-- Заметки - Верхняя часть страницы - Иконка -->
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_note"></use></svg>

                    <!-- Заметки - Верхняя часть страницы - Заголовок -->
                    {{ $t('message.page_title_notes') }}

                    <!-- Заметки - Верхняя часть страницы - Тотал -->
                    <span>{{ $store.state.userNotes.total_notes_all }}</span>
                </div>
            </div>


            <!-- Сообщение если нет ниодной заметки -->
            <div class="empty_message" v-if="$store.state.userNotes.total_notes_all == 0">
                <img v-lazy="'/images/ic_empty_message.svg'" alt="" class="lazyload">

                <div class="title" v-html="$t('message.empty_message_notes')"></div>
            </div>


            <div class="row desktop_row" v-else>
                <!-- Заметки - Уроки -->
                <div class="tabs">
                    <!-- Заметки - Уроки - Урок -->
                    <NotesLessonItem v-for="(lesson, index) in lessons" :key="`${index}`" :lesson="lesson" :index="index"
                        :class="{ active: activeTab == `tab${index}` }" @change-tab="changeTab" />

                    <!-- Заметки - Уроки - Кнопка подгрузки уроков -->
                    <div class="load_more" v-if="$store.state.userNotes.loadStatus" @click.prevent="loadLessons">
                        <div class="btn">{{ $t('message.btn_load_more') }}</div>
                    </div>
                </div>


                <!-- Заметки - Список -->
                <div class="tab_content" v-for="(lesson, index) in lessons" :key="`${index}`"
                    :class="{ active: activeTab == `tab${index}` }">
                    <div class="list">
                        <!-- Заметки - Список - Заметка -->
                        <NoteItem v-for="(note, index) in lesson.notes" :key="`${index}`" :note="note" :lessonSlug="lesson.slug" />
                    </div>

                    <!-- Заметки - Кнопка подгрузки заметок -->
                    <div class="load_more" v-if="lesson.loadStatus" @click.prevent="loadLessonNotes(lesson.slug)">
                        <div class="btn">{{ $t('message.btn_load_more') }}</div>
                    </div>
                </div>
            </div>


            <!-- Заметки - Моб. Уроки -->
            <div class="mob_row row">
                <!-- Заметки - Моб. Уроки - уроко -->
                <MobNotesLessonItem v-for="(lesson, index) in lessons" :key="`${index}`" :lesson="lesson" :index="index" />
            </div>

            <!-- Заметки - Моб. Уроки - Кнопка подгрузки уроков -->
            <div class="load_more mob_load_more" v-if="$store.state.userNotes.loadStatus" @click.prevent="loadLessons">
                <div class="btn">{{ $t('message.btn_load_more') }}</div>
            </div>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/userNotes.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import NotesLessonItem from "@/components/notes/NotesLessonItem.vue"
import NoteItem from "@/components/notes/NoteItem.vue"
import MobNotesLessonItem from "@/components/notes/MobNotesLessonItem.vue"

export default {
    name: 'UserNotes',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_notes')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
        NotesLessonItem, // Шаблон урока
        NoteItem, // Шаблон заметки
        MobNotesLessonItem // Шаблон моб. урока
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            activeTab: 'tab0',
            lessons: []
        }
    },

    beforeCreate () {
        // Загрузка уроков и заметок
        this.$store.dispatch('userNotes/loadLessons').then(() => {
            // Запись данных
            this.lessons = this.$store.state.userNotes.data

            // Прелоадер
            this.preloader = false
        })
    },

    methods: {
        // Переключение таба
        changeTab(newTab){
            this.activeTab = newTab
        },


        // Дозагрузка уроков
        loadLessons() {
            // Старт прогрессбара
            this.$Progress.start()

            this.$store.dispatch('userNotes/loadLessons').then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Обновление списка
                this.lessons = this.$store.state.userNotes.data
            })
        },


        // Дозагрузка заметок для урока
        loadLessonNotes(lessonSlug) {
            // Старт прогрессбара
            this.$Progress.start()

            this.$store.dispatch('userNotes/loadLessonNotes', lessonSlug).then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()
            })
        }
    }
}
</script>