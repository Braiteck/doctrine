<template>
    <!-- Вход -->
    <div class="auth">
        <div class="title">
            <!-- Вход - Кнопка меняющая обратно вид формы -->
            <transition name="fade">
            <button class="back_btn" v-show="email_selected" @click.prevent="email_selected = !email_selected"></button>
            </transition>

            <!-- Вход - Заголовок -->
            <span>{{ $t('message.auth_login_title') }}</span>
        </div>


        <!-- Вход - Форма -->
        <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
            <!-- Вход - Форма - Методы -->
            <transition name="fade" mode="out-in">
            <div class="line socials" key="2" v-if="!email_selected">
                <div class="field">
                    <!-- Вход - Форма - Методы - Через email -->
                    <button type="button" class="through_email_btn big"
                    @click.prevent="email_selected = !email_selected">
                        <div class="icon">
                            <img v-lazy="'/images/auth_email_logo.svg'" alt="" class="lazyload">
                        </div>
                        <div>{{ $t('message.auth_social_email_phone') }}</div>
                    </button>

                    <!-- Вход - Форма - Методы - Через vkontakte -->
                    <button type="button" @click.prevent="AuthProvider('vkontakte')">
                        <div class="icon">
                            <img v-lazy="'/images/auth_vk_logo.svg'" alt="" class="lazyload">
                        </div>
                        <div>{{ $t('message.auth_social_vk') }}</div>
                    </button>

                    <!-- Вход - Форма - Методы - Через facebook -->
                    <button type="button" @click.prevent="AuthProvider('facebook')">
                        <div class="icon">
                            <img v-lazy="'images/auth_fb_logo.svg'" alt="" class="lazyload">
                        </div>
                        <div>{{ $t('message.auth_social_fb') }}</div>
                    </button>

                    <!-- Вход - Форма - Методы - Через google -->
                    <button type="button" @click.prevent="AuthProvider('google')">
                        <div class="icon">
                            <img v-lazy="'/images/auth_google_logo.svg'" alt="" class="lazyload">
                        </div>
                        <div>{{ $t('message.auth_social_google') }}</div>
                    </button>

                    <!-- Вход - Форма - Методы - Через apple -->
                    <!-- <a href="https://api.doctrine.im/social-auth/apple">
                        <div class="icon">
                            <img v-lazy="'/images/auth_apple_logo.svg'" alt="" class="lazyload">
                        </div>
                        <div>{{ $t('message.auth_social_apple') }}</div>
                    </a> -->
                </div>
            </div>


            <!-- Вход - Форма - Авторизация через email -->
            <div class="through_email" key="1" v-else>
                <div class="line">
                    <div class="field" :class="{ invalid: $v.formData.login.$error }">
                        <!-- Вход - Форма - Поле ввода -->
                        <input type="text" class="input" v-model.trim="formData.login" v-focus
                            @input="$v.formData.login.$touch" :class="{ active: formData.login.length != 0 }">

                        <!-- Вход - Форма - Название поля -->
                        <div class="label">
                            {{ $t('message.form_label_login') }}
                        </div>

                        <!-- Вход - Форма - Ошибка -->
                        <div class="error_text" v-if="!$v.formData.login.required && $v.formData.login.$dirty">
                            {{ $t('message.valid_error_required') }}
                        </div>
                    </div>
                </div>


                <div class="line">
                    <div class="field" :class="{ invalid: $v.formData.password.$error }">
                        <!-- Вход - Форма - Поле ввода -->
                        <input :type="passwordFieldType" class="input input_password" v-model.trim="formData.password" @keypress="checkingСharacters($event)"
                            @input="$v.formData.password.$touch" :class="{ active: formData.password.length != 0 }">

                        <!-- Вход - Форма - Название поля -->
                        <div class="label">
                            {{ $t('message.form_label_password') }}
                        </div>

                        <!-- Вход - Форма - Ошибка -->
                        <div class="error_text" v-if="!$v.formData.password.required && $v.formData.password.$dirty">
                            {{ $t('message.valid_error_required') }}
                        </div>

                        <!-- Вход - Форма - Ошибка -->
                        <div class="error_text" v-if="!$v.formData.password.minLength && $v.formData.password.$dirty">
                            {{ $t('message.valid_error_minLength', { count: $v.formData.password.$params.minLength.min }) }}
                        </div>

                        <!-- Вход - Форма - Ошибка -->
                        <div class="error_text" v-if="!$v.formData.password.maxLength && $v.formData.password.$dirty">
                            {{ $t('message.valid_error_maxLength', { count: $v.formData.password.$params.maxLength.max }) }}
                        </div>

                        <!-- Вход - Форма - Кнопка изменения вида -->
                        <button type="button" class="view_btn" @click.prevent="switchFieldType">
                            <svg class="icon" v-if="passwordFieldType == 'password'">
                                <use xlink:href="/images/sprite.svg#ic_view"></use>
                            </svg>

                            <svg class="icon icon_a" v-else>
                                <use xlink:href="/images/sprite.svg#ic_view_a"></use>
                            </svg>
                        </button>
                    </div>
                </div>


                <!-- Вход - Форма - Запомнить -->
                <div class="line remember">
                    <div class="field">
                        <input type="checkbox" value="true" id="remember_check" v-model="formData.remember" checked>

                        <label for="remember_check">
                            {{ $t('message.form_remember') }}
                        </label>
                    </div>
                </div>


                <!-- Вход - Форма - Кнопка отправки -->
                <div class="submit">
                    <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                        {{ $t('message.btn_login') }}
                    </button>
                </div>


                <!-- Вход - Ссылка на восстановление пароля -->
                <div class="links">
                    <router-link to="/recovery">
                        {{ $t('message.btn_forgot') }}
                    </router-link>
                </div>
            </div>
            </transition>
        </form>


        <!-- Вход - Нижний текст -->
        <div class="bottom">
            {{ $t('message.auth_dont_have_account') }}

            <!-- Вход - Ссылка на регистрацию -->
            <router-link to="/register">
                {{ $t('message.btn_register_now') }}
            </router-link>
        </div>
    </div>
