<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Интеграция -->
        <section class="integration_info block">
            <!-- Интеграция - Верхняя информация -->
            <section class="head_data">
                <!-- Интеграция - Верхняя информация - Кнопка "назад" -->
                <div class="back_link">
                    <router-link :to="`/${$store.state.user.data.route}/integrations`">
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_back"></use></svg>
                        <span>{{ $t('message.integration_btn_back') }}</span>
                    </router-link>
                </div>

                <!-- Интеграция - Верхняя информация - Информация -->
                <div class="info">
                    <!-- Интеграция - Верхняя информация - Заголовок -->
                    <div class="title">{{ $t('message.integration1_title') }}</div>

                    <!-- Интеграция - Верхняя информация - Описание -->
                    <div class="desc">{{ $t('message.integration1_desc') }}</div>

                    <!-- Интеграция - Верхняя информация - Кнопки -->
                    <div class="btns">
                        <!-- Интеграция - Верхняя информация - Кнопка открытия инструкции -->
                        <div><a :href="`${integration.help_url}`" open target="_blank" rel="noopener nofollow" class="btn">
                            {{ $t('message.btn_instruction') }}
                        </a></div>

                        <!-- Интеграция - Верхняя информация - Кнопка перехода к истории -->
                        <div v-if="integration.history.length"><a href="#history" class="btn history_btn">
                            {{ $t('message.btn_history') }}
                        </a></div>
                    </div>
                </div>

                <!-- Интеграция - Верхняя информация - Изображение -->
                <div class="image">
                    <div class="logo">
                        <img v-lazy="`/images/logo_${integration.slug}.svg`" alt="" class="lazyload">
                    </div>

                    <img v-lazy="'/images/bg_integration_logo.svg'" alt="" class="lazyload bg">
                </div>
            </section>


            <!-- Интеграция - Действия -->
            <section class="actions">
                <!-- Интеграция - Действия - Заголовок -->
                <div class="block_title">{{ $t('message.integration_actions_title') }}</div>

                <!-- Интеграция - Действия - Список -->
                <div class="items">
                    <!-- Интеграция - Действия - Действие -->
                    <div class="action">
                        <!-- Интеграция - Действия - Действие - Название -->
                        <div class="name">
                            <div v-html="$t('message.integration1_action1_name')"></div>
                        </div>

                        <!-- Интеграция - Действия - Действие - Ссылка -->
                        <button type="button" class="url copy_btn"
                            v-clipboard:copy="integration.url"
                            v-clipboard:success="onCopy">
                            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_copy"></use></svg>
                            <span>{{ integration.url }}</span>
                        </button>
                    </div>


                    <!-- Интеграция - Действия - Действие -->
                    <div class="action">
                        <!-- Интеграция - Действия - Действие - Название -->
                        <div class="name">
                            <div>{{ $t('message.integration_action2_name') }}</div>
                        </div>

                        <!-- Интеграция - Действия - Действие - Страницы -->
                        <form @submit.prevent="onSubmit" class="pages form" :class="{ processing: processing }">
                            <!-- Интеграция - Действия - Действие - Страницы - Страница -->
                            <div class="line" v-for="(link, index) in integration.links" :key="`${index}`">
                                <div class="field">
                                    <!-- Интеграция - Действия - Действие - Страницы - Поле ввода -->
                                    <input type="url" class="input" v-model.trim="integration.links[index]"
                                        :class="{ active: integration.links[index].length }">

                                    <!-- Интеграция - Действия - Действие - Страницы - Название поля -->
                                    <div class="label">
                                        {{ $t('message.form_label_url') }}
                                    </div>

                                    <!-- Интеграция - Действия - Действие - Страницы - Кнопка удаления -->
                                    <button type="button" class="delete_btn" @click.prevent="deleteDomain(index)">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Интеграция - Действия - Действие - Страницы - Кнопка добавления -->
                            <button class="add_btn" @click.prevent="addDomain">
                                <span class="icon"></span>{{ $t('message.btn_add_variant') }}
                            </button>

                            <!-- Интеграция - Действия - Действие - Страницы - Кнопка сохранения -->
                            <button type="submit" class="submit_btn">
                                {{ $t('message.btn_save_settings') }}
                            </button>
                        </form>
                    </div>
                </div>
            </section>


            <!-- Интеграция - История -->
            <section class="history" id="history" v-if="integration.history.length">
                <!-- Интеграция - История - Верхняя часть блока -->
                <div class="block_head">
                    <div class="title">
                        <!-- Интеграция - История - Верхняя часть блока - Иконка -->
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_integration"></use></svg>

                        <!-- Интеграция - История - Верхняя часть блока - Заголовок -->
                        {{ $t('message.integration_history_title') }}
                    </div>
                </div>


                <div class="data">
                    <!-- Интеграция - История - Заголовки -->
                    <div class="titles">
                        <div class="col_user">{{ $t('message.integration_history_col_name') }}</div>
                        <div class="col_email">{{ $t('message.integration_history_col_email') }}</div>
                        <div class="col_products">{{ $t('message.integration_history_col_products') }}</div>
                        <div class="col_date">{{ $t('message.integration_history_col_date') }}</div>
                    </div>


                    <!-- Интеграция - История - Список -->
                    <div class="list">
                        <!-- Интеграция - История - Список - Элемент -->
                        <div class="item" v-for="(item, index) in integration.history" :key="`${index}`">
                            <div class="col_user">
                                <!-- Интеграция - История - Список - Элемент - Аватар -->
                                <div class="avatar">
                                    <img v-lazy="imagesUrl + item.user.avatar.avatar_mini" alt="" class="lazyload" v-if="item.user.avatar">
                                    <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>
                                </div>

                                <!-- Интеграция - История - Список - Элемент - ФИО -->
                                <div>{{ item.user.name }} {{ item.surname }}</div>
                            </div>

                            <!-- Интеграция - История - Список - Элемент - E-mail -->
                            <div class="col_email">{{ item.user.email }}</div>

                            <!-- Интеграция - История - Список - Элемент - Продукты -->
                            <div class="col_products">{{ item.product }}</div>

                            <!-- Интеграция - История - Список - Элемент - Дата -->
                            <div class="col_date">{{ item.date }}</div>
                        </div>
                    </div>


                    <!-- Интеграция - История - Моб. список -->
                    <div class="list mob_list accordion">
                        <!-- Интеграция - История - Список - Элемент -->
                        <div class="item" v-for="(item, index) in integration.history" :key="`${index}`">
                            <div class="head" v-accordion>
                                <!-- Интеграция - История - Список - Элемент - Аватар -->
                                <div class="avatar">
                                    <img v-lazy="imagesUrl + item.user.avatar.avatar_mini" alt="" class="lazyload" v-if="item.user.avatar">
                                    <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>
                                </div>

                                <div>
                                    <!-- Интеграция - История - Список - Элемент - ФИО -->
                                    <div class="name">{{ item.user.name }} {{ item.surname }}</div>

                                    <!-- Интеграция - История - Список - Элемент - Дата -->
                                    <div class="date">{{ item.date }}</div>
                                </div>

                                <div class="arr"></div>
                            </div>

                            <div class="data hide">
                                <div class="features">
                                    <!-- Интеграция - История - Список - Элемент - E-mail -->
                                    <div>
                                        <div class="name">{{ $t('message.integration_history_col_email') }}</div>
                                        <div class="val">{{ item.user.email }}</div>
                                    </div>

                                    <!-- Интеграция - История - Список - Элемент - Продукты -->
                                    <div class="full">
                                        <div class="name">{{ $t('message.integration_history_col_products') }}</div>
                                        <div class="val">{{ item.product }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- Интеграция - История - Нижняя панель -->
                    <div class="bottom" v-if="integration.history">
                        <!-- Интеграция - История - Нижняя панель - Тотал -->
                        <div class="shown">
                            {{ $t('message.integration_bottom_show') }}
                            <span>{{ integration.history.length }}</span>
                            {{ $t('message.from') }}
                            <span>{{ integration.total_history }}</span>
                        </div>

                        <!-- Интеграция - История - Нижняя панель - Переход на страницу -->
                        <div class="go_to">
                            {{ $t('message.pages') }}
                            <input type="text" class="input" v-model.trim="currentPage" @input="sendRequest = true">
                            {{ $t('message.from') }}
                            {{ totalPages }}
                        </div>

                        <!-- Интеграция - История - Нижняя панель - Кнопки -->
                        <button class="prev" v-if="currentPage > 1" @click.prevent="prevPage"></button>
                        <button class="next" v-if="currentPage < totalPages" @click.prevent="nextPage"></button>
                    </div>
                </div>
            </section>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/integration.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"

export default {
    name: 'AuthorIntegrationTilda',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_integrations')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
    },

    // Локальные данные
    data () {
        return {
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            processing: false,
            preloader: false,
            integration: {},
            currentPage: 1,
            totalPages: 1,
            sendRequest: false
        }
    },

    beforeCreate () {
        // Загрузка интеграций
        this.$store.dispatch('authorIntegrations/loadIntegrationTilda', 0).then(() => {
            // Запись данных
            this.integration = this.$store.state.authorIntegrations.tilda

            // Всего страниц
            this.totalPages = Math.ceil(this.integration.total_history / this.$store.state.authorIntegrations.limit)

            // Прелоадер
            this.preloader = false
        })
    },

    methods: {
        // Копирование url
        onCopy () {
            // Показ сообщения об успешном копировании
            this.$toast.success(this.$t('message.notification_success_link_copy'))
        },


        // Добавление нового домена
        addDomain () {
            this.integration.links.push('')
        },

        // Удаление домена по индексу
        deleteDomain (domainIndex) {
            this.integration.links.splice(domainIndex, 1)
        },


        // Отправка формы
        onSubmit () {
            // Блокировка формы
            this.processing = true

            // Старт прогрессбара
            this.$Progress.start()

            // Запрос на сервер
            this.$store.dispatch('authorIntegrations/setIntegrationLinks', {
                slug: 'tilda',
                links: this.integration.links
            }).then(res => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Ошибка запроса на сервер
                if(res.error) {
                    // Показ сообщения об ошибке
                    this.$toast.error(this.$t('message.notification_error_domains'))
                }

                // Успешный запрос на сервер
                if(res.success) {
                    // Показ сообщения об успешном изменении
                    this.$toast.success(this.$t('message.notification_success_domains'))
                }
            })
        },


        // Переход на предыдущую страницу
        prevPage () {
            this.currentPage = this.currentPage-1
            this.sendRequest = true
        },

        // Переход на следующую страницу
        nextPage () {
            this.currentPage++
            this.sendRequest = true
        }
    },


    watch: {
        // Смена страницы
        'sendRequest': function () {
            if(this.sendRequest){
                // Загрузка истории взаимодействия
                this.$store.dispatch('authorIntegrations/loadIntegrationTilda', ((this.currentPage-1)*this.$store.state.authorIntegrations.limit)).then(() => {
                    // Запись данных
                    this.integration = this.$store.state.authorIntegrations.tilda

                    // Всего страниц
                    this.totalPages = Math.ceil(this.integration.total_history / this.$store.state.authorIntegrations.limit)

                    this.sendRequest = false
                })
            }
        }
    }
}
</script>