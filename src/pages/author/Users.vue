<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Пользователи -->
        <section class="users block">
            <!-- Пользователи - Верхняя часть страницы -->
            <div class="block_head">
                <div class="title">
                    <!-- Пользователи - Верхняя часть страницы - Иконка -->
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_people"></use></svg>

                    <!-- Пользователи - Верхняя часть страницы - Заголовок -->
                    {{ $t('message.page_title_author_users') }}
                </div>


                <!-- Пользователи - Верхняя часть страницы - Кнопка "Пригласить" -->
                <button class="invite_btn" @click.prevent="openInviteModal">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_invite"></use></svg>
                    <span>{{ $t('message.btn_invite') }}</span>
                </button>
            </div>


            <!-- Пользователи - Поиск -->
            <Search />

            <!-- Сообщение если нет ниодного пользователя -->
            <div class="empty_message" v-if="!showDemo && searchQuery.length">
                <img src="/images/ic_empty_message.svg" alt="">

                <div class="title"  v-html="$t('message.empty_message_author_users_search')"></div>
            </div>


            <!-- Демо данные -->
            <div class="demo_exp" v-if="showDemo">
                <div>
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_tooltip"></use></svg>
                    <span>{{ $t('message.demo_text_author_users') }}</span>
                </div>
            </div>


            <!-- Пользователи -->
            <div class="data" v-if="!searchEmpty && users.length">
                <!-- Пользователи - Заголовки -->
                <div class="titles">
                    <div class="col_name">{{ $t('message.users_col_name') }}</div>
                    <div class="col_email">{{ $t('message.users_col_email') }}</div>
                    <div class="col_phone">{{ $t('message.users_col_phone') }}</div>
                    <div class="col_product">{{ $t('message.users_col_product') }}</div>
                    <div class="col_date">{{ $t('message.users_col_date') }}</div>
                </div>


                <!-- Пользователи - Список -->
                <div class="list">
                    <div v-for="(user, index) in users" :key="`${index}`">
                        <!-- Пользователи - Список - Пользователь -->
                        <router-link :to="`users/${user.id}`" class="user" v-if="user.slug">
                            <div class="col_name">
                                <!-- Пользователи - Список - Пользователь - Аватар -->
                                <div class="avatar">
                                    <img v-lazy="imagesUrl + user.avatar.avatar_mini" alt="" class="lazyload" v-if="user.avatar">
                                    <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>
                                </div>

                                <!-- Пользователи - Список - Пользователь - ФИО -->
                                <div>{{ user.name }} {{ user.surname }}<span class="arr"></span></div>
                            </div>

                            <!-- Пользователи - Список - Пользователь - E-mail -->
                            <div class="col_email">{{ user.email }}</div>

                            <!-- Пользователи - Список - Пользователь - Телефон -->
                            <div class="col_phone">{{ user.phone }}</div>

                            <!-- Пользователи - Список - Пользователь - Продукт -->
                            <div class="col_product">{{ user.product.type == 'lesson' ? $t('message.product_type_lesson') : $t('message.product_type_course') }}: {{ user.product.name }}</div>

                            <!-- Пользователи - Список - Пользователь - Дата -->
                            <div class="col_date">{{ user.product.date }}</div>
                        </router-link>


                        <!-- Пользователи - Список - Не зарегистрированный пользователь -->
                        <div class="user" v-else>
                            <div class="col_name">
                                <!-- Пользователи - Список - Не зарегистрированный пользователь - Аватар -->
                                <div class="avatar">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_invite"></use></svg>
                                </div>

                                <!-- Пользователи - Список - Не зарегистрированный пользователь - ФИО -->
                                <div>{{ $t('message.users_invited_name') }}</div>
                            </div>

                            <!-- Пользователи - Список - Не зарегистрированный пользователь - E-mail -->
                            <div class="col_email">{{ user.email }}</div>

                            <!-- Пользователи - Список - Не зарегистрированный пользователь - Ссылка на регистрацию -->
                            <div class="col_link">
                                <button type="button" class="copy_btn" v-clipboard:copy="user.url" v-clipboard:success="onCopy">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_copy"></use></svg>
                                    <span>{{ $t('message.btn_register_link') }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Пользователи - Моб. список -->
                <div class="list mob_list accordion">
                    <div v-for="(user, index) in users" :key="`${index}`">
                        <!-- Пользователи - Моб. список - Пользователь -->
                        <div class="user item" v-if="user.slug">
                            <div class="head" v-accordion>
                                <!-- Пользователи - Моб. список - Пользователь - Аватар -->
                                <div class="avatar">
                                    <img v-lazy="imagesUrl + user.avatar.avatar_mini" alt="" class="lazyload" v-if="user.avatar">
                                    <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>
                                </div>

                                <div>
                                    <!-- Пользователи - Моб. список - Пользователь - ФИО -->
                                    <div class="name">{{ user.name }} {{ user.surname }}</div>

                                    <!-- Пользователи - Моб. список - Пользователь - E-mail -->
                                    <div class="email">{{ user.email }}</div>
                                </div>

                                <div class="arr"></div>
                            </div>

                            <div class="data hide">
                                <div class="features">
                                    <!-- Пользователи - Моб. список - Пользователь - Телефон -->
                                    <div>
                                        <div class="name">{{ $t('message.users_col_phone') }}</div>
                                        <div class="val">{{ user.phone }}</div>
                                    </div>

                                    <!-- Пользователи - Моб. список - Пользователь - Продукт -->
                                    <div>
                                        <div class="name">{{ $t('message.users_col_product') }}</div>
                                        <div class="val">{{ user.product.type == 'lesson' ? $t('message.product_type_lesson') : $t('message.product_type_course') }}: {{ user.product.name }}</div>
                                    </div>

                                    <!-- Пользователи - Моб. список - Пользователь - Дата -->
                                    <div>
                                        <div class="name">{{ $t('message.users_col_date') }}</div>
                                        <div class="val">{{ user.product.date }}</div>
                                    </div>
                                </div>

                                <!-- Пользователи - Моб. список - Пользователь - Кнопка "Подробнее" -->
                                <router-link :to="`users/${user.id}`" class="details">
                                    {{ $t('message.btn_details') }}
                                </router-link>
                            </div>
                        </div>


                        <!-- Пользователи - Список - Не зарегистрированный пользователь -->
                        <div class="user item" v-else>
                            <div class="head" v-accordion>
                                <!-- Пользователи - Моб. список - Не зарегистрированный пользователь - Аватар -->
                                <div class="avatar">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_invite"></use></svg>
                                </div>

                                <div>
                                    <!-- Пользователи - Моб. список - Не зарегистрированный пользователь - ФИО -->
                                    <div class="name">{{ $t('message.users_invited_name') }}</div>

                                    <!-- Пользователи - Моб. список - Не зарегистрированный пользователь - E-mail -->
                                    <div class="email">{{ user.email }}</div>
                                </div>

                                <div class="arr"></div>
                            </div>

                            <div class="data hide">
                                <!-- Пользователи - Список - Не зарегистрированный пользователь - Ссылка на регистрацию -->
                                <button type="button" class="copy_btn" v-clipboard:copy="user.url" v-clipboard:success="onCopy">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_copy"></use></svg>
                                    <span>{{ $t('message.btn_register_link') }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Пользователи - Список - Нижняя панель -->
                <div class="bottom">
                    <!-- Пользователи - Список - Нижняя панель - Тотал -->
                    <div class="shown">
                        {{ $t('message.users_bottom_show') }}
                        <span>{{ users.length }}</span>
                        {{ $t('message.from') }}
                        <span v-if="!$store.state.authorUsers.total_users">2</span>
                        <span v-else>{{ $store.state.authorUsers.total_users }}</span>
                    </div>

                    <!-- Пользователи - Список - Нижняя панель - Переход на страницу -->
                    <div class="go_to">
                        {{ $t('message.pages') }}
                        <input type="text" class="input" v-model.trim="currentPage" @input="sendRequest = true">
                        {{ $t('message.from') }}
                        {{ totalPages }}
                    </div>

                    <!-- Пользователи - Список - Нижняя панель - Кнопки -->
                    <button class="prev" v-if="currentPage > 1" @click.prevent="prevPage"></button>
                    <button class="next" v-if="currentPage < totalPages" @click.prevent="nextPage"></button>
                </div>
            </div>
        </section>


        <!-- Всплыв. окно приглашения -->
        <transition name="fade">
        <InviteModal v-if="showInviteModal" @closeModalEvent='closeInviteModal' />
        </transition>

        <!-- Всплыв. окно успешного приглашения -->
        <transition name="fade">
        <InviteSuccessModal v-if="showInviteSuccessModal" />
        </transition>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/users.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import InviteModal from "@/components/modal/InviteModal.vue"
import InviteSuccessModal from "@/components/modal/InviteSuccessModal.vue"
import Search from "@/components/Search.vue"

export default {
    name: 'AuthorUsers',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_author_users')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
        InviteModal, // Всплыв. окно приглашения
        InviteSuccessModal, // Всплыв. окно успешного приглашения
        Search, // Поиск
    },

    // Локальные данные
    data () {
        return {
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            preloader: true,
            currentPage: 1,
            totalPages: 1,
            searchQuery: '',
            searchEmpty: false,
            sendRequest: false,
            showInviteModal: false,
            showInviteSuccessModal: false,
            showDemo: true,
            users: [
                {
                    id: 'demo',
                    name: 'Демонстрационный',
                    surname: 'пользователь',
                    email: 'help@doctrine.im',
                    phone: '+79112223344',
                    avatar: {
                        avatar_full: '/public/images/testava.jpg',
                        avatar_mini: '/public/images/testava.jpg'
                    },
                    slug: 'demo',
                    product: {
                        type: 'course',
                        name: 'Демонстрационный курс',
                        date: '01.03.2021'
                    }
                },
                {
                    id: 0,
                    name: null,
                    surname: null,
                    email: 'help@doctrine.im',
                    phone: null,
                    slug: null,
                }
            ]
        }
    },

    beforeCreate () {
        // Загрузка пользователей
        this.$store.dispatch('authorUsers/loadUsers', {search: '', offset: 0}).then(() => {
            // Запись данных
            if(this.$store.state.authorUsers.total_users){
                this.users = this.$store.state.authorUsers.data

                // Всего страниц
                this.totalPages = Math.ceil(this.$store.state.authorUsers.total_users / this.$store.state.authorUsers.limit)

                this.showDemo = false
            }

            // Прелоадер
            this.preloader = false
        })
    },

    mounted () {
        // Поиск пользователя
        this.$root.$on('searchSubmitEvent', searchQuery => {
            this.searchQuery = searchQuery
            this.currentPage = 1
            this.sendRequest = true
        })


        // Показать всплыв. окно приглашения если в url есть hash #invite
        if(location.hash == '#invite'){
            this.openInviteModal()
        }


        // Показать всплыв. окно об успешном приглашении
        this.$root.$on('openInviteSuccessModalEvent', () => {
            // Финиш прогрессбара
            this.$Progress.finish()

            this.showInviteSuccessModal = true
            document.body.classList.add('lock')

            this.sendRequest = true
        })

        // Скрыть всплыв. окно об успешном приглашении
        this.$root.$on('closeInviteSuccessModalEvent', () => {
            this.showInviteSuccessModal = false
            document.body.classList.remove('lock')
        })
    },

    methods: {
        // Переход на предыдущую страницу
        prevPage () {
            this.currentPage = this.currentPage-1
            this.sendRequest = true
        },

        // Переход на следующую страницу
        nextPage () {
            this.currentPage++
            this.sendRequest = true
        },


        // Показать всплыв. окно приглашения
        openInviteModal () {
            this.showInviteModal = true
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно приглашения
        closeInviteModal () {
            this.showInviteModal = false
            document.body.classList.remove('lock')
        },


        // Копирование url регистрации
        onCopy () {
            // Показ сообщения об успешном копировании
            this.$toast.success(this.$t('message.notification_success_link_copy'))
        },
    },

    watch: {
        // Смена страницы
        'sendRequest': function () {
            if(this.sendRequest){
                // Загрузка пользователей
                this.$store.dispatch('authorUsers/loadUsers', {
                    search: this.searchQuery,
                    offset: ((this.currentPage-1)*this.$store.state.authorUsers.limit)
                }).then(() => {
                    // Если поиск удачный
                    if(this.$store.state.authorUsers.total_users){
                        // Запись данных
                        this.users = this.$store.state.authorUsers.data

                        // Всего страниц
                        this.totalPages = Math.ceil(this.$store.state.authorUsers.total_users / this.$store.state.authorUsers.limit)

                        // Скрытие демо данныех
                        this.showDemo = false
                        this.searchEmpty = false
                    }

                    // Если поиск очищается
                    if(!this.$store.state.authorUsers.total_users && !this.searchQuery.length) {
                        // Скрытие демо данных
                        this.showDemo = false
                        this.searchEmpty = false
                    }

                    // Если поиск ничего не нашел
                    if(!this.$store.state.authorUsers.total_users && this.searchQuery.length) {
                        // Скрытие демо данных
                        this.showDemo = false
                        this.searchEmpty = true
                    }

                    this.sendRequest = false
                })
            }
        }
    }
}
</script>