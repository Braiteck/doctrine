import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './locale'

// Импорт плагинов
import VueLazyload from 'vue-lazyload'
import VueMeta from 'vue-meta'
import Vuelidate from 'vuelidate'
import VueProgressBar from 'vue-progressbar'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueToast from 'vue-toast-notification'
import VueAwesomeCountdown from 'vue-awesome-countdown'
import vSelect from 'vue-select'
import Echo from "laravel-echo"
import VueTimeago from 'vue-timeago'
import BackToTop from 'vue-backtotop'
import TextareaAutosize from 'vue-textarea-autosize'
import vClickOutside from 'v-click-outside'
import VueCarousel from 'vue-carousel'
import VueClipboard from 'vue-clipboard2'
import VTooltip from 'v-tooltip'
// import VueIntercom from 'vue-intercom'
import VueFroala from 'vue-froala-wysiwyg'
import VueCookies from 'vue-cookies'
import VueSocialauth from 'vue-social-auth'


// Импорт css
import 'vue-select/dist/vue-select.css'

import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'


// Локализация для Froala Editor
import 'froala-editor/js/languages/ru.js'

// Плагины для Froala Editor
import 'froala-editor/js/plugins/link.min.js'
import 'froala-editor/js/plugins/lists.min.js'
import 'froala-editor/js/plugins/char_counter.min.js'
import 'froala-editor/css/plugins/char_counter.min.css'
import 'froala-editor/js/plugins/image.min.js'
import 'froala-editor/css/plugins/image.min.css'


Vue.config.productionTip = false
Vue.config.performance = true

Vue.use(VueLazyload)
Vue.use(VueMeta)
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(VueAwesomeCountdown, 'vac')
Vue.use(BackToTop)
Vue.use(TextareaAutosize)
Vue.use(vClickOutside)
Vue.use(VueCarousel)
Vue.use(VueClipboard)
Vue.use(VueFroala)
Vue.use(VueCookies)
Vue.use(VTooltip, {
    defaultTemplate: '<div class="tooltip-inner">',
})


// Настройки плагина авторизации через соц сети
Vue.use(VueSocialauth, {
    providers: {
        facebook: {
            clientId: 994399091005515,
            redirectUri: process.env.VUE_APP_ACCOUNT_SITE_URL + '/social-auth/facebook/callback'
        },
        google: {
            clientId: '644657220677-5g20545996uupob91uib9a3f86tvs6pe.apps.googleusercontent.com',
            redirectUri: process.env.VUE_APP_ACCOUNT_SITE_URL + '/social-auth/google/callback'
        },
        vkontakte: {
            clientId: 7604921,
            redirectUri: process.env.VUE_APP_ACCOUNT_SITE_URL + '/social-auth/vkontakte/callback'
        }
    }
})


// Настройки Intercom
// Vue.use(VueIntercom, {
//     appId: 'jne7j7uv'
// })


// Настройки плагина прогрессбара
Vue.use(VueProgressBar, {
    color: '#7a76ff',
    failedColor: 'red',
    height: '3px',
    transition: {
        speed: '0.3s',
        opacity: '0.6s',
        termination: 300
    }
})


// Настройки плагина всплывающих уведомлений
Vue.use(VueToast, {
    position: 'top-right',
    duration: 5000,
    pauseOnHover: true
})


// Настройки плагина конвертация дат
Vue.use(VueTimeago, {
    name: 'timeago',
    locale: 'ru',
    locales: {
        ru: require('date-fns/locale/ru')
    }
})


// Настройки плагина сокетов
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: 'api.doctrine.im:6001'
})


// Компонент v-select
Vue.component('v-select', vSelect)


// Настройки Axios
Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL
Vue.axios.defaults.https = process.env.VUE_APP_HTTPS

Vue.axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

Vue.axios.defaults.headers.common = {
    'Authorization': `Bearer ${store.state.user.data.token}`
}

Vue.axios.interceptors.response.use(response => response, error => {
    if (error.response && error.response.data.message === 'Unauthenticated.') {
        // Очистка данных о пользователе
        store.dispatch('user/errorToken').then(() => {
            // Редирект на страницу входа
            router.push({ name: 'Login' })
        })
    }

    return Promise.reject(error)
})


// Импорт директив
import DFocus from './directives/focus'
import DAccordion from './directives/accordion'
import DToggle from './directives/toggle'


new Vue({
    store,
    router,
    i18n,
    directives: {
        focus: DFocus,
        accordion: DAccordion,
        toggle: DToggle
    },
    metaInfo: {
        titleTemplate: i18n.t('message.page_title_global') + '%s'
    },
    render: h => h(App),
}).$mount('#app')
