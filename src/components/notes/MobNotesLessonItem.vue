<template>
    <!-- Урок -->
    <div class="lesson">
        <!-- Урок - Изображение -->
        <div class="thumb">
            <img v-lazy="imagesUrl + lesson.image" alt="" class="lazyload" v-if="lesson.image">
        </div>

        <div class="info">
            <!-- Урок - Названия -->
            <div class="name">
                <span>{{ index+1 }}. {{ lesson.name }}</span>
            </div>

            <!-- Урок - Категория -->
            <div class="cat">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>
                <span>{{ lesson.category_name }}</span>
            </div>

            <!-- Урок - Ссылка -->
            <router-link :to="`/user/notes/lesson/${lesson.slug}`" class="details">
                {{ $t('message.btn_notes_lesson_details') }}
            </router-link>
        </div>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/notes/mobNotesLessonItem.css'

export default {
    name: 'MobNotesLessonItem',

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