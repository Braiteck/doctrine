<template>
    <!-- Поиск -->
    <section class="search">
        <form @submit.prevent="onSearchSubmit" :class="{ processing: processing }">
            <!-- Поиск - Поле ввода -->
            <input type="text" class="input" v-model.trim="query" :placeholder="$t('message.form_placeholder_search')">

            <!-- Поиск - Кнопка очистки -->
            <button type="button" class="clear_btn" @click.prevent="clearSearch" v-if="query != ''"></button>

            <!-- Поиск - Кнопка отправки -->
            <button type="submit" class="submit_btn">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_search"></use></svg>
            </button>
        </form>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/search.css'

export default {
    name: 'Search',

    // Локальные данные
    data () {
        return {
            processing: false,
            query: ''
        }
    },

    methods: {
        // Отправка формы поиска
        onSearchSubmit () {
            this.$root.$emit('searchSubmitEvent', this.query)
        },

        // Очистка поиска
        clearSearch () {
            this.query = ''
            this.$root.$emit('searchSubmitEvent', this.query)
        }
    }
}
</script>