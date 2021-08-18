<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal order_modal" v-if="tariff">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="modal_title">
                    {{ $t('message.modal_title_buy_tariff') }}
                </div>


                <!-- Вспдыв. окно - Тариф -->
                <div class="tariff">
                    <!-- Вспдыв. окно - Тариф - Иконка -->
                    <img v-lazy="'/images/ic_order.svg'" alt="" class="icon lazyload">

                    <div class="head">
                        <!-- Вспдыв. окно - Тариф - Название -->
                        <div class="name">{{ tariff.name }}</div>

                        <!-- Вспдыв. окно - Тариф - Продолжительность -->
                        <div class="duration">
                            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_time"></use></svg>
                            <span>{{ $tc('message.months', period) }}</span>
                        </div>
                    </div>

                    <!-- Вспдыв. окно - Тариф - Лимит учеников -->
                    <div class="students" v-if="tariff.students">
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_people"></use></svg>
                        <span>{{ tariff.students.toLocaleString() }} {{ $t('message.tariffs_tariff_students') }}</span>
                    </div>

                    <!-- Вспдыв. окно - Тариф - Лимит хранилища -->
                    <div class="memory" v-if="tariff.memory">
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_memory"></use></svg>
                        <span>{{ (tariff.memory/Math.pow(1024, 3)).toFixed(0) }} {{ $t('message.tariffs_tariff_memory') }}</span>
                    </div>

                    <!-- Вспдыв. окно - Тариф - Лимит чатов -->
                    <div class="chats" v-if="tariff.chats">
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_chats"></use></svg>
                        <span>{{ tariff.chats.toLocaleString() }} {{ $t('message.tariffs_tariff_chats') }}</span>
                    </div>
                </div>


                <!-- Вспдыв. окно - Способ оплаты -->
                <div class="payment_method">
                    <!-- Вспдыв. окно - Способ оплаты - Заголовок -->
                    <div class="title">{{ $t('message.order_payment_method_title') }}:</div>

                    <!-- Вспдыв. окно - Способ оплаты - Способ -->
                    <div class="method" v-for="(method, index) in payment_methods" :key="`${index}`">
                        <input type="radio" :value="`${method.id}`" name="payment_method" :id="`payment_method${method.id}`" v-model="payment_method">
                        <label :for="`payment_method${method.id}`">
                            <!-- Вспдыв. окно - Способ оплаты - Способ - Иконка -->
                            <div class="icon">
                                <img v-lazy="imagesUrl + method.image" alt="" class="lazyload">
                            </div>

                            <!-- Вспдыв. окно - Способ оплаты - Способ - Название -->
                            <div class="name">{{ method.name }}</div>
                        </label>
                    </div>
                </div>


                <!-- Вспдыв. окно - Промокод -->
                <div class="promocode">
                    <form @submit.prevent="onPromocodeSubmit" class="form" :class="{ processing: processing }" v-if="!promocodeEnable">
                        <!-- Вспдыв. окно - Промокод - Поле ввода -->
                        <input type="text" class="input" v-model.trim="promocode"
                            @input="$v.promocode.$touch"
                            :placeholder="$t('message.form_placeholder_promocode')">

                        <!-- Вспдыв. окно - Промокод - Кнопка применения -->
                        <button type="submit" class="btn" :disabled="$v.$invalid">
                            {{ $t('message.btn_apply') }}
                        </button>
                    </form>

                    <!-- Вспдыв. окно - Промокод - Применённый -->
                    <div v-if="promocodeEnable">{{ $t('message.order_promocode_title') }}</div>
                    <div v-if="promocodeEnable" class="code">{{ promocode }}</div>
                </div>


                <!-- Вспдыв. окно - Итоговая стоимость -->
                <div class="total_info">
                    <!-- Вспдыв. окно - Итоговая стоимость - Заголовок -->
                    <div>{{ $t('message.order_total_title') }}:</div>

                    <!-- Вспдыв. окно - Итоговая стоимость - Стоимость -->
                    <div class="price">
                        {{ tariff.price.toLocaleString() }} <span class="currency">{{ $t('message.currency') }}</span>
                    </div>

                    <!-- Вспдыв. окно - Итоговая стоимость - Скидка -->
                    <div class="discount" v-if="promocodeEnable">
                        {{ $t('message.order_discount_title') }}:
                        <span class="price">{{ discount_price.toLocaleString() }} <span class="currency">{{ $t('message.currency') }}</span></span>
                    </div>
                </div>


                <!-- Вспдыв. окно - Кнопка отправки -->
                <div class="submit" @click.prevent="onSubmit">
                    <button class="submit_btn">
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_tariffs"></use></svg>
                        <span>{{ $t('message.btn_order') }}</span>
                    </button>
                </div>


                <!-- Прелоадер -->
                <Preloader v-if="preloader" />
            </section>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/modal/order.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"