</template>


<script>
// Импорт валидаторов
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
    name: 'Login',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_login')
        }
    },

    // Локальные данные
    data () {
        return {
            processing: false,
            email_selected: false,
            passwordFieldType: 'password',
            formData: {
                login: '',
                password: '',
                remember: true
            }
        }
    },

    // Валидация
    validations: {
        formData: {
            login: {
                required
            },
            password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(32)
            }
        }
    },

    methods: {
        // Переключение типа поля пароля
        switchFieldType () {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
        },


        // Только латинские буквы в поле ввода пароля
        checkingСharacters (e) {
            let keyCode = e.keyCode || e.which

            if ( !/[A-Za-z0-9!@#$%^&*()+=.,/]/.test(String.fromCharCode(keyCode)) ) {
                e.preventDefault()
            }
        },


        // Авторизация через соц. сети
        AuthProvider(provider) {
            let self = this

            this.$auth.authenticate(provider).then(res =>{
                self.SocialLogin(provider, res)
            }).catch(err => {
                console.log({err:err})
            })

        },

        // Авторизация на сервере
        SocialLogin(provider, response){
            let self = this

            this.axios.post(process.env.VUE_APP_API_DOMAIN + '/social-auth/' + provider, response).then(res => {
                if(res.data){
                    // Запись данных о пользователе
                    self.$store.commit('user/SET_USER', res.data)

                    // Редирект в аккаунт
                    self.$router.push(`/${self.$store.state.user.data.route}/courses`)
                } else {
                    // Редирект на регистрацию
                    self.$router.push({ name: 'Register' })
                }
            }).catch(err => {
                console.log({err:err})
            })
        },


        // Отправка формы
        onSubmit () {
            // Блокировка формы
            this.processing = true

            // Старт прогрессбара
            this.$Progress.start()

            // Копия данных формы
            let formDataTemp = JSON.parse(JSON.stringify(this.formData))

            // Проверка что введено в качестве логина
            const loginEmail = email(formDataTemp.login)

            // Преобразование телефона
            if (!loginEmail) {
                formDataTemp.login = (formDataTemp.login).replace(/[\s-()]/g, '')
            }

            // Запрос на сервер
            this.$store.dispatch('user/login', formDataTemp).then(res => {
                // Ошибка запроса на сервер
                if(res.error) {
                    // Разблокировка формы
                    this.processing = false

                    // Показ сообщения об ошибке
                    this.$toast.error(this.$t('message.notification_error_login'))

                    // Финиш прогрессбара
                    this.$Progress.finish()

                    return
                }

                // Успешный запрос на сервер
                this.$router.push(`/${this.$store.state.user.data.route}/courses`)
            })
        }
    }
}
</script>