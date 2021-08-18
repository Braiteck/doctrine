<template>
    <section class="wrap">
        <!-- Верхняя панель -->
        <TopPanel :lessonInfo="lessonInfo" />


        <section class="main content_flex row">
            <!-- Боковая панель -->
            <Sidebar />

            <section class="content">
                <section class="page_content">
                    <!-- Контент страницы -->
                    <transition name="fade" mode="out-in">
                    <router-view />
                    </transition>
                </section>

                <!-- Подвал аккаунта -->
                <FooterAccount />
            </section>
        </section>


        <!-- Всплыв. окно добавления урока -->
        <transition name="fade">
        <CreateLessonModal v-if="showCreateLessonModal" :lessonInfo="lessonInfo" />
        </transition>

        <!-- Всплыв. окно процеесса создания урока -->
        <transition name="fade">
        <CreateLessonProgressModal v-if="showCreateLessonProgressModal" />
        </transition>


        <!-- Всплыв. окно лимита пользователей -->
        <transition name="fade">
        <LimitStudentsModal v-if="showLimitStudentsModal" />
        </transition>

        <!-- Всплыв. окно лимита хранилища -->
        <transition name="fade">
        <LimitMemoryModal v-if="showLimitMemoryModal" />
        </transition>


        <!-- Моб. нижняя панель юзера -->
        <MobBottomPanelUser v-if="$store.state.user.data.route == 'user'" />

        <!-- Моб. нижняя панель автора -->
        <MobBottomPanelAuthor v-if="$store.state.user.data.route == 'author'" />

        <a href="https://t.me/joinchat/lEvSswImQvw3MWFi" target="_blank" rel="noopener nofollow" class="telegram_fixed" v-if="$store.state.user.data.route == 'author'">
            <img v-lazy="'/images/ic_telegram.svg'" alt="" class="icon lazyload">
        </a>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/account.css'
import '@/assets/css/block_head.css'
import '@/assets/css/accordion.css'

// Импорт компонентов
import TopPanel from "@/components/TopPanel.vue"
import Sidebar from "@/components/Sidebar.vue"
import CreateLessonModal from "@/components/modal/CreateLesson.vue"
import CreateLessonProgressModal from "@/components/modal/CreateLessonProgress.vue"
import LimitStudentsModal from "@/components/modal/LimitStudents.vue"
import LimitMemoryModal from "@/components/modal/LimitMemory.vue"
import MobBottomPanelUser from "@/components/MobBottomPanelUser.vue"
import MobBottomPanelAuthor from "@/components/MobBottomPanelAuthor.vue"
import FooterAccount from "@/components/FooterAccount.vue"

export default {
    name: 'Account',

    // Мета данные
    metaInfo: function () {
        return {
            bodyAttrs: {
                class: ['inner']
            }
        }
    },

    // Компоненты
    components: {
        TopPanel, // Верхняя панель
        Sidebar, // Боковая панель
        CreateLessonModal, // Всплыв. окно добавления урока
        CreateLessonProgressModal, // Всплыв. окно процеесса создания урока
        LimitStudentsModal, // Всплыв. окно лимита пользователей
        LimitMemoryModal, // Всплыв. окно лимита хранилища
        MobBottomPanelUser, // Моб. нижняя панель юзера
        MobBottomPanelAuthor, // Моб. нижняя панель автора
        FooterAccount // Подвал аккаунта
    },

    // Локальные данные
    data () {
        return {
            lessonInfo: false,
            showCreateLessonModal: false,
            showCreateLessonProgressModal: false,
            showLimitStudentsModal: false,
            showLimitMemoryModal: false
        }
    },

    mounted () {
        // Информация об уроке в шапке
        this.$root.$on('setHeaderLessonEvent', lessonInfo => {
            this.lessonInfo = lessonInfo
        })


        // Показаться всплыв. окно добавления урока если в url есть hash #addnewlesson
        if(location.hash == '#addnewlesson'){
            this.showCreateLessonModal = true
            document.body.classList.add('lock')
        }

        // Показаться всплыв. окно добавления урока
        this.$root.$on('openCreateLessonModalEvent', lessonId => {
            this.lessonInfo = { id: lessonId || '' }
            this.showCreateLessonModal = true
            document.body.classList.add('lock')
        })

        // Скрыть всплыв. окно добавления урока
        this.$root.$on('closeCreateLessonModalEvent', () => {
            this.showCreateLessonModal = false
            document.body.classList.remove('lock')
        })


        // Показаться всплыв. окно прогресса добавления урока
        this.$root.$on('openCreateLessonProgressModalEvent', () => {
            this.showCreateLessonProgressModal = true
            document.body.classList.add('lock')
        })

        // Скрыть всплыв. окно прогресса добавления урока
        this.$root.$on('closeCreateLessonProgressModalEvent', () => {
            this.$store.state.lessonInfo.percentCompleted = 0
            this.showCreateLessonProgressModal = false
            document.body.classList.remove('lock')
        })


        // Показать всплыв. окно лимита пользователей
        this.$root.$on('openLimitStudentsModalEvent', () => {
            this.showLimitStudentsModal = true
            document.body.classList.add('lock')
        })

        // Скрыть всплыв. окно лимита пользователей
        this.$root.$on('closeLimitStudentsModalEvent', () => {
            this.showLimitStudentsModal = false
            document.body.classList.remove('lock')
        })


        // Показать всплыв. окно лимита хранилища
        this.$root.$on('openLimitMemoryModalEvent', () => {
            this.showLimitMemoryModal = true
            document.body.classList.add('lock')
        })

        // Скрыть всплыв. окно лимита хранилища
        this.$root.$on('closeLimitMemoryModalEvent', () => {
            this.showLimitMemoryModal = false
            document.body.classList.remove('lock')
        })


        // Выход из аккаунта
        this.$root.$on('logoutEvent', () => {
            // Запрос на выход
            this.$store.dispatch('user/logout').then((res) => {
                if(res.error) { return }

                // Редирект
                window.location.replace(process.env.VUE_APP_SITE_URL)
            })
        })


        // Intercom
        // let user = this.$store.state.user.data

        // if(user.route == 'author') {
        //     this.$intercom.boot({
        //         user_id: user.id,
        //         name: user.name,
        //         email: user.email,
        //         phone: user.phone_original,
        //         width_browser: document.body.clientWidth,
        //         avatar: {
        //             type: 'avatar',
        //             image_url: user.avatar ? process.env.VUE_APP_SITE_URL + user.avatar.avatar_full : ''
        //         }
        //     })
        // }
    }
}
</script>