// Импорт валидаторов
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
    name: 'BuyTariffModal',

    // Данные из вне
    props: ['tariffReq'],

    // Компоненты
    components: {
        Preloader // Прелоадер
    },

    // Локальные данные
    data () {
        return {
            preloader: false,
            processing: false,
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            apiUrl: process.env.VUE_APP_API_URL,
            period: 1,
            tariff: false,
            payment_methods: [],
            promocode: '',
            promocodeId: 0,
            promocodeEnable: false,
            discount_price: 0
        }
    },

    // Валидация
    validations: {
        promocode: {
            required,
            maxLength: maxLength(200)
        }
    },

    beforeCreate () {
        // Загрузка данных о тарифе
        if(this.$options.propsData.tariffReq) {
            this.$store.dispatch('authorTariffs/loadTariffsById', this.$options.propsData.tariffReq).then(res => {
                if(res.success) {
                    // Запись данных
                    this.period = this.$options.propsData.tariffReq.month

                    this.tariff = res.data.tariff

                    this.payment_methods = res.data.payments_methods
                    this.payment_method = this.payment_methods[0].id
                }
            })
        }
    },

    methods: {
        // Закрыть всплыв. окно
        closeModal() {
            this.$emit('closeModalEvent')
        },


        // Применение промокода
        onPromocodeSubmit () {
            // Старт прогрессбара
            this.$Progress.start()

            // Запрос на сервер
            this.$store.dispatch('authorTariffs/applyingPromocode', {
                promo_code: this.promocode,
                price: this.tariff.price
            }).then(res => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Ошибка запроса на сервер
                if(res.error) {
                    // Показ сообщения об ошибке
                    this.$toast.error(this.$t('message.notification_error_promocode'))
                }

                // Успешный запрос на сервер
                if(res.success) {
                    // Показ сообщения об успехе
                    this.$toast.success(this.$t('message.notification_success_promocode'))

                    // Отображение данных о промокоде
                    this.promocodeEnable = true

                    // Цена после применение промокода
                    this.tariff.price = res.data.price
                    this.discount_price = res.data.discount_price
                    this.promocodeId = res.data.id
                }
            })
        },


        // Отправка формы
        onSubmit () {
            // Старт прогрессбара
            this.$Progress.start()

            // Прелоадер
            this.preloader = true

            let data = {
                id: this.tariff.id,
                month: this.period,
                payment_id: this.payment_method,
                cookie: this.$cookies.get('_ga').split('.')[3],
                return_url: `${this.apiUrl}/author/order_history`,
                promo_code_id: this.promocodeId
            }

            // Запрос на сервер
            this.$store.dispatch('authorTariffs/buyTariff', data).then(res => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Ошибка запроса на сервер
                if(res.error) {
                    // Показ сообщения об ошибке
                    this.$toast.error(this.$t('message.notification_error_buy_tariff'))

                    // Прелоадер
                    this.preloader = false
                }

                // Успешный запрос на сервер
                if(res.success) {
                    // Редирект на страницу оплаты
                    window.location = res.data
                }
            })
        }
    }
}
</script>