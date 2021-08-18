<template>
    <!-- Текущие тарифы -->
    <div class="your_tariffs">
        <!-- Текущие тарифы - Кнопка -->
        <button class="btn" @click.prevent="showDropdown = !showDropdown" :class="{ active: showDropdown }" v-click-outside="onClickOutside">
            {{ $t('message.your_tariff_title') }}
        </button>


        <!-- Текущие тарифы - Всплывашка -->
        <transition name="fade">
        <div class="dropdown" v-if="showDropdown">
            <!-- Текущие тарифы - Список -->
            <CurrentTariffs />


            <!-- Текущие тарифы - Ссылка на страницу всех тарифов -->
            <router-link :to="`/${$store.state.user.data.route}/tariffs`" class="change_btn">
                {{ $t('message.your_tariff_btn_change') }}
            </router-link>
        </div>
        </transition>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/topPanel/tariffsInfo.css'

// Импорт компонентов
import CurrentTariffs from "@/components/CurrentTariffs.vue"

export default {
    name: 'topPanelTariffsInfo',

    // Локальные данные
    data () {
        return {
            showDropdown: false
        }
    },

    // Компоненты
    components: {
        CurrentTariffs // Текущие тарифы
    },

    methods: {
        // Клик за пределами всплывашки
        onClickOutside () {
            this.showDropdown = false
        }
    }
}
</script>