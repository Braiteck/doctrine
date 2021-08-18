<template>
    <!-- Заметка -->
    <div class="note">
        <!-- Заметка - Название -->
        <div class="name">{{ note.name }}</div>

        <!-- Заметка - Описание -->
        <div class="desc" v-if="note.description">{{ note.description }}</div>

        <!-- Заметка - Кнопка удаления -->
        <button class="del_btn" @click.prevent="deleteNote(lessonSlug, note.id)">
            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
        </button>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/notes/noteItem.css'

export default {
    name: 'NoteItem',

    // Данные из вне
    props: ['note', 'lessonSlug'],

    methods: {
        // Удаление заметки
        deleteNote(lessonSlug, noteID) {
            // Старт прогрессбара
            this.$Progress.start()

            // Вызов метода удаления
            this.$store.dispatch('userNotes/deleteNote', { lessonSlug, noteID }).then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()
            })

            // Вызов метода удаления
            this.$store.dispatch('lessonInfo/deleteNote', noteID).then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()
            })
        }
    }
}
</script>