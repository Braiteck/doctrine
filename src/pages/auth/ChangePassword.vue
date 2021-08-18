<template>
    <!-- Смена пароля -->
    <div class="auth">
        <!-- Смена пароля - Заголовок -->
        <div class="title">
            {{ $t('message.auth_change_password_title') }}
        </div>


        <!-- Смена пароля - Форма -->
        <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
            <div class="line">
                <div class="field" :class="{ invalid: $v.formData.password.$error }">
                    <!-- Смена пароля - Форма - Поле ввода -->
                    <input type="password" class="input" v-model.trim="formData.password"
                        @input="$v.formData.password.$touch"
                        :class="{ active: formData.password.length != 0 }">

                    <!-- Смена пароля - Форма - Название поля -->
                    <div class="label">
                        {{ $t('message.form_label_new_password') }}
                    </div>

                    <!-- Смена пароля - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.password.required && $v.formData.password.$dirty">
                        {{ $t('message.valid_error_required') }}
                    </div>

                    <!-- Смена пароля - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.password.minLength && $v.formData.password.$dirty">
                        {{ $t('message.valid_error_minLength', { count: $v.formData.password.$params.minLength.min }) }}
                    </div>

                    <!-- Смена пароля - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.password.maxLength && $v.formData.password.$dirty">
                        {{ $t('message.valid_error_maxLength', { count: $v.formData.password.$params.maxLength.max }) }}
                    </div>
                </div>
            </div>


            <div class="line">
                <div class="field" :class="{ invalid: $v.formData.password_confirmation.$error }">
                    <!-- Смена пароля - Форма - Поле ввода -->
                    <input type="password" class="input" v-model.trim="formData.password_confirmation"
                        @input="$v.formData.password_confirmation.$touch"
                        :class="{ active: formData.password_confirmation.length != 0 }">

                    <!-- Смена пароля - Форма - Название поля -->
                    <div class="label">
                        {{ $t('message.form_label_confirm_password') }}
                    </div>

                    <div class="error_text" v-if="!$v.formData.password_confirmation.required && $v.formData.password_confirmation.$dirty">
                        {{ $t('message.valid_error_required') }}
                    </div>

                    <!-- Смена пароля - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.password_confirmation.minLength && $v.formData.password_confirmation.$dirty">
                        {{ $t('message.valid_error_minLength', { count: $v.formData.password_confirmation.$params.minLength.min }) }}
                    </div>

                    <!-- Смена пароля - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.password_confirmation.maxLength && $v.formData.password_confirmation.$dirty">
                        {{ $t('message.valid_error_maxLength', { count: $v.formData.password_confirmation.$params.maxLength.max }) }}
                    </div>

                    <!-- Смена пароля - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.password_confirmation.sameAsPassword && $v.formData.password_confirmation.$dirty">
                        {{ $t('message.valid_error_sameAsPassword') }}
                    </div>
                </div>
            </div>


            <!-- Смена пароля - Форма - Кнопка отправки -->
            <div class="submit">
                <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                    {{ $t('message.btn_change_password') }}
                </button>
            </div>
        </form>
    </div>
</template>


<script>
// Импорт валидаторов
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'ChangePassword',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_change_pass')
        }
    },

    // Локальные данные
    data () {
        return {
            token: this.$route.params.token,
            processing: false,
            formData: {
                password: '',
                password_confirmation: ''
            }
        }
    },

    // Валидация
    validations: {
        formData: {
            password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(32)
            },
            password_confirmation: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(32),
                sameAsPassword: sameAs('password')
            }
        }
    },

    methods: {
        // Отправка формы
        onSubmit() {
            // Блокировка формы
            this.processing = true

            // Копия данных формы
            let formDataTemp = JSON.parse(JSON.stringify(this.formData))

            formDataTemp.token = this.token

            // Старт прогрессбара
            this.$Progress.start()

            // Запрос на сервер
            this.$store.dispatch('user/reset_password', formDataTemp).then(res => {
                // Ошибка запроса на сервер
                if(res.error) {
                    // Разблокировка формы
                    this.processing = false

                    // Если ошибка - Неверный токет или его срок истёк
                    if(res.message == 'This password reset token is invalid.'){
                        this.$router.push('/link_not_valid')
                        return
                    }

                    // Если любая другая ошибка
                    this.$toast.error(this.$t('message.notification_error_reset_pass'))

                    // Финиш прогрессбара
                    this.$Progress.finish()

                    return
                }

                // Успешный запрос на сервер
                this.$router.push('/login')
            })
        }
    }
}
</script>