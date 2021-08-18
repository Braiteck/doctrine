<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="modal_title">
                    {{ $t('message.modal_title_delete_course') }}
                </div>


                <!-- Вспдыв. окно - Подтверждение -->
                <div class="detele_confirm">
                    <!-- Вспдыв. окно - Иконка -->
                    <img src="/images/ic_delete_confirm.svg" alt="" class="icon">

                    <!-- Вспдыв. окно - Текст -->
                    <div class="title" v-html="$t('message.modal_delete_course_confirm')"></div>

                    <div class="btns">
                        <!-- Вспдыв. окно - Кнопка "Нет" -->
                        <button @click.prevent="closeModal">
                            {{ $t('message.no') }}
                        </button>

                        <!-- Вспдыв. окно - Кнопка "Да" -->
                        <button class="yes" @click.prevent="deleteCourse">
                            {{ $t('message.yes') }}
                        </button>
                    </div>
                </div>
            </section>
        </section>
    </section>
</template>


<script>
export default {
    name: 'DeleteLessonModal',

    methods: {
        // Закрыть всплыв. окно
        closeModal() {
            this.$emit('closeModalEvent')
        },

        // Подтверждение удаления
        deleteCourse() {
            // Старт прогрессбара
            this.$Progress.start()

            // Подтверждение удаления
            this.$root.$emit('deleteCourseEvent')

            // Закрыть всплыв. окно
            this.closeModal()
        }
    }
}
</script>