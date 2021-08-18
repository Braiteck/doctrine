<template>
    <!-- Моб. нижняя панель -->
    <section class="mob_bottom_panel">
        <div class="cont row">
            <!-- Моб. нижняя панель - Ссылка -->
            <router-link :to="`/${$store.state.user.data.route}/courses`">
                <svg class="icon ic_courses"><use xlink:href="/images/menu.svg#ic_course"></use></svg>
            </router-link>

            <!-- Моб. нижняя панель - Ссылка -->
            <router-link :to="`/${$store.state.user.data.route}/lessons`">
                <svg class="icon ic_lessons"><use xlink:href="/images/menu.svg#ic_lesson"></use></svg>
            </router-link>

            <!-- Моб. нижняя панель - Ссылка -->
            <router-link :to="`/${$store.state.user.data.route}/notes`">
                <svg class="icon ic_notes"><use xlink:href="/images/menu.svg#ic_note"></use></svg>
            </router-link>

            <!-- Моб. нижняя панель - Ссылка -->
            <router-link :to="`/${$store.state.user.data.route}/profile`">
                <svg class="icon ic_profile"><use xlink:href="/images/menu.svg#ic_profile"></use></svg>
            </router-link>
        </div>
    </section>
</template>


<script>
// Import CSS
import '@/assets/css/component/mobBottomPanel.css'

export default {
    name: 'userMobBottomPanel'
}
</script>