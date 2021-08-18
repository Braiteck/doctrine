<template>
    <section class="wrap">
        <section class="main">
            <!-- Шапка -->
            <Header />

            <!-- Контент страницы -->
            <router-view />
        </section>

        <!-- Подвала-->
        <Footer />
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/error.css'

// Импорт компонентов
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
    name: 'Error',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_error404'),
            bodyAttrs: {
                class: ['inner', 'header_light']
            }
        }
    },

    // Компоненты
    components: {
        Header, // Шапка
        Footer // Подвала
    }
}
</script>