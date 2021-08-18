<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Добавить -->
        <section class="mob_add">
            <!-- Добавить - Верхняя часть страницы -->
            <div class="block_head">
                <!-- Добавить - Верхняя часть страницы - Заголовок -->
                <div class="title">
                    {{ $t('message.btn_add') }}
                </div>
            </div>


            <!-- Добавить - Кнопки -->
            <div class="row">
                <!-- Добавить - Кнопки - Кнопка -->
                <router-link :to="`/${$store.state.user.data.route}/add_course`" class="btn">
                    <!-- Добавить - Кнопки - Кнопка - Иконка -->
                    <svg class="icon ic_course"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>

                    <!-- Добавить - Кнопки - Кнопка -->
                    <span>{{ $t('message.product_type_course') }}</span>
                </router-link>

                <!-- Добавить - Кнопки - Кнопка -->
                <button class="btn" @click.prevent="$root.$emit('openCreateLessonModalEvent')">
                    <!-- Добавить - Кнопки - Кнопка - Иконка -->
                    <svg class="icon ic_lesson"><use xlink:href="/images/sprite.svg#ic_lesson"></use></svg>

                    <!-- Добавить - Кнопки - Кнопка -->
                    <span>{{ $t('message.product_type_lesson') }}</span>
                </button>
            </div>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/mobAdd.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"

export default {
    name: 'MobAdd',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_mob_add')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
    },

    // Локальные данные
    data () {
        return {
            preloader: true
        }
    },

    mounted () {
        // Прелоадер
        this.preloader = false
    }
}
</script>