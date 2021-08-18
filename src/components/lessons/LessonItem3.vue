<template>
    <!-- Урок -->
    <div class="lesson">
        <!-- Урок - Изображение -->
        <router-link :to="`/lesson/${lesson.author.slug}/${lesson.slug}`" class="thumb">
            <img v-lazy="imagesUrl + lesson.image" alt="" class="lazyload">
        </router-link>


        <div class="info">
            <!-- Урок - Название -->
            <div class="name">
                <span>{{ lesson.name }}</span>

                <!-- Урок - Название - Кнопка копирования -->
                <button type="button" class="copy_btn"
                    v-clipboard:copy="`${appUrl}/lesson/${lesson.author.slug}/${lesson.slug}`"
                    v-clipboard:success="onCopy">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_copy"></use></svg>
                </button>
            </div>

            <!-- Урок - Категория -->
            <div class="cat">{{ lesson.category.name }}</div>

            <!-- Урок - Кол-во пользователей -->
            <div class="peoples">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_people"></use></svg>
                <span>{{ lesson.users_count }}</span>
            </div>

            <!-- Урок - Кол-во материалов -->
            <div class="materials" v-if="lesson.files_count">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_materials"></use></svg>
                <span>{{ $tc('message.course_components_materials_count', lesson.files_count) }}</span>
            </div>
        </div>


        <div class="btns">
            <!-- Урок - Кнопка редактирования -->
            <button class="edit_link" @click.prevent="$root.$emit('openCreateLessonModalEvent', lesson.id)">
                {{ $t('message.btn_edit') }}
            </button>
        </div>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/lessonItem.css'

export default {
    name: 'LessonItem',

    // Данные из вне
    props: ['lesson'],

    // Локальные данные
    data () {
        return {
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            appUrl: process.env.VUE_APP_ACCOUNT_SITE_URL
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