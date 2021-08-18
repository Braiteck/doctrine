<template>
    <!-- Урок -->
    <div class="lesson">
        <!-- Урок - Изображение -->
        <div class="thumb">
            <img v-lazy="imagesUrl + lesson.image" alt="" class="lazyload">
        </div>


        <!-- Урок - Очерёдность -->
        <div class="order">
            <button type="button" class="up_btn" @click.prevent="lessonMoveUp(lesson.position)"></button>
            <button type="button" class="down_btn" @click.prevent="lessonMoveDown(lesson.position)"></button>
        </div>


        <div class="info">
            <!-- Урок - Название -->
            <div class="name">
                <span>{{ lesson.name }}</span>

                <!-- Урок - Кнопка редактирования -->
                <button class="edit_btn" @click.prevent="$root.$emit('openCreateLessonModalEvent', lesson.slug)">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_edit"></use></svg>
                </button>

                <!-- Урок - Кнопка удаления -->
                <button class="del_btn" @click.prevent="deleteLesson">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
                </button>
            </div>

            <!-- Урок - Описание -->
            <div class="desc">{{ lesson.short_description }}</div>

            <!-- Урок - Кол-во материалов -->
            <div class="materials" v-if="lesson.files_count">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_materials"></use></svg>
                <span>{{ $tc('message.course_components_materials_count', lesson.files_count) }}</span>
            </div>


            <div class="mob_btns">
                <!-- Урок - Кнопка редактирования -->
                <button class="edit_btn" @click.prevent="$root.$emit('openCreateLessonModalEvent', lesson.slug)">
                    {{ $t('message.btn_edit') }}
                </button>

                <!-- Урок - Кнопка удаления -->
                <button class="del_btn" @click.prevent="deleteLesson">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
                </button>
            </div>
        </div>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/lessonItem.css'

export default {
    name: 'LessonItem',

    // Данные из вне
    props: ['lesson', 'lessonIndex', 'moduleIndex'],

    // Локальные данные
    data () {
        return {
            imagesUrl: process.env.VUE_APP_IMAGES_URL
        }
    },

    methods: {
        // Копирование url урока
        onCopy () {
            // Показ сообщения об успешном копировании
            this.$toast.success(this.$t('message.notification_success_link_copy'))
        },


        // Удаление урока
        deleteLesson() {
            this.$root.$emit('openDeleteLessonModal', this.moduleIndex, this.lessonIndex)
        },


        // Перемещение урока наверх
        lessonMoveUp (lessonPosition) {
            this.$root.$emit('lessonMoveUpEvent', this.moduleIndex, lessonPosition)
        },

        // Перемещение урока вниз
        lessonMoveDown (lessonPosition) {
            this.$root.$emit('lessonMoveDownEvent', this.moduleIndex, lessonPosition)
        }
    }
}
</script>