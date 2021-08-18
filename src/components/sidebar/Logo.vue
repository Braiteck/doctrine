<template>
    <!-- Логотипа -->
    <div class="logo">
        <img v-lazy="'/images/logo2.svg'" alt="" class="lazyload">
        <img v-lazy="'/images/logo_mini.svg'" alt="" class="lazyload mini">
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/sidebar/logo.css'

export default {
    name: 'sidebarLogo'
}
</script>