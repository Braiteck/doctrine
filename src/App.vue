<template>
    <section class="app_wrap">
        <transition name="fade" mode="out-in">
        <vue-extend-layouts path="layouts" />
        </transition>

        <!-- Прогрессбар -->
        <vue-progress-bar />
    </section>
</template>


<script>
// Импорт компонентов
import VueExtendLayouts from 'vue-extend-layout'

export default {
    name: 'App',

    components: {
        VueExtendLayouts // Компонент реализующий layouts
    },

    created () {
        // Старт прогрессбара
        this.$Progress.start()

        // Добавление индикатора прогрессбара при переходе по страницам
        this.$router.beforeEach((to, from, next) => {
            // Старт прогрессбара
            this.$Progress.start()

            next()
        })

        this.$router.afterEach(() => {
            // Финиш прогрессбара
            this.$Progress.finish()
        })
    },

    mounted () {
        // Финиш прогрессбара
        this.$Progress.finish()
    }
}
</script>