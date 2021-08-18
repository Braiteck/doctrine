<template>
    <!-- Подвал -->
    <footer>
        <div class="cont row">
            <!-- Подвал - Копирайт -->
            <div class="copyright" v-html="$t('message.footer_copyright')"></div>


            <!-- Подвал - Ссылки -->
            <div class="links row">
                <div><a href="/docs/contractOfferDoctrine.pdf" open target="_blank" rel="noopener nofollow">
                    {{ $t('message.footer_link_offer') }}
                </a></div>

                <div><a href="/docs/confDoctrine.pdf" open target="_blank" rel="noopener nofollow">
                    {{ $t('message.footer_link_privacy_policy') }}
                </a></div>

                <div><a href="https://chmerev.com/doctrine" target="_blank" rel="noopener nofollow">
                    {{ $t('message.footer_link_help') }}
                </a></div>

                <div><router-link to="/register">
                    {{ $t('message.footer_link_free') }}
                </router-link></div>
            </div>


            <!-- Подвал - Соц. сети -->
            <div class="socials row">
                <a href="/" target="_blank" rel="noopener nofollow">
                    <svg class="ic_facebook"><use xlink:href="/images/socials.svg#ic_facebook"></use></svg>
                </a>

                <a href="/" target="_blank" rel="noopener nofollow">
                    <svg class="ic_vkontakte"><use xlink:href="/images/socials.svg#ic_vkontakte"></use></svg>
                </a>

                <a href="/" target="_blank" rel="noopener nofollow">
                    <svg class="ic_youtube"><use xlink:href="/images/socials.svg#ic_youtube"></use></svg>
                </a>

                <a href="/" target="_blank" rel="noopener nofollow">
                    <svg class="ic_instagram"><use xlink:href="/images/socials.svg#ic_instagram"></use></svg>
                </a>
            </div>
        </div>
    </footer>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/footer.css'

export default {
    name: 'Footer'
}
</script>
