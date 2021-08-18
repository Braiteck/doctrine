<template>
    <!-- Курс -->
    <div class="course">
        <!-- Курс - Изображение -->
        <div class="thumb">
            <!-- Курс - Категория -->
            <div class="cat" :class="course.category.color">{{ course.category.name }}</div>

            <!-- Курс - Кол-во пользователей -->
            <div class="students" v-if="course.hasOwnProperty('users_count')">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_people"></use></svg>
                <span>{{ course.users_count }}</span>
            </div>

            <img v-lazy="imagesUrl + course.image" alt="" class="lazyload">

            <!-- Курс - Автор -->
            <div class="author" v-if="course.author">
                <!-- Курс - Автор - Аватар -->
                <div class="photo">
                    <img v-lazy="imagesUrl + course.author.avatar.avatar_mini" alt="" class="lazyload" v-if="course.author.avatar">
                    <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>
                </div>

                <!-- Курс - Автор - Имя, Фамилия -->
                <span>{{ course.author.name }} {{ course.author.surname }}</span>
            </div>
        </div>


        <div class="info">
            <!-- Курс - Название -->
            <div class="name">
                {{ course.name }}

                <!-- Курс - Название - Кнопка копирования -->
                <button type="button" class="copy_btn"
                    v-clipboard:copy="`${appDomain}/course/${course.author.slug}/${course.slug}`"
                    v-clipboard:success="onCopy">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_copy"></use></svg>
                </button>
            </div>

            <!-- Курс - Кол-во модулей -->
            <div class="modules" v-if="$store.state.user.data.route == 'user' && course.hasOwnProperty('modules_count')">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>
                <span>{{ $tc('message.course_components_modules_count', course.modules_count) }}</span>
            </div>

            <!-- Курс - Кол-во уроков -->
            <div class="lessons" v-if="$store.state.user.data.route == 'user' && course.hasOwnProperty('lessons_count')">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_lesson"></use></svg>
                <span>{{ $tc('message.course_components_lessons_count', course.lessons_count) }}</span>
            </div>

            <!-- Курс - Продолжительность -->
            <div class="duration" v-if="$store.state.user.data.route == 'user' && course.hasOwnProperty('lessons_duration')">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_time"></use></svg>
                <span>{{ course.lessons_duration }} {{ $t('message.time_minutes') }}</span>
            </div>

            <!-- Курс - Кол-во модулей, уроков, материалов -->
            <div class="stats" v-if="$store.state.user.data.route == 'author' && (course.modules_count || course.lessons_count || course.files_count)">
                <span v-if="course.modules_count">{{ $tc('message.course_components_modules_count', course.modules_count) }}</span>
                <span v-if="course.lessons_count">{{ $tc('message.course_components_lessons_count', course.lessons_count) }}</span>
                <span v-if="course.files_count">{{ $tc('message.course_components_materials_count', course.files_count) }}</span>

                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>
            </div>

            <!-- Курс - Описание -->
            <div class="desc" v-if="course.short_description">
                {{ course.short_description }}
            </div>

            <!-- Курс - Кнопка просмотра -->
            <router-link :to="`/course/${course.author.slug}/${course.slug}`" class="view_link" v-if="$store.state.user.data.route == 'user'">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_video_play2"></use></svg>
                <span>{{ $t('message.btn_go_to_view') }}</span>
            </router-link>

            <!-- Курс - Кнопка редактирования -->
            <router-link :to="`/course/${course.author.slug}/${course.id}/edit`" class="edit_link" v-if="$store.state.user.data.route == 'author'">
                <span>{{ $t('message.btn_edit') }}</span>
            </router-link>
        </div>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/courseItem.css'

export default {
    name: 'CourseItem',

    // Данные из вне
    props: ['course'],

    // Локальные данные
    data () {
        return {
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            appDomain: process.env.VUE_APP_ACCOUNT_SITE_URL
        }
    },

    methods: {
        // Копирование url курса
        onCopy () {
            // Показ сообщения об успешном копировании
            this.$toast.success(this.$t('message.notification_success_link_copy'))
        }
    }
}
</script>