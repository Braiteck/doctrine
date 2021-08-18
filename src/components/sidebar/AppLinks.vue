<template>
    <!-- Ссылки на приложение -->
    <section class="app_links">
        <!-- Ссылки на приложение - Ссылка -->
        <div><a href="/" open target="_blank" rel="noopener nofollow">
            <!-- Ссылки на приложение - Ссылка - Иконка -->
            <div class="icon ic_apple">
                <svg><use xlink:href="/images/sprite.svg#ic_apple"></use></svg>
            </div>

            <!-- Ссылки на приложение - Ссылка - Текст -->
            <div>{{ $t('message.app_download_apple') }}</div>
        </a></div>

        <!-- Ссылки на приложение - Ссылка -->
        <div><a href="/" target="_blank" rel="noopener nofollow">
            <!-- Ссылки на приложение - Ссылка - Иконка -->
            <div class="icon ic_android">
                <svg><use xlink:href="/images/sprite.svg#ic_android"></use></svg>
            </div>

            <!-- Ссылки на приложение - Ссылка - Текст -->
            <div>{{ $t('message.app_download_google') }}</div>
        </a></div>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/sidebar/appLinks.css'

export default {
    name: 'AppLinks'
}
</script>