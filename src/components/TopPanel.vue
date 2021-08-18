<template>
    <!-- Верхняя панель -->
    <section class="top_panel row">
        <!-- Верхняя панель - Логотип -->
        <Logo />

        <!-- Верхняя панель - Кнопка "Добавить" -->
        <AddBtn v-if="$store.state.user.data.route == 'author' && !lessonInfo.name" />

        <!-- Верхняя панель - Информация о тарифах -->
        <TariffsInfo v-if="$store.state.user.data.route == 'author' && !lessonInfo.name" />

        <!-- Верхняя панель - Информация об уроке -->
        <LessonInfo :lesson="lessonInfo" v-if="lessonInfo.name" />

        <!-- Верхняя панель - Информации о пользователе -->
        <UserInfo />
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/topPanel.css'

// Импорт компонентов
import Logo from "@/components/topPanel/Logo.vue"
import AddBtn from "@/components/topPanel/AddBtn.vue"
import LessonInfo from "@/components/topPanel/LessonInfo.vue"
import TariffsInfo from "@/components/topPanel/TariffsInfo.vue"
import UserInfo from "@/components/topPanel/UserInfo.vue"

export default {
    name: 'TopPanel',

    // Данные из вне
    props: ['lessonInfo'],

    // Компоненты
    components: {
        Logo, // Логотип
        AddBtn, // Кнопка добавления
        LessonInfo, // Информация об уроке
        TariffsInfo, // Информация о тарифах
        UserInfo // Информации о пользователе
    }
}
</script>