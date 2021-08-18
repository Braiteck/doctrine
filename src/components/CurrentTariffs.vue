<template>
    <div class="list">
        <!-- Текущие тарифы - Тариф -->
        <div class="tariff students" v-if="tariffs.students">
            <div class="head">
                <!-- Текущие тарифы - Тариф - Иконка -->
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_people"></use></svg>

                <!-- Текущие тарифы - Тариф - Название -->
                <div class="name">{{ $t('message.tariffs_current_students_name') }}:</div>

                <!-- Текущие тарифы - Тариф - Тотал -->
                <div class="count">
                    <span class="current">{{ tariffs.students.current }}</span> / <span class="total">{{ tariffs.students.max.toLocaleString() }}</span>
                </div>
            </div>


            <!-- Текущие тарифы - Тариф - Прогресс -->
            <div class="points">
                <!-- Текущие тарифы - Тариф - Серые точки -->
                <div class="line">
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>

                <!-- Текущие тарифы - Тариф - Цветные точки -->
                <div class="progress"
                    :style="`width: ${tariffs.students.current*100/tariffs.students.max}%`"
                    :class="{ danger: tariffs.students.current*100/tariffs.students.max > 79 }">
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
            </div>


            <!-- Текущие тарифы - Тариф - Срок действия -->
            <div class="valid_until">
                <!-- Текущие тарифы - Тариф - Срок действия - Название -->
                <div v-if="tariffs.students.to">{{ $t('message.valid_until') }}:</div>
                <div v-else>{{ $t('message.tariffs_current_free') }}:</div>

                <!-- Текущие тарифы - Тариф - Срок действия - Дата -->
                <div class="date" v-if="tariffs.students.to">
                    {{ tariffs.students.to }} <span class="rate">({{ $tc('message.days', tariffs.students.rest) }})</span>
                </div>

                <!-- Текущие тарифы - Тариф - Срок действия - Бесконечно -->
                <div class="infinity" v-else>
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_infinity"></use></svg>
                </div>
            </div>


            <!-- Текущие тарифы - Тариф - Срок истекает -->
            <div class="finish" v-if="tariffs.students.deleted_at">
                <span v-html="$t('message.tariffs_finish_students', {days: $tc('message.days2', tariffs.students.deleted_at)})"></span>
            </div>


            <!-- Текущие тарифы - Тариф - Достигнут лимит -->
            <div class="limit_reached" v-if="tariffs.students.current == tariffs.students.max">
                <span v-html="$t('message.tariffs_limit_reached')"></span>
            </div>
        </div>


        <!-- Текущие тарифы - Тариф -->
        <div class="tariff memory" v-if="tariffs.memory">
            <div class="head">
                <!-- Текущие тарифы - Тариф - Иконка -->
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_memory"></use></svg>

                <!-- Текущие тарифы - Тариф - Название -->
                <div class="name">{{ $t('message.tariffs_current_memory_name') }}:</div>

                <!-- Текущие тарифы - Тариф - Тотал -->
                <div class="count">
                    <span class="current">{{ parseFloat((tariffs.memory.current/Math.pow(1024, 3)).toFixed(2)).toLocaleString() }} {{ $t('message.tariffs_tariff_memory') }}</span> /
                    <span class="total">{{ parseFloat((tariffs.memory.max/Math.pow(1024, 3)).toFixed(2)).toLocaleString() }} {{ $t('message.tariffs_tariff_memory') }}</span>
                </div>
            </div>

            <!-- Текущие тарифы - Тариф - Прогресс -->
            <div class="points">
                <!-- Текущие тарифы - Тариф - Серые точки -->
                <div class="line">
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>

                <!-- Текущие тарифы - Тариф - Цветные точки -->
                <div class="progress"
                    :style="`width: ${tariffs.memory.current*100/tariffs.memory.max}%`"
                    :class="{ danger: tariffs.memory.current*100/tariffs.memory.max > 79 }">
                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
            </div>

            <!-- Текущие тарифы - Тариф - Срок действия -->
            <div class="valid_until">
                <!-- Текущие тарифы - Тариф - Срок действия - Название -->
                <div v-if="tariffs.memory.to">{{ $t('message.valid_until') }}:</div>
                <div v-else>{{ $t('message.tariffs_current_free') }}:</div>

                <!-- Текущие тарифы - Тариф - Срок действия - Дата -->
                <div class="date" v-if="tariffs.memory.to">
                    {{ tariffs.memory.to }} <span class="rate">({{ $tc('message.days', tariffs.memory.rest) }})</span>
                </div>

                <!-- Текущие тарифы - Тариф - Срок действия - Бесконечно -->
                <div class="infinity" v-else>
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_infinity"></use></svg>
                </div>
            </div>


            <!-- Текущие тарифы - Тариф - Достигнут лимит -->
            <div class="finish" v-if="tariffs.memory.deleted_at">
                <span v-html="$t('message.tariffs_finish_memory', {days: $tc('message.days2', tariffs.memory.deleted_at)})"></span>
            </div>


            <!-- Текущие тарифы - Тариф - Достигнут лимит -->
            <div class="limit_reached" v-if="(tariffs.memory.max - tariffs.memory.current) <= tariffs.memory.max/100">
                <span v-html="$t('message.tariffs_limit_reached')"></span>
            </div>
        </div>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/currentTariffs.css'

export default {
    name: 'currentTariffs',

    // Локальные данные
    data () {
        return {
            tariffs: {}
        }
    },

    beforeCreate () {
        // Загрузка текущих тарифов
        this.$store.dispatch('authorTariffs/loadCurrentTariffs').then(() => {
            // Запись данных
            this.tariffs = this.$store.state.authorTariffs.current
        })
    }
}
</script>