<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="modal_title">
                    {{ $t('message.modal_title_edit_pass') }}
                </div>

                <!-- Вспдыв. окно - Форма -->
                <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
                    <div class="line">
                        <div class="field" :class="{ invalid: $v.formData.current_password.$error }">
                            <!-- Вспдыв. окно - Форма - Поле ввода -->
                            <input type="password" class="input" v-model.trim="formData.current_password"
                                @input="$v.formData.current_password.$touch"
                                :class="{ active: formData.current_password.length != 0 }">

                            <!-- Вспдыв. окно - Форма - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_password') }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.current_password.required && $v.formData.current_password.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.current_password.minLength && $v.formData.current_password.$dirty">
                                {{ $t('message.valid_error_minLength', { count: $v.formData.current_password.$params.minLength.min }) }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.current_password.maxLength && $v.formData.current_password.$dirty">
                                {{ $t('message.valid_error_maxLength', { count: $v.formData.current_password.$params.maxLength.max }) }}
                            </div>
                        </div>
                    </div>


                    <div class="line">
                        <div class="field" :class="{ invalid: $v.formData.new_password.$error }">
                            <!-- Вспдыв. окно - Форма - Поле ввода -->
                            <input type="password" class="input" v-model.trim="formData.new_password"
                                @input="$v.formData.new_password.$touch"
                                :class="{ active: formData.new_password.length != 0 }">

                            <!-- Вспдыв. окно - Форма - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_new_password') }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.new_password.required && $v.formData.new_password.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.new_password.minLength && $v.formData.new_password.$dirty">
                                {{ $t('message.valid_error_minLength', { count: $v.formData.new_password.$params.minLength.min }) }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.new_password.maxLength && $v.formData.new_password.$dirty">
                                {{ $t('message.valid_error_maxLength', { count: $v.formData.new_password.$params.maxLength.max }) }}
                            </div>
                        </div>
                    </div>


                    <div class="line">
                        <div class="field" :class="{ invalid: $v.formData.confirm_password.$error }">
                            <!-- Вспдыв. окно - Форма - Поле ввода -->
                            <input type="password" class="input" v-model.trim="formData.confirm_password"
                                @input="$v.formData.confirm_password.$touch"
                                :class="{ active: formData.confirm_password.length != 0 }">

                            <!-- Вспдыв. окно - Форма - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_confirm_password') }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.confirm_password.required && $v.formData.confirm_password.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.confirm_password.minLength && $v.formData.confirm_password.$dirty">
                                {{ $t('message.valid_error_minLength', { count: $v.formData.confirm_password.$params.minLength.min }) }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.confirm_password.maxLength && $v.formData.confirm_password.$dirty">
                                {{ $t('message.valid_error_maxLength', { count: $v.formData.confirm_password.$params.maxLength.max }) }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.confirm_password.sameAsPassword && $v.formData.confirm_password.$dirty">
                                {{ $t('message.valid_error_sameAsPassword') }}
                            </div>
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Кнопка отправки -->
                    <div class="submit">
                        <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                            {{ $t('message.btn_apply') }}
                        </button>
                    </div>
                </form>
            </section>
        </section>
    </section>
</template>


<script>
// Импорт валидаторов
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'EditPasswordModal',

    // Локальные данные
    data () {
        return {
            processing: false,
            formData: {
                current_password: '',
                new_password: '',
                confirm_password: ''
            }
        }
    },

    // Валидация
    validations: {
        formData: {
            current_password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(32)
            },
            new_password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(32)
            },
            confirm_password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(32),
                sameAsPassword: sameAs('new_password')
            }
        }
    },

    methods: {
        // Закрыть всплыв. окно
        closeModal() {
            this.$emit('closeModalEvent')
        },

        // Отправка формы
        onSubmit() {
            // Блокировка формы
            this.processing = true

            // Старт прогрессбара
            this.$Progress.start()

            // Запрос на сервер
            this.$store.dispatch('user/update_password', this.formData).then(res => {
                // Разблокировка формы
                this.processing = false

                // Финиш прогрессбара
                this.$Progress.finish()

                // Ошибка запроса на сервер
                if(res.error) {
                    // Показ сообщения об ошибке имзменения
                    this.$toast.error(this.$t('message.notification_error_edit_pass'))
                }

                // Успешный запрос на сервер
                if(res.success) {
                    // Закрыть всплыв. окна
                    this.closeModal()

                    // Показ сообщения об успешном изменении
                    this.$toast.success(this.$t('message.notification_success_edit_pass'))
                }
            })
        }
    }
}
</script>