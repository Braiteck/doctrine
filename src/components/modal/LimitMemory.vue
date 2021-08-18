<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal limit_modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Иконка -->
                <div class="icon">
                    <img src="/images/ic_limit_memory.svg" alt="">
                </div>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="title" v-html="$t('message.modal_title_limit_memory')"></div>

                <!-- Вспдыв. окно - Ссылка на тарифы -->
                <router-link :to="`/${$store.state.user.data.route}/tariffs`" class="link">
                    {{ $t('message.btn_change_tariff') }}
                </router-link>
            </section>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/modal/limitModal.css'

export default {
    name: 'LimitMemoryModal',

    methods: {
        // Закрыть всплыв. окно
        closeModal() {
            this.$root.$emit('closeLimitMemoryModalEvent')
        }
    }
}
</script>