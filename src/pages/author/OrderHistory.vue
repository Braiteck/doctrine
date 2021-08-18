<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Транзакции -->
        <section class="transactions block">
            <!-- Транзакции - Верхняя часть страницы -->
            <div class="block_head">
                <div class="title">
                    <!-- Транзакции - Верхняя часть страницы - Иконка -->
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_integration"></use></svg>

                    <!-- Транзакции - Верхняя часть страницы - Заголовок -->
                    {{ $t('message.page_title_order_history') }}
                </div>
            </div>


            <!-- Сообщение если нет ниодного пользователя -->
            <div class="empty_message" v-if="$store.state.authorOrderHistory.total_orders == 0">
                <img v-lazy="'/images/ic_empty_message.svg'" alt="" class="lazyload">

                <div class="title"  v-html="$t('message.empty_message_author_order_history')"></div>
            </div>


            <div class="data" v-else>
                <!-- Транзакции - Заголовки -->
                <div class="titles">
                    <div class="col_number">{{ $t('message.orders_col_number') }}</div>
                    <div class="col_tariff">{{ $t('message.orders_col_tariff') }}</div>
                    <div class="col_type">{{ $t('message.orders_col_type') }}</div>
                    <div class="col_duration">{{ $t('message.orders_col_duration') }}</div>
                    <div class="col_promocode">{{ $t('message.orders_col_promocode') }}</div>
                    <div class="col_price">{{ $t('message.orders_col_price') }}</div>
                    <div class="col_status">{{ $t('message.orders_col_status') }}</div>
                    <div class="col_date">{{ $t('message.orders_col_date') }}</div>
                </div>


                <!-- Транзакции - Список -->
                <div class="list">
                    <!-- Транзакции - Список - Транзакция -->
                    <div class="transaction" v-for="(order, index) in orders" :key="`${index}`">
                        <!-- Транзакции - Список - Транзакция - Номер заказа -->
                        <div class="col_number">№ {{ order.id }}</div>

                        <!-- Транзакции - Список - Транзакция - Тариф -->
                        <div class="col_tariff">{{ order.tariff_name }}</div>

                        <!-- Транзакции - Список - Транзакция - Тип -->
                        <div class="col_type">
                            <span v-if="order.tariff_type == 'students'">{{ $t('message.tariffs_type_users') }}</span>
                            <span v-if="order.tariff_type == 'memory'">{{ $t('message.tariffs_type_memory') }}</span>
                            <span v-if="order.tariff_type == 'chats'">{{ $t('message.tariffs_type_chats') }}</span>
                        </div>

                        <!-- Транзакции - Список - Транзакция - Срок -->
                        <div class="col_duration">{{ $tc('message.months', order.month) }}</div>

                        <!-- Транзакции - Список - Транзакция - Промокод -->
                        <div class="col_promocode">{{ order.promo_code }}</div>

                        <!-- Транзакции - Список - Транзакция - Стоимость -->
                        <div class="col_price">
                            {{ order.price.toLocaleString() }} <span class="currency">{{ $t('message.currency') }}</span>
                        </div>

                        <!-- Транзакции - Список - Транзакция - Статус заказа -->
                        <div class="col_status">
                            <span v-if="order.status == 0" :class="{ waiting: order.status == 0 }">{{ $t('message.orders_status0') }}</span>
                            <span v-if="order.status == 1" :class="{ success: order.status == 1 }">{{ $t('message.orders_status1') }}</span>
                            <span v-if="order.status == 2" :class="{ error: order.status == 2 }">{{ $t('message.orders_status2') }}</span>
                        </div>

                        <!-- Транзакции - Список - Транзакция - Дата заказа -->
                        <div class="col_date">{{ order.date }}</div>
                    </div>
                </div>


                <!-- Транзакции - Моб. список -->
                <div class="list mob_list accordion">
                    <!-- Транзакции - Моб. список - Транзакция -->
                    <div class="transaction item" v-for="(order, index) in orders" :key="`${index}`">
                        <div class="head" v-accordion>
                            <!-- Транзакции - Список - Транзакция - Иконка -->
                            <svg class="icon check" v-if="order.status == 1"><use xlink:href="/images/sprite.svg#ic_check"></use></svg>
                            <svg class="icon" v-if="order.status == 0"><use xlink:href="/images/sprite.svg#ic_time"></use></svg>
                            <svg class="icon" v-if="order.status == 2"><use xlink:href="/images/sprite.svg#ic_time"></use></svg>

                            <!-- Транзакции - Моб. список - Транзакция - Номер заказа -->
                            <div class="number">№ {{ order.id }}</div>

                            <div class="arr"></div>
                        </div>


                        <div class="data hide">
                            <div class="features">
                                <!-- Транзакции - Моб. список - Транзакция - Тариф -->
                                <div>
                                    <div class="name">{{ $t('message.orders_col_tariff') }}</div>
                                    <div class="val">{{ order.tariff_name }}</div>
                                </div>

                                <!-- Транзакции - Моб. список - Транзакция - Тип -->
                                <div>
                                    <div class="name">{{ $t('message.orders_col_type') }}</div>
                                    <div class="val">
                                        <span v-if="order.tariff_type == 'students'">{{ $t('message.tariffs_type_users') }}</span>
                                        <span v-if="order.tariff_type == 'memory'">{{ $t('message.tariffs_type_memory') }}</span>
                                        <span v-if="order.tariff_type == 'chats'">{{ $t('message.tariffs_type_chats') }}</span>
                                    </div>
                                </div>

                                <!-- Транзакции - Моб. список - Транзакция - Срок -->
                                <div>
                                    <div class="name">{{ $t('message.orders_col_duration') }}</div>
                                    <div class="val">{{ $tc('message.months', order.month) }}</div>
                                </div>

                                <!-- Транзакции - Моб. список - Транзакция - Промокод -->
                                <div>
                                    <div class="name">{{ $t('message.orders_col_promocode') }}</div>
                                    <div class="val">{{ order.promo_code }}</div>
                                </div>

                                <!-- Транзакции - Моб. список - Транзакция - Стоимость -->
                                <div>
                                    <div class="name">{{ $t('message.orders_col_price') }}</div>
                                    <div class="val">
                                        {{ order.price.toLocaleString() }} <span class="currency">{{ $t('message.currency') }}</span>
                                    </div>
                                </div>

                                <!-- Транзакции - Моб. список - Транзакция - Статус заказа -->
                                <div>
                                    <div class="name">{{ $t('message.orders_col_status') }}</div>
                                    <div class="val status">
                                        <span v-if="order.status == 0" :class="{ waiting: order.status == 0 }">{{ $t('message.orders_status0') }}</span>
                                        <span v-if="order.status == 1" :class="{ success: order.status == 1 }">{{ $t('message.orders_status1') }}</span>
                                        <span v-if="order.status == 2" :class="{ error: order.status == 2 }">{{ $t('message.orders_status2') }}</span>
                                    </div>
                                </div>

                                <!-- Транзакции - Моб. список - Транзакция - Дата заказа -->
                                <div>
                                    <div class="name">{{ $t('message.orders_col_date') }}</div>
                                    <div class="val">{{ order.date }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Транзакции - Список - Нижняя панель -->
                <div class="bottom">
                    <!-- Транзакции - Список - Нижняя панель - Тотал -->
                    <div class="shown">
                        {{ $t('message.orders_bottom_show') }}
                        <span>{{ orders.length }}</span>
                        {{ $t('message.from') }}
                        <span>{{ $store.state.authorOrderHistory.total_orders }}</span>
                    </div>

                    <!-- Транзакции - Список - Нижняя панель - Переход на страницу -->
                    <div class="go_to">
                        {{ $t('message.pages') }}
                        <input type="text" class="input" v-model.trim="currentPage" @input="sendRequest = true">
                        {{ $t('message.from') }}
                        {{ totalPages }}
                    </div>

                    <!-- Транзакции - Список - Нижняя панель - Кнопки -->
                    <button class="prev" v-if="currentPage > 1" @click.prevent="prevPage"></button>
                    <button class="next" v-if="currentPage < totalPages" @click.prevent="nextPage"></button>
                </div>
            </div>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/orderHistory.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"

export default {
    name: 'AuthorOrderHistory',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_order_history')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            sendRequest: false,
            currentPage: 1,
            totalPages: 1,
            orders: []
        }
    },

    beforeCreate () {
        // Загрузка транзакция
        this.$store.dispatch('authorOrderHistory/loadOrders', 0).then(() => {
            // Запись данных
            this.orders = this.$store.state.authorOrderHistory.data

            // Всего страниц
            this.totalPages = Math.ceil(this.$store.state.authorOrderHistory.total_orders / this.$store.state.authorOrderHistory.limit)

            // Прелоадер
            this.preloader = false
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
        }
    },

    watch: {
        // Смена страницы
        'sendRequest': function () {
            if(this.sendRequest){
                // Загрузка пользователей
                this.$store.dispatch('authorOrderHistory/loadOrders', ((this.currentPage-1)*this.$store.state.authorOrderHistory.limit)).then(() => {
                    // Запись данных
                    this.orders = this.$store.state.authorOrderHistory.data

                    // Всего страниц
                    this.totalPages = Math.ceil(this.$store.state.authorOrderHistory.total_orders / this.$store.state.authorOrderHistory.limit)

                    this.sendRequest = false
                })
            }
        }
    }
}
</script>