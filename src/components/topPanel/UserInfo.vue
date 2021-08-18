<template>
    <!-- Юзер -->
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
    </router-link>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/topPanel/userInfo.css'

// Импорт Vuex
import { mapGetters } from 'vuex'

export default {
    name: 'topPanelUserInfo',

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
    }
}
</script>