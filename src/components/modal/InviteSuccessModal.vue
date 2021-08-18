<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal" id="invite_success_modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Иконка -->
                <div class="icon">
                    <img src="/images/ic_send.svg" alt="">
                </div>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="title">
                    {{ $t('message.modal_invite_success') }}
                </div>

                <!-- Вспдыв. окно - Успешная загрузка - Кнопка закрытия -->
                <button class="close_btn" @click.prevent="closeModal">
                    {{ $t('message.btn_close_modal') }}
                </button>
            </section>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/modal/invite.css'

export default {
    name: 'InviteSuccessModal',

    methods: {
        // Закрыть всплыв. окно
        closeModal() {
            this.$root.$emit('closeInviteSuccessModalEvent')
        }
    }
}
</script>