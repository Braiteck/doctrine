<template>
    <!-- Левая панель -->
    <aside class="sidebar">
        <!-- Левая панель - Логотип -->
        <Logo />

        <div class="scroll">
            <!-- Левая панель - Меню пользователя -->
            <UserMenu v-if="$store.state.user.data.route == 'user'" />

            <!-- Левая панель - Меню автора -->
            <AuthorMenu v-if="$store.state.user.data.route == 'author'" />
        </div>

        <!-- Левая панель - Ссылки на приложение -->
        <!-- <AppLinks /> -->

        <!-- Левая панель - Информации о пользователе -->
        <UserInfo />
    </aside>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/sidebar.css'

// Импорт компонентов
import Logo from "@/components/sidebar/Logo.vue"
import UserMenu from "@/components/sidebar/UserMenu.vue"
import AuthorMenu from "@/components/sidebar/AuthorMenu.vue"
// import AppLinks from "@/components/sidebar/AppLinks.vue"
import UserInfo from "@/components/sidebar/UserInfo.vue"

export default {
    name: 'Sidebar',

    // Компоненты
    components: {
        Logo, // Логотип
        UserMenu, // Меню пользователя
        AuthorMenu, // Меню автора
        // AppLinks, // Ссылки на приложение
        UserInfo // Информации о пользователе
    }
}
</script>