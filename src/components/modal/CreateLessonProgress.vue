<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal" id="progress_modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal" v-if="completedStatus"></button>


                <!-- Вспдыв. окно - Процесс загрузки -->
                <transition name="fade" mode="out-in">
                <div class="before" key="1" v-if="!completedStatus">
                    <!-- Вспдыв. окно - Процесс загрузки - Иконка -->
                    <div class="icon">
                        <img src="/images/ic_create_progress.svg" alt="">
                    </div>

                    <!-- Вспдыв. окно - Процесс загрузки - Текст -->
                    <div class="text">
                        {{ $t('message.modal_progress_before') }}
                    </div>

                    <!-- Вспдыв. окно - Процесс загрузки - Прогресс -->
                    <div class="progress">
                        <div class="bar" :style="`width: ${percents}%;`"></div>
                    </div>
                </div>


                <!-- Вспдыв. окно - Успешная загрузка -->
                <div class="after" key="2" v-else>
                    <!-- Вспдыв. окно - Успешная загрузка - Иконка -->
                    <div class="icon">
                        <img src="/images/ic_create_progress_a.svg" alt="">
                    </div>

                    <!-- Вспдыв. окно - Успешная загрузка - Текст -->
                    <div class="text">
                        {{ $t('message.modal_progress_after') }}
                    </div>

                    <!-- Вспдыв. окно - Успешная загрузка - Кнопка закрытия -->
                    <button class="close_btn" @click.prevent="closeModal">
                        {{ $t('message.btn_close_modal') }}
                    </button>
                </div>
                </transition>
            </section>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/modal/createLessonProgress.css'

// Импорт vuex
import { mapGetters } from 'vuex'

export default {
    name: 'CreateLessonProgressModal',

    computed: {
        ...mapGetters({
            // Процесс загрузки
            percents: 'lessonInfo/getPercentsCompleted',
            completedStatus: 'lessonInfo/getCompletedStatus'
        })
    },

    methods: {
        // Закрыть всплыв. окно
        closeModal() {
            if(this.completedStatus) {
                this.$root.$emit('closeCreateLessonProgressModalEvent')
            }
        }
    }
}
</script>