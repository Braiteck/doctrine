<template>
    <!-- Подвал -->
    <footer>
        <div class="row">
            <!-- Подвал - Ссылки -->
            <div class="links row">
                <div><a href="/docs/contractOfferDoctrine.pdf" target="_blank" rel="noopener nofollow">
                    {{ $t('message.footer_link_offer') }}
                </a></div>

                <div><a href="/docs/confDoctrine.pdf" open target="_blank" rel="noopener nofollow">
                    {{ $t('message.footer_link_privacy_policy') }}
                </a></div>

                <div><a href="https://chmerev.com/doctrine" target="_blank" rel="noopener nofollow">
                    {{ $t('message.footer_link_help') }}
                </a></div>
            </div>


            <!-- Подвал - Копирайт -->
            <div class="copyright" v-html="$t('message.footer_copyright')"></div>
        </div>
    </footer>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/footer.css'

export default {
    name: 'FooterAccount'
}
</script>
