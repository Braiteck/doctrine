<template>
    <!-- Бан -->
    <div class="auth">
        <!-- Бан - Заголовок -->
        <div class="title">
            {{ $t('message.auth_lock_title') }}
        </div>


        <div class="lock_data">
            <!-- Бан - Иконка -->
            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_regret"></use></svg>

            <!-- Бан - Текст -->
            <div class="text">
                {{ $t('message.auth_lock_desc') }}
            </div>

            <!-- Бан - Таймер -->
            <countdown :end-time="end_timer" class="timer">
                <template v-slot:process="timer">
                    <!-- Бан - Таймер - Минуты -->
                    <div class="minutes">
                        <div class="val">{{ timer.timeObj.m }}</div>
                        <div class="name">{{ $t('message.time_minutes') }}</div>
                    </div>

                    <!-- Бан - Таймер - разделитель -->
                    <div class="sep">:</div>

                    <!-- Бан - Таймер - Секунды -->
                    <div class="seconds">
                        <div class="val">{{ timer.timeObj.s }}</div>
                        <div class="name">{{ $t('message.time_seconds') }}</div>
                    </div>
                </template>
            </countdown>


            <!-- Бан - Кнопка на главную -->
            <a :href="siteUrl" class="link">
                {{ $t('message.btn_go_home') }}
            </a>
        </div>
    </div>
</template>


<script>
export default {
    name: 'LockAuth',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_lock_auth')
        }
    },

    // Локальные данные
    data () {
        return {
            siteUrl: process.env.VUE_APP_SITE_URL,
            end_timer: new Date().getTime() + 3.6e+6
        }
    }
}
</script>