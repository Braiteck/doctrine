<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Заметки -->
        <section class="notes mob_notes block">
            <!-- Заметки _ кнопка "назад" -->
            <div class="back_link">
                <router-link :to="`/${$store.state.user.data.route}/notes`">
                    <div class="icon"></div>
                    <span>{{ lesson.name }}</span>
                </router-link>
            </div>


            <!-- Сообщение если нет ниодной заметки -->
            <div class="empty_message" v-if="lesson.notes.length == 0">
                <img v-lazy="'/images/ic_empty_message.svg'" alt="" class="lazyload">
                <div class="title" v-html="$t('message.empty_message_notes_lesson')"></div>
            </div>


            <!-- Заметки - Список -->
            <div class="list" v-else>
                <!-- Заметки - Список - Заметка -->
                <NoteItem v-for="(note, index) in lesson.notes" :key="`${index}`" :note="note" :lessonSlug="lesson.slug" />

                <!-- Заметки - Кнопка подгрузки заметок -->
                <div class="load_more" v-if="lesson.loadStatus" @click.prevent="loadLesson(lesson.slug)">
                    <div class="btn">{{ $t('message.btn_load_more') }}</div>
                </div>
            </div>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/userNotes.css'
import '@/assets/css/page/mobUserNotes.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import NoteItem from "@/components/notes/NoteItem.vue"

export default {
    name: 'UserNotesLesson',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_notes')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
        NoteItem // Шаблон заметки
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            lesson: []
        }
    },

    beforeCreate () {
        // Загрузка заметок для урока
        this.$store.dispatch('userNotes/loadLesson', this.$route.params.slug).then(() => {
            // Запись данных
            this.lesson = this.$store.state.userNotes.lesson

            // Прелоадер
            this.preloader = false
        })
    },

    methods: {
        // Дозагрузка заметок для урока
        loadLesson(lessonSlug) {
            // Старт прогрессбара
            this.$Progress.start()

            this.$store.dispatch('userNotes/loadLesson', lessonSlug).then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()
            })
        }
    }
}
</script>