<template>
    <!-- Ссылка не действительна -->
    <div class="auth">
        <!-- Ссылка не действительна - Заголовок -->
        <div class="title">
            {{ $t('message.auth_link_not_valid_title') }}
        </div>


        <div class="not_valid_data">
            <!-- Ссылка не действительна - Иконка -->
            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_regret"></use></svg>

            <!-- Ссылка не действительна - Текст -->
            <div class="text">
                {{ $t('message.auth_not_valid_desc') }}
            </div>

            <!-- Ссылка не действительна - Кнопка на восстановление пароля -->
            <router-link to="/recovery" class="link">
                {{ $t('message.btn_new_recovery') }}
            </router-link>
        </div>
    </div>
</template>


<script>
export default {
    name: 'LinkNotValid',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_link_not_valid')
        }
    }
}
</script>