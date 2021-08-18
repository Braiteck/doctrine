<template>
    <section class="wrap">
        <section class="main auth_wrap">
            <!-- Контент страницы -->
            <transition name="fade" mode="out-in">
            <router-view />
            </transition>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/auth.css'

export default {
    name: 'Auth'
}
</script>