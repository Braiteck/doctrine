<template>
    <!-- Урок -->
    <button class="lesson" @click.prevent="$emit('change-tab', `tab${index}`)">
        <!-- Урок - Изображение -->
        <div class="thumb">
            <img v-lazy="imagesUrl + lesson.image" alt="" class="lazyload" v-if="lesson.image">
        </div>

        <div class="info">
            <!-- Урок - Название -->
            <div class="name">
                <span>{{ index + 1 }}. {{ lesson.name }}</span>
            </div>

            <!-- Урок - Ктагория -->
            <div class="cat">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>
                <span>{{ lesson.category_name }}</span>
            </div>
        </div>
    </button>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/notes/notesLessonItem.css'

export default {
    name: 'NotesLessonItem',

    // Данные из вне
    props: ['lesson', 'index'],

    // Локальные данные
    data () {
        return {
            imagesUrl: process.env.VUE_APP_IMAGES_URL
        }
    }
}
</script>