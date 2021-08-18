<template>
    <!-- Юзер -->
    <div class="user_info">
        <router-link :to="`/${$store.state.user.data.route}/profile`" class="user">
            <!-- Юзер - Аватар -->
            <div class="avatar">
                <img v-lazy="imagesUrl + user.avatar.avatar_mini" alt="" class="lazyload" v-if="user.avatar">
                <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>

                <!-- Юзер - Аватар - Иконка -->
                <div class="icon">
                    <svg><use xlink:href="/images/sprite.svg#ic_settings"></use></svg>
                </div>
            </div>

            <div class="info">
                <!-- Юзер - Имя -->
                <div class="name">{{ user.name }}</div>

                <!-- Юзер - E-mail -->
                <div class="email">{{ user.email }}</div>
            </div>
        </router-link>


        <!-- Юзер - Кнопка выхода -->
        <button class="logout" @click.prevent="logout()">
            <!-- Юзер - Кнопка выхода - Иконка -->
            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_logout"></use></svg>

            <!-- Юзер - Кнопка выхода - Текст -->
            <span>{{ $t('message.btn_logout') }}</span>
        </button>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/sidebar/userInfo.css'

// Импорт Vuex
import { mapGetters } from 'vuex'

export default {
    name: 'SidebarUserInfo',

    // Локальные данные
    data () {
        return {
            imagesUrl: process.env.VUE_APP_IMAGES_URL
        }
    },

    computed: {
        ...mapGetters({
            // Данные о пользователе
            user: 'user/getData'
        })
    },

    methods: {
        // Выход из аккаунта
        logout() {
            this.$root.$emit('logoutEvent')
        }
    }
}
</script>