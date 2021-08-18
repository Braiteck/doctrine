<template>
    <!-- Меню-->
    <div class="menu">
        <!-- Меню - Ссылка -->
        <div><router-link :to="`/${$store.state.user.data.route}/courses`">
            <!-- Меню - Ссылка - Иконка -->
            <svg class="icon ic_courses"><use xlink:href="/images/menu.svg#ic_course"></use></svg>

            <!-- Меню - Ссылка - Текст -->
            <span>{{ $t('message.user_menu_courses') }}</span>
        </router-link></div>

        <!-- Меню - Ссылка -->
        <div><router-link :to="`/${$store.state.user.data.route}/lessons`">
            <!-- Меню - Ссылка - Иконка -->
            <svg class="icon ic_lessons"><use xlink:href="/images/menu.svg#ic_lesson"></use></svg>

            <!-- Меню - Ссылка - Текст -->
            <span>{{ $t('message.user_menu_lessons') }}</span>
        </router-link></div>

        <!-- Меню - Ссылка -->
        <div><router-link :to="`/${$store.state.user.data.route}/notes`">
            <!-- Меню - Ссылка - Иконка -->
            <svg class="icon ic_notes"><use xlink:href="/images/menu.svg#ic_note"></use></svg>

            <!-- Меню - Ссылка - Текст -->
            <span>{{ $t('message.user_menu_notes') }}</span>
        </router-link></div>

        <!-- Меню - Ссылка -->
        <div><router-link :to="`/${$store.state.user.data.route}/profile`">
            <!-- Меню - Ссылка - Иконка -->
            <svg class="icon ic_profile"><use xlink:href="/images/menu.svg#ic_profile"></use></svg>

            <!-- Меню - Ссылка - Текст -->
            <span>{{ $t('message.user_menu_profile') }}</span>
        </router-link></div>
    </div>
</template>


<script>
// Import CSS
import '@/assets/css/component/sidebar/menu.css'

export default {
    name: 'UserMenu'
}
</script>