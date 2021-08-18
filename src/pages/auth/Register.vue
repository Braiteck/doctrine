<template>
    <!-- Регистрация -->
    <div class="auth">
        <div class="title">
            <!-- Регистрация - Заголовок -->
            <span>{{ $t('message.auth_register_title') }}</span>
        </div>


        <!-- Регистрация - Форма -->
        <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
            <!-- Регистрация - Форма - Тип аккаунта -->
            <div class="line type" v-show="!preData.register_token">
                <div class="field">
                    <!-- Регистрация - Форма - Тип аккаунта - Автор -->
                    <input type="radio" value="1" id="type_check1" v-model="formData.user_type">
                    <label for="type_check1">
                        <svg class="icon icon1">
                            <use xlink:href="/images/types.svg#ic_type_author"></use>
                        </svg>
                        <span>{{ $t('message.account_type_author') }}</span>
                    </label>

                    <!-- Регистрация - Форма - Тип аккаунта - Пользователь -->
                    <input type="radio" value="2" id="type_check2" v-model="formData.user_type">
                    <label for="type_check2">
                        <svg class="icon icon2">
                            <use xlink:href="/images/types.svg#ic_type_user"></use>
                            </svg>
                        <span>{{ $t('message.account_type_user') }}</span>
                    </label>
                </div>
            </div>


            <div class="line">
                <div class="field" :class="{ invalid: $v.formData.name.$error }">
                    <!-- Регистрация - Форма - Поле ввода -->
                    <input type="text" class="input" v-model.trim="formData.name" v-focus
                        @input="$v.formData.name.$touch" :class="{ active: formData.name.length }" :disabled="preData.name">

                    <!-- Регистрация - Форма - Название поля -->
                    <div class="label">
                        {{ $t('message.form_label_name') }}
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.name.required && $v.formData.name.$dirty">
                        {{ $t('message.valid_error_required') }}
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.name.minLength && $v.formData.name.$dirty">
                        {{ $t('message.valid_error_minLength', { count: $v.formData.name.$params.minLength.min }) }}
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.name.maxLength && $v.formData.name.$dirty">
                        {{ $t('message.valid_error_maxLength', { count: $v.formData.name.$params.maxLength.max }) }}
                    </div>
                </div>
            </div>


            <div class="line">
                <div class="field" :class="{ invalid: $v.formData.surname.$error }">
                    <!-- Регистрация - Форма - Поле ввода -->
                    <input type="text" class="input" v-model.trim="formData.surname"
                        @input="$v.formData.surname.$touch" :class="{ active: formData.surname.length }" :disabled="preData.surname">

                    <!-- Регистрация - Форма - Название поля -->
                    <div class="label">
                        {{ $t('message.form_label_surname') }}
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.surname.required && $v.formData.surname.$dirty">
                        {{ $t('message.valid_error_required') }}
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.surname.minLength && $v.formData.surname.$dirty">
                        {{ $t('message.valid_error_minLength', { count: $v.formData.surname.$params.minLength.min }) }}
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.surname.maxLength && $v.formData.surname.$dirty">
                        {{ $t('message.valid_error_maxLength', { count: $v.formData.surname.$params.maxLength.max }) }}
                    </div>
                </div>
            </div>


            <div class="line">
                <div class="field" :class="{ invalid: $v.formData.email.$error }">
                    <!-- Регистрация - Форма - Поле ввода -->
                    <input type="text" class="input" v-model.trim="formData.email"
                        @input="$v.formData.email.$touch" :class="{ active: formData.email.length }" :disabled="preData.email">

                    <!-- Регистрация - Форма - Название поля -->
                    <div class="label">
                        {{ $t('message.form_label_email') }}
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.email.required && $v.formData.email.$dirty">
                        {{ $t('message.valid_error_required') }}
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.email.email && $v.formData.email.$dirty">
                        {{ $t('message.valid_error_email') }}
                    </div>
                </div>
            </div>


            <div class="line">
                <div class="field" :class="{ invalid: $v.formData.password.$error }">
                    <!-- Регистрация - Форма - Поле ввода -->
                    <input :type="passwordFieldType" class="input input_password" v-model.trim="formData.password" @keypress="checkingСharacters($event)"
                        @input="$v.formData.password.$touch" :class="{ active: formData.password.length }">

                    <!-- Регистрация - Форма - Название поля -->
                    <div class="label">
                        {{ $t('message.form_label_password') }}
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.password.required && $v.formData.password.$dirty">
                        {{ $t('message.valid_error_required') }}
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.password.minLength && $v.formData.password.$dirty">
                        {{ $t('message.valid_error_minLength', { count: $v.formData.password.$params.minLength.min }) }}
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.password.maxLength && $v.formData.password.$dirty">
                        {{ $t('message.valid_error_maxLength', { count: $v.formData.password.$params.maxLength.max }) }}
                    </div>

                    <!-- Регистрация - Форма - Кнопка изменения вида -->
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


            <div class="line phone">
                <div class="field" :class="{ invalid: $v.formData.phone.$error }">
                    <div class="code">
                        <!-- Регистрация - Форма - Выбор страны -->
                        <v-select transition="fade" v-model.trim="formData.code"
                            :options="countries" :reduce="country => country.code" :value="formData.code">
                            <!-- Регистрация - Форма - Выбор страны - Выбранная страна -->
                            <template #selected-option="{ flag, label }">
                                <img :src="imagesUrl + flag" alt="">
                                <span>{{ label }}</span>
                            </template>

                            <!-- Регистрация - Форма - Выбор страны - Поиск -->
                            <template #search="{attributes, events}">
                                <input class="vs__search" v-bind="attributes" v-on="events" v-model="countrySearch" @blur="countrySearch = '+'">
                            </template>

                            <!-- Регистрация - Форма - Выбор страны - Пустой поиск -->
                            <template #no-options>
                                {{ $t('message.valid_error_empty_search') }}
                            </template>

                            <!-- Регистрация - Форма - Выбор страны - Элемент выпад. списка -->
                            <template #option="option">
                                <img :src="imagesUrl + option.flag" alt="">
                                <span>{{ option.label }}</span>
                            </template>
                        </v-select>
                    </div>

                    <div class="number">
                        <!-- Регистрация - Форма - Поле ввода -->
                        <input type="number" class="input" v-model.trim="formData.phone" @input="$v.formData.phone.$touch"
                            :class="{ active: formData.phone.length }" @keydown="onKeyDown">
                    </div>

                    <!-- Регистрация - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.phone.required && $v.formData.phone.$dirty">
                        {{ $t('message.valid_error_required') }}
                    </div>
                </div>
            </div>


            <div class="line">
                <div class="field">
                    <!-- Регистрация - Форма - Поле ввода -->
                    <input type="text" class="input" v-model.trim="formData.promocode"
                        :class="{ active: formData.promocode.length }">

                    <!-- Регистрация - Форма - Название поля -->
                    <div class="label" v-html="$t('message.form_label_promocode')"></div>
                </div>
            </div>


            <!-- Регистрация - Форма - Кнопка отправки -->
            <div class="submit">
                <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                    {{ $t('message.btn_register_send') }}
                </button>
            </div>


            <!-- Регистрация - Форма - Текст согласия -->
            <div class="agree" v-html="$t('message.form_agree')"></div>
        </form>


        <!-- Регистрация - Нижний текст -->
        <div class="bottom" v-show="!preData.register_token">
            {{ $t('message.auth_dont_have_account') }}

            <!-- Вход - Ссылка на вход -->
            <router-link to="/login">
                {{ $t('message.btn_login') }}
            </router-link>
        </div>
    </div>
