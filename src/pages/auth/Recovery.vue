<template>
    <!-- Восстановление пароля -->
    <div class="auth">
        <!-- Восстановление пароля - Заголовок -->
        <div class="title">
            {{ $t('message.auth_recovery_title') }}
        </div>


        <!-- Восстановление пароля - Форма -->
        <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
            <div class="line">
                <div class="field" :class="{ invalid: $v.formData.email.$error }">
                    <!-- Восстановление пароля - Форма - Поле ввода -->
                    <input type="text" class="input" v-model.trim="formData.email" v-focus
                        @input="$v.formData.email.$touch"
                        :class="{ active: formData.email.length != 0 }">

                    <!-- Восстановление пароля - Форма - Название поля -->
                    <div class="label">
                        {{ $t('message.form_label_email') }}
                    </div>

                    <!-- Восстановление пароля - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.email.required && $v.formData.email.$dirty">
                        {{ $t('message.valid_error_required') }}
                    </div>

                    <!-- Восстановление пароля - Форма - Ошибка -->
                    <div class="error_text" v-if="!$v.formData.email.email && $v.formData.email.$dirty">
                        {{ $t('message.valid_error_email') }}
                    </div>
                </div>
            </div>


            <!-- Восстановление пароля - Форма - Кнопка отправки -->
            <div class="submit">
                <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                    {{ $t('message.btn_recovery') }}
                </button>
            </div>


            <!-- Восстановление пароля - Форма - Ссылка на вход -->
            <div class="links">
                <router-link to="/login">
                    {{ $t('message.btn_remembered') }}
                </router-link>
            </div>
        </form>


        <!-- Восстановление пароля - Нижний текст -->
        <div class="bottom">
            {{ $t('message.auth_dont_have_account') }}

            <!-- Восстановление пароля - Ссылка на регистрацию -->
            <router-link to="/register">
                {{ $t('message.btn_register_now') }}
            </router-link>
        </div>
    </div>
</template>


<script>
// Импорт валидаторов
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'Recovery',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_recovery')
        }
    },

    // Локальные данные
    data () {
        return {
            processing: false,
            formData: {
                email: ''
            }
        }
    },

    // Валидация
    validations: {
        formData: {
            email: {
                required,
                email
            }
        }
    },

    methods: {
        // Отправка формы
        onSubmit () {
            // Блокировка формы
            this.processing = true

            // Старт прогрессбара
            this.$Progress.start()

            // Запрос на сервер
            this.$store.dispatch('user/recovery', this.formData).then(res => {
                // Ошибка запроса на сервер
                if(res.error) {
                    // Разблокировка формы
                    this.processing = false

                    // Показ ошибки
                    this.$toast.error(this.$t('message.auth_recovery_error'))

                    // Финиш прогрессбара
                    this.$Progress.finish()

                    return
                }

                // Успешный запрос на сервер
                this.$router.push('/recovery_success')
            })
        }
    }
}
</script>