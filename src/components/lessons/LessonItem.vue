<template>
    <!-- Урок -->
    <div class="lesson">
        <!-- Урок - Изображение -->
        <div class="thumb">
            <img v-lazy="imagesUrl + lesson.image" alt="" class="lazyload">
        </div>


        <div class="info">
            <!-- Урок - Название -->
            <div class="name">
                <span>{{ lesson.name }}</span>

                <!-- Урок - Название - Кнопка копирования -->
                <button type="button" class="copy_btn"
                    v-clipboard:copy="`${appDomain}/lesson/${lesson.author.slug}/${lesson.slug}`"
                    v-clipboard:success="onCopy">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_copy"></use></svg>
                </button>
            </div>

            <!-- Урок - Автор -->
            <div class="author" v-if="lesson.author">
                <!-- Урок - Автор - Аватар -->
                <div class="photo">
                    <img v-lazy="imagesUrl + lesson.author.avatar.avatar_mini" alt="" class="lazyload" v-if="lesson.author.avatar">
                    <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>
                </div>

                <!-- Урок - Автор - Имя, Фамилия -->
                <span>{{ lesson.author.name }} {{ lesson.author.surname }}</span>
            </div>

            <!-- Урок - Категория, Курс -->
            <div class="course" v-if="lesson.category_name">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>
                <span>{{ lesson.category_name }}</span>
            </div>

            <!-- Урок - Кол-во материалов -->
            <div class="materials" v-if="lesson.files_count">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_materials"></use></svg>
                <span>{{ $tc('message.course_components_materials_count', lesson.files_count) }}</span>
            </div>

            <!-- Урок - Продолжительность -->
            <div class="duration" v-if="lesson.video_duration">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_time"></use></svg>
                <span>{{ lesson.video_duration }} {{ $t('message.time_minutes') }}</span>
            </div>

            <!-- Урок - Описание -->
            <div class="desc">{{ lesson.short_description }}</div>
        </div>


        <div class="btns">
            <!-- Урок - Кнопка просмотра -->
            <router-link :to="`/lesson/${lesson.author.slug}/${courseSlug}/${lesson.slug}`" class="view_link" v-if="lesson.author">
                {{ $t('message.btn_go_to_view') }}
            </router-link>

            <!-- Урок - Кнопка просмотра -->
            <router-link :to="`/lesson/${lessonAuthor.slug}/${lesson.slug}`" class="view_link" v-else>
                {{ $t('message.btn_go_to_view') }}
            </router-link>
        </div>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/lessonItem.css'

export default {
    name: 'LessonItem',

    // Данные из вне
    props: ['lesson', 'lessonAuthor', 'courseSlug'],

    // Локальные данные
    data () {
        return {
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            appDomain: process.env.VUE_APP_ACCOUNT_SITE_URL
        }
    },

    methods: {
        // Копирование url урока
        onCopy () {
            // Показ сообщения об успешном копировании
            this.$toast.success(this.$t('message.notification_success_link_copy'))
        }
    }
}
</script>