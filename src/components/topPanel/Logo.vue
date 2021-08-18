<template>
    <!-- Логотип -->
    <div class="logo">
        <img v-lazy="'/images/logo2.svg'" alt="" class="lazyload">
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/topPanel/logo.css'

export default {
    name: 'topPanelLogo'
}
</script>