<template>
    <!-- Добавить -->
    <div class="add">
        <!-- Добавить - Кнопка -->
        <button class="btn" @click.prevent="showDropdown = !showDropdown" :class="{ active: showDropdown }" v-click-outside="onClickOutside">
            <span class="icon"></span>{{ $t('message.btn_add') }}
        </button>


        <!-- Добавить - Всплывашка -->
        <transition name="fade">
        <div class="dropdown" v-if="showDropdown">
            <!-- Добавить - Всплывашка - Кнопка "Курс" -->
            <router-link :to="`/${$store.state.user.data.route}/add_course`">
                <!-- Добавить - Всплывашка - Кнопка - Иконка -->
                <svg class="icon ic_course"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>

                <!-- Добавить - Всплывашка - Кнопка - Текст -->
                <span>{{ $t('message.product_type_course') }}</span>
            </router-link>


            <!-- Добавить - Всплывашка - Кнопка "Урок" -->
            <button @click.prevent="onClickCreateLesson">
                <!-- Добавить - Всплывашка - Кнопка - Иконка -->
                <svg class="icon ic_lesson"><use xlink:href="/images/sprite.svg#ic_lesson"></use></svg>

                <!-- Добавить - Всплывашка - Кнопка - Текст -->
                <span>{{ $t('message.product_type_lesson') }}</span>
            </button>
        </div>
        </transition>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/topPanel/addBtn.css'

export default {
    name: 'topPanelAddBtn',

    // Локальные данные
    data () {
        return {
            showDropdown: false
        }
    },

    methods: {
        // Клик за пределами всплывашки
        onClickOutside () {
            this.showDropdown = false
        },

        // Клик на создание урока
        onClickCreateLesson () {
            this.$root.$emit('openCreateLessonModalEvent')
        }
    }
}
</script>