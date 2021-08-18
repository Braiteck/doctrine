<template>
    <!-- Восстановление пароля -->
    <div class="auth">
        <!-- Восстановление пароля - Заголовок -->
        <div class="title">
            {{ $t('message.auth_recovery_title') }}
        </div>


        <div class="success_mes">
            <!-- Восстановление пароля - Иконка -->
            <svg class="icon">
                <use xlink:href="/images/sprite.svg#ic_success"></use>
            </svg>

            <!-- Восстановление пароля - Текст -->
            <div class="text" v-html="$t('message.auth_recovery_desc', { email: email })"></div>

            <!-- Восстановление пароля - Кнопка на главную -->
            <a :href="siteUrl" class="link">
                {{ $t('message.btn_go_home') }}
            </a>
        </div>
    </div>
</template>


<script>
export default {
    name: 'RecoverySuccess',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_recovery')
        }
    },

    // Локальные данные
    data () {
        return {
            siteUrl: process.env.VUE_APP_SITE_URL,
            email: this.$store.state.user.recoveryEmail
        }
    },

    mounted() {
        // Обнуляем данные что бы при обновлении страницы небыло доступа
        this.$store.state.user.isRecovery = false
        this.$store.state.user.recoveryEmail = null
    }
}
</script>