</template>


<script>
// Импорт валидаторов
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
    name: 'Register',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_register')
        }
    },

    // Локальные данные
    data () {
        return {
            processing: false,
            preData: {
                register_token: this.$route.query.register_token,
                email: this.$route.query.email
            },
            passwordFieldType: 'password',
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            countrySearch: '+',
            countries: JSON.parse(JSON.stringify(this.$store.getters['getCountries'])),
            formData: {
                user_type: this.$route.query.email ? 2 : 1,
                name: '',
                surname: '',
                email: this.$route.query.email || '',
                password: '',
                code: JSON.parse(JSON.stringify(this.$store.getters['getCountries'])).filter(country => country.selected)[0].code,
                phone: '',
                promocode: ''
            }
        }
    },

    // Валидация
    validations: {
        formData: {
            name: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(32)
            },
            surname: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(32)
            },
            email: {
                required,
                email
            },
            phone: {
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


        // Запрет на ввод символов в поле номера телефона
        onKeyDown (e) {
            // Запрет на ввод символов "-", "+" и не больше 15 символов
            if (e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 187 || e.keyCode == 189 || e.target.value.length > 15 && e.keyCode != 8 && e.keyCode != 46) {
                e.preventDefault()
                return
            }
        },


        // Отправка формы
        onSubmit() {
            // Блокировка формы
            this.processing = true

            // Старт прогрессбара
            this.$Progress.start()

            // Копия данных формы
            let formDataTemp = JSON.parse(JSON.stringify(this.formData))

            // Преобразование телефона
            formDataTemp.phone = parseInt((formDataTemp.phone).replace(/[-()]+/g, ''))

            // Добавление токена к данным
            if(this.preData.register_token){
                formDataTemp.register_token = this.preData.register_token
            }

            // Определение url запроса
            let requestMethod = formDataTemp.register_token ? 'user/registerContinued' : 'user/register'

            // Запрос на сервер
            this.$store.dispatch(requestMethod, formDataTemp).then(res => {
                // Ошибка запроса на сервер
                if(res.error) {
                    // Разблокировка формы
                    this.processing = false

                    // Показ ошибки если есть такой email
                    if(res.data.email) {
                        this.$toast.error(this.$t('message.notification_error_register_email'))
                    }

                    // Показ ошибки если есть такой телефона
                    if(res.data.phone) {
                        this.$toast.error(this.$t('message.notification_error_register_phone'))
                    }

                    // Показ ошибки если неверный токен
                    if(res.data.register_token){
                        this.$toast.error(this.$t('message.notification_error_register_token'))
                    }

                    // Финиш прогрессбара
                    this.$Progress.finish()

                    return
                }

                // Отправка события в Facebook Pixel
                if(formDataTemp.user_type == 1){
                    window.fbq('track', 'CompleteRegistration')
                }

                // Успешный запрос на сервер
                this.$router.push(`/${this.$store.state.user.data.route}/courses`)
            })
        }
    }
}
</script>