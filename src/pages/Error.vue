<template>
    <!-- Страница ошибки -->
    <section class="error_page">
        <div class="cont">
            <!-- Страница ошибки - Картинка -->
            <img v-lazy="'/images/ic_error_404.png'" alt="" class="icon lazyload">

            <!-- Страница ошибки - Заголовок -->
            <div class="title">
                {{ $t('message.error_title_404') }}
            </div>

            <!-- Страница ошибки - Кнопка "назад" -->
            <button class="back_link" @click="$router.go(-1)">
                {{ $t('message.btn_back') }}
            </button>
        </div>
    </section>
</template>


<script>
export default {
    name: 'Error404'
}
</script>