<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="modal_title">
                    {{ $t('message.modal_title_add_module') }}
                </div>

                <!-- Вспдыв. окно - Форма -->
                <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
                    <div class="line">
                        <div class="field" :class="{ invalid: $v.formData.name.$error }">
                            <!-- Вспдыв. окно - Поле ввода -->
                            <input type="text" class="input" maxlength="200" v-model.trim="formData.name" v-focus
                                @input="$v.formData.name.$touch"
                                :class="{ active: formData.name.length != 0 }">

                            <!-- Вспдыв. окно - Форма - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_module_name') }}
                            </div>
                        </div>

                        <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                        <div class="error_text" v-if="!$v.formData.name.required && $v.formData.name.$dirty">
                            {{ $t('message.valid_error_required') }}
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Кнопка отправки -->
                    <div class="submit">
                        <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                            {{ $t('message.btn_add') }}
                        </button>
                    </div>
                </form>
            </section>
        </section>
    </section>
</template>


<script>
// Импорт валидаторов
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
    name: 'AddModuleModal',

    // Локальные данные
    data () {
        return {
            processing: false,
            formData: {
                name: '',
                position: 0,
                lessons: []
            }
        }
    },

    // Валидация
    validations: {
        formData: {
            name: {
                required,
                maxLength: maxLength(200)
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

            // Отправка данных о модуле
            this.$root.$emit('addModuleEvent', this.formData)

            // Закрыть всплыв. окно
            this.closeModal()
        }
    }
}
</script>