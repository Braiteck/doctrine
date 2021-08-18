<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader"/>

    <section class="page_data" v-else>
        <!-- Тарифы -->
        <section class="tariffs block">
            <!-- Тарифы - Верхняя часть страницы -->
            <div class="block_head">
                <div class="title">
                    <!-- Тарифы - Верхняя часть страницы - Иконка -->
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_tariffs"></use></svg>

                    <!-- Тарифы - Верхняя часть страницы - Заголовок -->
                    {{ $t('message.page_title_tariffs') }}

                    <!-- Тарифы - Верхняя часть страницы - Описание -->
                    <div class="desc">{{ $t('message.tariffs_page_desc') }}</div>
                </div>
            </div>


            <!-- Тарифы - Текущие -->
            <div class="your_tariffs">
                <!-- Тарифы - Текущие - Список -->
                <CurrentTariffs />
            </div>


            <div class="all_list tab_container">
                <!-- Тарифы - Табы -->
                <div class="tabs">
                    <!-- Тарифы - Табы - "Пользователи" -->
                    <button :class="{ active: activeType == 'students' }" @click.prevent="activeType = 'students'" v-if="tariffs.students && tariffs.students.length">
                        {{ $t('message.tariffs_type_users') }}
                    </button>

                    <!-- Тарифы - Табы - "Хранилище" -->
                    <button :class="{ active: activeType == 'memory' }" @click.prevent="activeType = 'memory'" v-if="tariffs.memory && tariffs.memory.length">
                        {{ $t('message.tariffs_type_memory') }}
                    </button>

                    <!-- Тарифы - Табы - "Чаты" -->
                    <button :class="{ active: activeType == 'chats' }" @click.prevent="activeType = 'chats'" v-if="tariffs.chats && tariffs.chats.length">
                        {{ $t('message.tariffs_type_chats') }}
                    </button>
                </div>


                <!-- Тарифы - Моб. табы -->
                <div class="mob_tabs">
                    <!-- Тарифы - Моб. табы - Выбор -->
                    <v-select transition="fade" v-model.trim="activeType"
                        :options="mob_tabs_options" :reduce="period => period.value" :value="activeType">
                        <!-- Тарифы - Моб. табы - Выбранный элемент -->
                        <template #selected-option="{ label }">
                            <span>{{ label }}</span>
                        </template>

                        <!-- Тарифы - Моб. табы - Элемент выпад. списка -->
                        <template #option="option">
                            <span>{{ option.label }}</span>
                        </template>
                    </v-select>
                </div>


                <div class="tab_content" :class="{ active: activeType == 'students' }">
                    <!-- Тарифы - Описание -->
                    <div class="desc">
                        {{ $t('message.tariffs_tab1_desc') }}
                    </div>


                    <!-- Тарифы - Фильтр -->
                    <div class="filter">
                        <!-- Тарифы - Фильтр - Иконка -->
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_discount"></use></svg>

                        <!-- Тарифы - Фильтр - Выбор -->
                        <v-select transition="fade" v-model.trim="studentsPeriod"
                            :options="filter_options" :reduce="period => period.value" :value="studentsPeriod">
                            <!-- Тарифы - Фильтр - Выбранный элемент -->
                            <template #selected-option="{ label }">
                                <span>{{ label }}</span>
                            </template>

                            <!-- Тарифы - Фильтр - Элемент выпад. списка -->
                            <template #option="option">
                                <span>{{ option.label }}</span>
                            </template>
                        </v-select>
                    </div>


                    <!-- Тарифы - Список -->
                    <div class="row">
                        <!-- Тарифы - Тариф -->
                        <div class="tariff" v-for="(tariff, index) in tariffs.students" :key="`${index}`" :class="{ hot: tariff.action }">
                            <div v-if="tariff.id != current.students.id">
                                <!-- Тарифы - Тариф - Название -->
                                <div class="tariff_name">{{ tariff.name }}</div>

                                <!-- Тарифы - Тариф - Цена -->
                                <div class="price" v-if="tariff.price">
                                    <div class="old" v-if="tariff.discount_price">
                                        {{ tariff.discount_price.toLocaleString() }} <span class="currency">{{ $t('message.currency') }}</span>
                                    </div>

                                    {{ tariff.price.toLocaleString() }}<span class="currency">{{ $t('message.currency') }}</span>

                                    <div class="duration">
                                        <span v-if="studentsPeriod == 1">{{ $t('message.tariffs_tariff_duration') }}</span>
                                        <span v-else>{{ $t('message.for') }} {{ $tc('message.months', studentsPeriod) }}</span>
                                    </div>
                                </div>

                                <!-- Тарифы - Тариф - Цена бесплатно -->
                                <div class="price" v-else>
                                    <div class="free">{{ $t('message.free') }}</div>
                                </div>

                                <!-- Тарифы - Тариф - Лимит учеников -->
                                <div class="students">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_people"></use></svg>
                                    <span>{{ tariff.students.toLocaleString() }} {{ $t('message.tariffs_tariff_students') }}</span>
                                </div>

                                <!-- Тарифы - Тариф - Скидка -->
                                <div class="discount" v-if="tariff.action">{{ $t('message.tariffs_tariff_discount') }}</div>

                                <!-- Тарифы - Тариф - Кнопка -->
                                <button class="buy_btn" :class="{ active: !tariff.price }" @click.prevent="openBuyTariffModal(tariff)">
                                    <span v-if="tariff.price">{{ $t('message.btn_choose') }}</span>
                                    <span v-else>{{ $t('message.btn_get_free') }}</span>
                                </button>
                            </div>


                            <div v-else>
                                <!-- Тарифы - Тариф - Название -->
                                <div class="tariff_name">{{ tariff.name }}</div>

                                <!-- Тарифы - Тариф - Цена -->
                                <div class="price" v-if="tariff.price">
                                    <div class="old" v-if="tariff.discount_price">
                                        {{ tariff.discount_price.toLocaleString() }} <span class="currency">{{ $t('message.currency') }}</span>
                                    </div>

                                    {{ tariff.price.toLocaleString() }}<span class="currency">{{ $t('message.currency') }}</span>

                                    <div class="duration">
                                        <span v-if="studentsPeriod == 1">{{ $t('message.tariffs_tariff_duration') }}</span>
                                        <span v-else>{{ $t('message.for') }} {{ $tc('message.months', studentsPeriod) }}</span>
                                    </div>
                                </div>

                                <!-- Тарифы - Тариф - Цена бесплатно -->
                                <div class="price" v-else>
                                    <div class="free">{{ $t('message.free') }}</div>
                                </div>

                                <div class="info">
                                    <!-- Текущие тарифы - Тариф - Иконка -->
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_people"></use></svg>

                                    <!-- Текущие тарифы - Тариф - Название -->
                                    <div class="name">{{ $t('message.tariffs_current_students_name') }}:</div>

                                    <!-- Текущие тарифы - Тариф - Тотал -->
                                    <div class="count">
                                        <span class="current">{{ current.students.current }}</span> / <span class="total">{{ current.students.max.toLocaleString() }}</span>
                                    </div>
                                </div>

                                <!-- Текущие тарифы - Тариф - Кнопка "Продлить" -->
                                <button class="buy_btn extend_btn" @click.prevent="openBuyTariffModal(tariff)" v-if="current.students.to">
                                    {{ $t('message.btn_extend') }}
                                </button>

                                <!-- Текущие тарифы - Тариф - Срок действия -->
                                <div class="valid_until" v-else>
                                    {{ $t('message.tariffs_tariff_indefinitely') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="tab_content" :class="{ active: activeType == 'memory' }">
                    <!-- Тарифы - Описание -->
                    <div class="desc">
                        {{ $t('message.tariffs_tab2_desc') }}
                    </div>


                    <!-- Тарифы - Фильтр -->
                    <div class="filter">
                        <!-- Тарифы - Фильтр - Иконка -->
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_discount"></use></svg>

                        <!-- Тарифы - Фильтр - Выбор -->
                        <v-select transition="fade" v-model.trim="memoryPeriod"
                            :options="filter_options" :reduce="period => period.value" :value="memoryPeriod">
                            <!-- Тарифы - Фильтр - Выбранный элемент -->
                            <template #selected-option="{ label }">
                                <span>{{ label }}</span>
                            </template>

                            <!-- Тарифы - Фильтр - Элемент выпад. списка -->
                            <template #option="option">
                                <span>{{ option.label }}</span>
                            </template>
                        </v-select>
                    </div>


                    <!-- Тарифы - Список -->
                    <div class="row">
                        <!-- Тарифы - Тариф -->
                        <div class="tariff" v-for="(tariff, index) in tariffs.memory" :key="`${index}`" :class="{ hot: tariff.action }">
                            <div v-if="tariff.id != current.memory.id">
                                <!-- Тарифы - Тариф - Название -->
                                <div class="tariff_name">{{ tariff.name }}</div>

                                <!-- Тарифы - Тариф - Цена -->
                                <div class="price" v-if="tariff.price">
                                    <div class="old" v-if="tariff.discount_price">
                                        {{ tariff.discount_price.toLocaleString() }} <span class="currency">{{ $t('message.currency') }}</span>
                                    </div>

                                    {{ tariff.price.toLocaleString() }}<span class="currency">{{ $t('message.currency') }}</span>

                                    <div class="duration">
                                        <span v-if="memoryPeriod == 1">{{ $t('message.tariffs_tariff_duration') }}</span>
                                        <span v-else>{{ $t('message.for') }} {{ $tc('message.months', memoryPeriod) }}</span>
                                    </div>
                                </div>

                                <!-- Тарифы - Тариф - Цена бесплатно -->
                                <div class="price" v-else>
                                    <div class="free">{{ $t('message.free') }}</div>
                                </div>

                                <!-- Тарифы - Тариф - Лимит хранилища -->
                                <div class="memory">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_memory"></use></svg>
                                    <span>{{ (tariff.memory/Math.pow(1024, 3)).toFixed(0) }} {{ $t('message.tariffs_tariff_memory') }}</span>
                                </div>

                                <!-- Тарифы - Тариф - Скидка -->
                                <div class="discount" v-if="tariff.action">{{ $t('message.tariffs_tariff_discount') }}</div>

                                <!-- Тарифы - Тариф - Кнопка -->
                                <button class="buy_btn" :class="{ active: !tariff.price }" @click.prevent="openBuyTariffModal(tariff)">
                                    <span v-if="tariff.price">{{ $t('message.btn_choose') }}</span>
                                    <span v-else>{{ $t('message.btn_get_free') }}</span>
                                </button>
                            </div>


                            <div v-else>
                                <!-- Тарифы - Тариф - Название -->
                                <div class="tariff_name">{{ tariff.name }}</div>

                                <!-- Тарифы - Тариф - Цена -->
                                <div class="price" v-if="tariff.price">
                                    <div class="old" v-if="tariff.discount_price">
                                        {{ tariff.discount_price.toLocaleString() }} <span class="currency">{{ $t('message.currency') }}</span>
                                    </div>

                                    {{ tariff.price.toLocaleString() }}<span class="currency">{{ $t('message.currency') }}</span>

                                    <div class="duration">
                                        <span v-if="memoryPeriod == 1">{{ $t('message.tariffs_tariff_duration') }}</span>
                                        <span v-else>{{ $t('message.for') }} {{ $tc('message.months', memoryPeriod) }}</span>
                                    </div>
                                </div>

                                <!-- Тарифы - Тариф - Цена бесплатно -->
                                <div class="price" v-else>
                                    <div class="free">{{ $t('message.free') }}</div>
                                </div>

                                <div class="info">
                                    <!-- Текущие тарифы - Тариф - Иконка -->
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_memory"></use></svg>

                                    <!-- Текущие тарифы - Тариф - Название -->
                                    <div class="name">{{ $t('message.tariffs_current_memory_name') }}:</div>

                                    <!-- Текущие тарифы - Тариф - Тотал -->
                                    <div class="count">
                                        <span class="current">{{ parseFloat((current.memory.current/Math.pow(1024, 3)).toFixed(2)).toLocaleString() }} {{ $t('message.tariffs_tariff_memory') }}</span> /
                                        <span class="total">{{ parseFloat((current.memory.max/Math.pow(1024, 3)).toFixed(2)).toLocaleString() }} {{ $t('message.tariffs_tariff_memory') }}</span>
                                    </div>
                                </div>

                                <!-- Текущие тарифы - Тариф - Кнопка "Продлить" -->
                                <button class="buy_btn extend_btn" @click.prevent="openBuyTariffModal(tariff)" v-if="current.memory.to">
                                    {{ $t('message.btn_extend') }}
                                </button>

                                <!-- Текущие тарифы - Тариф - Срок действия -->
                                <div class="valid_until" v-else>
                                    {{ $t('message.tariffs_tariff_indefinitely') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="tab_content" :class="{ active: activeType == 'chats' }">
                    <!-- Тарифы - Описание -->
                    <div class="desc">
                        {{ $t('message.tariffs_tab3_desc') }}
                    </div>


                    <!-- Тарифы - Фильтр -->
                    <div class="filter">
                        <!-- Тарифы - Фильтр - Иконка -->
                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_discount"></use></svg>

                        <!-- Тарифы - Фильтр - Выбор -->
                        <v-select transition="fade" v-model.trim="chatsPeriod"
                            :options="filter_options" :reduce="period => period.value" :value="chatsPeriod">
                            <!-- Тарифы - Фильтр - Выбранный элемент -->
                            <template #selected-option="{ label }">
                                <span>{{ label }}</span>
                            </template>

                            <!-- Тарифы - Фильтр - Элемент выпад. списка -->
                            <template #option="option">
                                <span>{{ option.label }}</span>
                            </template>
                        </v-select>
                    </div>


                    <!-- Тарифы - Список -->
                    <div class="row">
                        <!-- Тарифы - Тариф -->
                        <div class="tariff" v-for="(tariff, index) in tariffs.chats" :key="`${index}`" :class="{ hot: tariff.action }">
                            <div v-if="tariff.id != current.chats.id">
                                <!-- Тарифы - Тариф - Название -->
                                <div class="tariff_name">{{ tariff.name }}</div>

                                <!-- Тарифы - Тариф - Цена -->
                                <div class="price" v-if="tariff.price">
                                    <div class="old" v-if="tariff.discount_price">
                                        {{ tariff.discount_price.toLocaleString() }} <span class="currency">{{ $t('message.currency') }}</span>
                                    </div>

                                    {{ tariff.price.toLocaleString() }}<span class="currency">{{ $t('message.currency') }}</span>

                                    <div class="duration">
                                        <span v-if="chatsPeriod == 1">{{ $t('message.tariffs_tariff_duration') }}</span>
                                        <span v-else>{{ $t('message.for') }} {{ $tc('message.months', chatsPeriod) }}</span>
                                    </div>
                                </div>

                                <!-- Тарифы - Тариф - Цена бесплатно -->
                                <div class="price" v-else>
                                    <div class="free">{{ $t('message.free') }}</div>
                                </div>

                                <!-- Тарифы - Тариф - Лимит чатов -->
                                <div class="chats">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_chats"></use></svg>
                                    <span>{{ tariff.chats.toLocaleString() }} {{ $t('message.tariffs_tariff_chats') }}</span>
                                </div>

                                <!-- Тарифы - Тариф - Скидка -->
                                <div class="discount" v-if="tariff.action">{{ $t('message.tariffs_tariff_discount') }}</div>

                                <!-- Тарифы - Тариф - Кнопка -->
                                <button class="buy_btn" :class="{ active: !tariff.price }" @click.prevent="openBuyTariffModal(tariff)">
                                    <span v-if="tariff.price">{{ $t('message.btn_choose') }}</span>
                                    <span v-else>{{ $t('message.btn_get_free') }}</span>
                                </button>
                            </div>


                            <div v-else>
                                <!-- Тарифы - Тариф - Название -->
                                <div class="tariff_name">{{ tariff.name }}</div>

                                <!-- Тарифы - Тариф - Цена -->
                                <div class="price" v-if="tariff.price">
                                    <div class="old" v-if="tariff.discount_price">
                                        {{ tariff.discount_price.toLocaleString() }} <span class="currency">{{ $t('message.currency') }}</span>
                                    </div>

                                    {{ tariff.price.toLocaleString() }}<span class="currency">{{ $t('message.currency') }}</span>

                                    <div class="duration">
                                        <span v-if="chatsPeriod == 1">{{ $t('message.tariffs_tariff_duration') }}</span>
                                        <span v-else>{{ $t('message.for') }} {{ $tc('message.months', chatsPeriod) }}</span>
                                    </div>
                                </div>

                                <!-- Тарифы - Тариф - Цена бесплатно -->
                                <div class="price" v-else>
                                    <div class="free">{{ $t('message.free') }}</div>
                                </div>

                                <div class="info">
                                    <!-- Текущие тарифы - Тариф - Иконка -->
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_chats"></use></svg>

                                    <!-- Текущие тарифы - Тариф - Название -->
                                    <div class="name">{{ $t('message.tariffs_current_chats_name') }}:</div>

                                    <!-- Текущие тарифы - Тариф - Тотал -->
                                    <div class="count">
                                        <span class="current">{{ current.chats.current }}</span> / <span class="total">{{ current.chats.max.toLocaleString() }}</span>
                                    </div>
                                </div>

                                <!-- Текущие тарифы - Тариф - Кнопка "Продлить" -->
                                <button class="buy_btn extend_btn" @click.prevent="openBuyTariffModal(tariff)" v-if="current.chats.to">
                                    {{ $t('message.btn_extend') }}
                                </button>

                                <!-- Текущие тарифы - Тариф - Срок действия -->
                                <div class="valid_until" v-else>
                                    {{ $t('message.tariffs_tariff_indefinitely') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- Всплыв. окно покупки тарифа -->
        <transition name="fade">
        <BuyTariffModal v-if="showBuyTariffModal" @closeModalEvent='closeBuyTariffModal' :tariffReq="buyTariffInfo" />
        </transition>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/tariffs.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import CurrentTariffs from "@/components/CurrentTariffs.vue"
import BuyTariffModal from "@/components/modal/BuyTariff.vue"

export default {
    name: 'AuthorTariffs',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_tariffs')
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
        CurrentTariffs, // Текущие тарифы
        BuyTariffModal // Всплыв. окно покупки тарифа
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            activeType: 'students',
            mob_tabs_options: [
                { value: 'students', label: this.$i18n.t('message.tariffs_type_users') },
                { value: 'memory', label: this.$i18n.t('message.tariffs_type_memory') },
                { value: 'chats', label: this.$i18n.t('message.tariffs_type_chats') }
            ],
            filter_options: [
                { value: 1, label: this.$i18n.t('message.on') + ' ' + this.$i18n.tc('message.months', 1) },
                { value: 3, label: this.$i18n.t('message.on') + ' ' + this.$i18n.tc('message.months', 3) + ' ' + this.$i18n.t('message.tariffs_filter_period3_percents') },
                { value: 6, label: this.$i18n.t('message.on') + ' ' + this.$i18n.tc('message.months', 6) + ' ' + this.$i18n.t('message.tariffs_filter_period6_percents') },
                { value: 12, label: this.$i18n.t('message.on') + ' ' + this.$i18n.tc('message.months', 12) + ' ' + this.$i18n.t('message.tariffs_filter_period12_percents') }
            ],
            studentsPeriod: 1,
            memoryPeriod: 1,
            chatsPeriod: 1,
            tariffs: {},
            showBuyTariffModal: false,
            buyTariffInfo: {},
            current: {}
        }
    },

    beforeCreate () {
        // Загрузка тарифов
        var tariffsPromise = this.$store.dispatch('authorTariffs/loadTariffs').then(() => {
            // Запись данных
            this.tariffs = this.$store.state.authorTariffs.tariffs
        })


        // Загрузка текущих тарифов
        var currentPromise = this.$store.dispatch('authorTariffs/loadCurrentTariffs').then(() => {
            // Запись данных
            this.current = this.$store.state.authorTariffs.current
        })

        Promise.all([tariffsPromise, currentPromise]).then(() => {
            // Прелоадер
            this.preloader = false
        })
    },

    methods: {
        // Показаться всплыв. окно добавления урока
        openBuyTariffModal (tariff) {
            this.buyTariffInfo = { id: tariff.id, month: this[this.activeType+'Period'] }

            this.showBuyTariffModal = true
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно добавления урока
        closeBuyTariffModal () {
            this.showBuyTariffModal = false
            document.body.classList.remove('lock')
        }
    },

    watch: {
        // Смена периода тарифов пользователей
        'studentsPeriod': function () {
            // Запрос на сервер
            this.$store.dispatch('authorTariffs/loadStudentsTariffs', {
                month: this.studentsPeriod,
                type: 'students'
            }).then(() => {
                // Запись данных
                this.tariffs.students = this.$store.state.authorTariffs.tariffs.students
            })
        },


        // Смена периода тарифов хранилища
        'memoryPeriod': function () {
            // Запрос на сервер
            this.$store.dispatch('authorTariffs/loadMemoryTariffs', {
                month: this.memoryPeriod,
                type: 'memory'
            }).then(() => {
                // Запись данных
                this.tariffs.memory = this.$store.state.authorTariffs.tariffs.memory
            })
        },


        // Смена периода тарифов чатов
        'chatsPeriod': function () {
            // Запрос на сервер
            this.$store.dispatch('authorTariffs/loadChatsTariffs', {
                month: this.chatsPeriod,
                type: 'chats'
            }).then(() => {
                // Запись данных
                this.tariffs.chats = this.$store.state.authorTariffs.tariffs.chats
            })
        }
    }
}
</script>