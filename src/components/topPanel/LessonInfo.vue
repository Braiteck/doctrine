<template>
    <!-- Урок -->
    <div class="lesson" v-if="lesson.name">
        <!-- Урок - Кнопка "Назад" -->
        <div class="back_link">
            <router-link :to="`/course/${lesson.author.slug}/${lesson.courseSlug}`" v-if="lesson.courseSlug">
                <!-- Урок - Кнопка "Назад" - Иконка -->
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_back"></use></svg>

                <!-- Урок - Кнопка "Назад" - Текст -->
                <span>{{ $t('message.btn_lesson_back') }}</span>
            </router-link>

            <router-link :to="`/${$store.state.user.data.route}/lessons`" v-else>
                <!-- Урок - Кнопка "Назад" - Иконка -->
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_back"></use></svg>

                <!-- Урок - Кнопка "Назад" - Текст -->
                <span>{{ $t('message.btn_lesson_back') }}</span>
            </router-link>
        </div>

        <div class="row">
            <!-- Урок - Название -->
            <div class="name">
                <span>{{ lesson.name }}</span>
            </div>
        </div>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/topPanel/LessonInfo.css'

export default {
    name: 'HeaderLessonInfo',

    // Данные из вне
    props: ['lesson']
}
</script>