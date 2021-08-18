<template>
    <!-- Шапка -->
    <header>
        <div class="cont row">
            <!-- Шапка - Логотип -->
            <div class="logo">
                <img src="/images/logo.svg" alt="">
            </div>

            <!-- Шапка - Слоган -->
            <div class="slogan" v-html="$t('message.header_slogan')"></div>

            <!-- Шапка - Кнопка регистрации -->
            <router-link to="/register" class="register_link">
                <span>{{ $t('message.btn_register') }}</span>
                <img src="/images/ic_btn_arr.svg" alt="">
            </router-link>

            <!-- Шапка - Кнопка входа -->
            <router-link to="/login" class="login_link">
                {{ $t('message.btn_login') }}
            </router-link>
        </div>
    </header>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/header.css'

export default {
    name: 'Header'
}
</script>