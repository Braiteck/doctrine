<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Интеграции -->
        <section class="integrations block">
            <!-- Интеграции - Верхняя часть страницы -->
            <div class="block_head">
                <div class="title">
                    <!-- Интеграции - Верхняя часть страницы - Иконка -->
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_integration"></use></svg>

                    <!-- Интеграции - Верхняя часть страницы - Заголовок -->
                    {{ $t('message.page_title_integrations') }}
                </div>
            </div>


            <!-- Интеграции - Список -->
            <div class="row">
                <!-- Интеграции - Список - Интеграция -->
                <div class="item" v-for="(integration, index) in integrations" :key="`${index}`">
                    <!-- Интеграция - Иконка -->
                    <div class="logo">
                        <img v-lazy="`/images/logo_${integration.slug}.svg`" alt="" class="lazyload">
                    </div>

                    <!-- Интеграция - Название -->
                    <div class="name">{{ integration.name }}</div>

                    <!-- Интеграция - Кнопка насктройки -->
                    <router-link :to="`/${$store.state.user.data.route}/integrations/${integration.slug}`" class="details_link">
                        <div class="icon"></div>
                        {{ $t('message.btn_setting') }}
                    </router-link>
                </div>
            </div>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/integrations.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"

export default {
    name: 'AuthorIntegrations',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_integrations')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            integrations: []
        }
    },

    beforeCreate () {
        // Загрузка интеграций
        this.$store.dispatch('authorIntegrations/loadIntegrations').then(() => {
            // Запись данных
            this.integrations = this.$store.state.authorIntegrations.data

            // Прелоадер
            this.preloader = false
        })
    }
}
</script>