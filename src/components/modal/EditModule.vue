<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="modal_title">
                    {{ $t('message.modal_title_edit_module') }}
                </div>


                <!-- Вспдыв. окно - Форма -->
                <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
                    <div class="line">
                        <div class="field" :class="{ invalid: $v.formData.name.$error }">
                            <!-- Вспдыв. окно - Поле ввода -->
                            <input type="text" class="input" maxlength="200" v-model.trim="formData.name" v-focus
                                @input="$v.formData.name.$touch"
                                :class="{ active: formData.name.length != 0 }">

                            <!-- Вспдыв. окно - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_module_name') }}
                            </div>
                        </div>

                        <!-- Вспдыв. окно - Ошибка -->
                        <div class="error_text" v-if="!$v.formData.name.required && $v.formData.name.$dirty">
                            {{ $t('message.valid_error_required') }}
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Кнопка отправки -->
                    <div class="submit">
                        <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                            {{ $t('message.btn_save') }}
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
    name: 'EditModuleModal',

    // Данные из вне
    props: ['module'],

    // Локальные данные
    data () {
        return {
            processing: false,
            formData: {
                index: this.module.index,
                name: this.module.name
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
            this.$root.$emit('editModuleEvent', this.formData)

            // Закрыть всплыв. окно
            this.closeModal()
        }
    }
}
</script>