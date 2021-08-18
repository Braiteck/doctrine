<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <section class="mob_author_menu block">
            <!-- Профиль - Меню -->
            <section class="mob_menu">
                <div class="row">
                    <!-- Профиль - Меню - Ссылка -->
                    <router-link :to="`/${$store.state.user.data.route}/courses`" class="link">
                        <!-- Профиль - Меню - Ссылка - Иконка -->
                        <svg class="icon"><use xlink:href="/images/menu.svg#ic_course"></use></svg>

                        <!-- Профиль - Меню - Ссылка - Текст -->
                        <span>{{ $t('message.author_menu_courses') }}</span>
                    </router-link>

                    <!-- Профиль - Меню - Ссылка -->
                    <router-link :to="`/${$store.state.user.data.route}/lessons`" class="link">
                        <!-- Профиль - Меню - Ссылка - Иконка -->
                        <svg class="icon"><use xlink:href="/images/menu.svg#ic_lesson"></use></svg>

                        <!-- Профиль - Меню - Ссылка - Текст -->
                        <span>{{ $t('message.author_menu_lessons') }}</span>
                    </router-link>

                    <!-- Профиль - Меню - Ссылка -->
                    <router-link :to="`/${$store.state.user.data.route}/profile`" class="link">
                        <!-- Профиль - Меню - Ссылка - Иконка -->
                        <svg class="icon"><use xlink:href="/images/menu.svg#ic_profile"></use></svg>

                        <!-- Профиль - Меню - Ссылка - Текст -->
                        <span>{{ $t('message.author_menu_profile') }}</span>
                    </router-link>

                    <!-- Профиль - Меню - Ссылка -->
                    <router-link :to="`/${$store.state.user.data.route}/users`" class="link">
                        <!-- Профиль - Меню - Ссылка - Иконка -->
                        <svg class="icon"><use xlink:href="/images/menu.svg#ic_users"></use></svg>

                        <!-- Профиль - Меню - Ссылка - Текст -->
                        <span>{{ $t('message.author_menu_users') }}</span>
                    </router-link>

                    <!-- Профиль - Меню - Ссылка -->
                    <router-link :to="`/${$store.state.user.data.route}/tariffs`" class="link">
                        <!-- Профиль - Меню - Ссылка - Иконка -->
                        <svg class="icon"><use xlink:href="/images/menu.svg#ic_tariffs"></use></svg>

                        <!-- Профиль - Ссылки - Ссылка - Текст -->
                        <span>{{ $t('message.author_menu_tariffs') }}</span>
                    </router-link>

                    <!-- Профиль - Меню - Ссылка -->
                    <router-link :to="`/${$store.state.user.data.route}/integrations`" class="link">
                        <!-- Профиль - Меню - Ссылка - Иконка -->
                        <svg class="icon"><use xlink:href="/images/menu.svg#ic_integration"></use></svg>

                        <!-- Профиль - Ссылки - Ссылка - Текст -->
                        <span>{{ $t('message.author_menu_integration') }}</span>
                    </router-link>
                </div>
            </section>


            <!-- Профиль - Текущие тарифы -->
            <section class="your_tariffs">
                <div class="title">
                    {{ $t('message.your_tariff_title') }}
                </div>

                <!-- Профиль - Текущие тарифы - Список -->
                <CurrentTariffs />

                <!-- Профиль - Текущие тарифы - Ссылка на страницу всех тарифов -->
                <router-link :to="`/${$store.state.user.data.route}/tariffs`" class="change_btn">
                    {{ $t('message.your_tariff_btn_change') }}
                </router-link>
            </section>


            <!-- Профиль - Ссылки -->
            <!-- <section class="links"> -->
                <!-- Профиль - Ссылки - Ссылка -->
                <!-- <div><a href="/" open target="_blank" rel="noopener nofollow"> -->
                    <!-- Профиль - Ссылки - Ссылка - Иконка -->
                    <!-- <div class="icon ic_apple">
                        <svg><use xlink:href="/images/sprite.svg#ic_apple"></use></svg>
                    </div> -->

                    <!-- Профиль - Ссылки - Ссылка - Текст -->
                    <!-- <div>{{ $t('message.app_download_apple') }}</div>
                </a></div> -->

                <!-- Профиль - Ссылки - Ссылка -->
                <!-- <div><a href="/" target="_blank" rel="noopener nofollow"> -->
                    <!-- Профиль - Ссылки - Ссылка - Иконка -->
                    <!-- <div class="icon ic_android">
                        <svg><use xlink:href="/images/sprite.svg#ic_android"></use></svg>
                    </div> -->

                    <!-- Профиль - Ссылки - Ссылка - Текст -->
                    <!-- <div>{{ $t('message.app_download_google') }}</div>
                </a></div>
            </section> -->


            <!-- Профиль - Ссылки -->
            <section class="links">
                <!-- Профиль - Ссылки - Ссылка -->
                <div><a href="/docs/contractOfferDoctrine.pdf" target="_blank" rel="noopener nofollow">
                    <!-- Профиль - Ссылки - Ссылка - Иконка -->
                    <div class="icon">
                        <svg><use xlink:href="/images/sprite.svg#ic_files"></use></svg>
                    </div>

                    <!-- Профиль - Ссылки - Ссылка - Текст -->
                    <div>{{ $t('message.footer_link_offer') }}</div>
                </a></div>

                <!-- Профиль - Ссылки - Ссылка -->
                <div><a href="/docs/confDoctrine.pdf" open target="_blank" rel="noopener nofollow">
                    <!-- Профиль - Ссылки - Ссылка - Иконка -->
                    <div class="icon">
                        <svg><use xlink:href="/images/sprite.svg#ic_files"></use></svg>
                    </div>

                    <!-- Профиль - Ссылки - Ссылка - Текст -->
                    <div>{{ $t('message.footer_link_privacy_policy') }}</div>
                </a></div>

                <!-- Профиль - Ссылки - Ссылка -->
                <div><router-link :to="`/${$store.state.user.data.route}/tariffs`">
                    <!-- Профиль - Ссылки - Ссылка - Иконка -->
                    <div class="icon">
                        <svg><use xlink:href="/images/menu.svg#ic_tariffs"></use></svg>
                    </div>

                    <!-- Профиль - Ссылки - Ссылка - Текст -->
                    <div>{{ $t('message.author_menu_tariffs') }}</div>
                </router-link></div>
            </section>


            <!-- Профиль - Кнопка выхода -->
            <button class="logout" @click.prevent="logout">
                <!-- Профиль - Кнопка выхода - Иконка -->
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_logout"></use></svg>

                <!-- Профиль - Кнопка выхода - Текст -->
                <span>{{ $t('message.btn_logout') }}</span>
            </button>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/mobMenu.css'
import '@/assets/css/page/mobAuthorMenu.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import CurrentTariffs from "@/components/CurrentTariffs.vue"

export default {
    name: 'MobMenu',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_mob_menu')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
        CurrentTariffs // Текущие тарифы
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            tariffs: []
        }
    },

    beforeCreate () {
        // Загрузка текущих тарифов
        this.$store.dispatch('authorTariffs/loadCurrentTariffs').then(() => {
            // Запись данных
            this.tariffs = this.$store.state.authorTariffs.current
        })
    },

    mounted () {
        // Прелоадер
        this.preloader = false
    },

    methods: {
        // Выход из аккаунта
        logout() {
            this.$root.$emit('logoutEvent')
        }
    }
}
</script>