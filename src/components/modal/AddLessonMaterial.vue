<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal" id="add_material_modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="modal_title">
                    {{ $t('message.modal_title_add_material') }}
                </div>


                <!-- Вспдыв. окно - Форма -->
                <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
                    <!-- Вспдыв. окно - Форма - Ссылка на видео -->
                    <div class="file_item" v-for="(file, index) in files" :key="index" :set="v = $v.files.$each[index]">
                        <!-- Вспдыв. окно - Форма - Заголовок -->
                        <div class="line file_name">
                            {{ file.name }}
                        </div>


                        <div class="line">
                            <div class="field" :class="{ invalid: $v.files.$each[index].name.$error }">
                                <!-- Вспдыв. окно - Форма - Поле ввода -->
                                <input type="text" class="input" v-model.trim="file.name" @input="$v.files.$each[index].name.$touch"
                                    :class="{ active: files[index].name.length != 0 }">

                                <!-- Вспдыв. окно - Форма - Название поля -->
                                <div class="label">
                                    {{ $t('message.form_label_material_name') }}
                                </div>

                                <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                                <div class="error_text" v-if="!$v.files.$each[index].name.required && $v.files.$each[index].name.$dirty">
                                    {{ $t('message.valid_error_required') }}
                                </div>
                            </div>
                        </div>


                        <div class="line">
                            <div class="field" :class="{ invalid: $v.files.$each[index].url.$error }">
                                <!-- Вспдыв. окно - Форма - Поле ввода -->
                                <input type="url" class="input video_url" v-model.trim="file.url" @input="$v.files.$each[index].url.$touch" :disabled="file.file"
                                    :class="{ active: files[index].url.length != 0 }">

                                <!-- Вспдыв. окно - Форма - Название поля -->
                                <div class="label">
                                    {{ $t('message.form_label_video_url') }}
                                </div>

                                <!-- Вспдыв. окно - Форма - Выбор файла на устройстве -->
                                <div class="add_video">
                                    <input type="file" :id="`video_file_${index}`" :ref="index" @change="videoUpload(index)" accept="video/mp4">

                                    <!-- Вспдыв. окно - Форма - Выбор файла на устройстве - Кнопка -->
                                    <label :for="`video_file_${index}`" v-if="!file.file">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_video_file"></use></svg>
                                        <span>{{ $t('message.btn_choose_file') }}</span>
                                    </label>

                                    <!-- Вспдыв. окно - Форма - Выбор файла на устройстве - Выбранный файл -->
                                    <div class="selected_file" v-else>
                                        <!-- Вспдыв. окно - Форма - Выбор файла на устройстве - Выбранный файл - Иконка -->
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_video"></use></svg>

                                        <!-- Вспдыв. окно - Форма - Выбор файла на устройстве - Выбранный файл - Название -->
                                        <span>{{ file.file.name }}</span>

                                        <!-- Вспдыв. окно - Форма - Выбор файла на устройстве - Выбранный файл - Унокап удаления -->
                                        <button type="button" class="delete" @click.prevent="deleteVideoFile(index)"></button>
                                    </div>
                                </div>
                            </div>

                            <!-- Вспдыв. окно - Форма - Пояснение -->
                            <div class="exp">{{ $t('message.form_video_exp') }}</div>

                            <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                            <div class="error_text" v-if="!$v.files.$each[index].url.required && $v.files.$each[index].url.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>
                        </div>
                    </div>


                    <div class="line">
                        <div class="field">
                            <!-- Вспдыв. окно - Форма - Кнопка добавления поля -->
                            <button type="button" class="add_btn" @click.prevent="addMaterial">
                                <span class="icon"></span>{{ $t('message.btn_add_field') }}
                            </button>
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Кнопка отправки -->
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
// Импорт CSS
import '@/assets/css/component/modal/addLessonMaterial.css'

// Импорт валидаторов
import { required, requiredIf, url } from 'vuelidate/lib/validators'

export default {
    name: 'AddLessonMaterialModal',

    // Локальные данные
    data () {
        return {
            processing: false,
            files: [
                {
                    name: 'Название доп. материала',
                    file: false,
                    url: ''
                }
            ]
        }
    },

    // Валидация
    validations: {
        files: {
            $each: {
                name: { required },
                url: {
                    url,
                    required: requiredIf(item => !item.file)
                },
            }
        }
    },

    methods: {
        // Закрыть всплыв. окно
        closeModal() {
            this.$emit('closeModalEvent')
        },


        // Загрузка видео файла
        videoUpload (materialIndex) {
            let videoFile = this.$refs[materialIndex][0].files[0]

            // Проверка веса видео файла
            if(videoFile.size <= 2147483648){
                this.files[materialIndex].url = ''
                this.files[materialIndex].file = this.$refs[materialIndex][0].files[0]
            } else {
                // Удаление видео файда
                this.deleteVideoFile(materialIndex)

                // Показ ошибки
                this.$toast.error(this.$t('message.notification_error_video_size'))
            }
        },

        // Удаление видео файла
        deleteVideoFile (materialIndex) {
            this.files[materialIndex].file = false
            this.$refs[materialIndex][0].value = ''
        },


        // Добавление нового материала
        addMaterial () {
            this.files.push({
                name: this.$i18n.t('message.form_material_name'),
                file: false,
                url: ''
            })
        },


        // Отправка формы
        onSubmit () {
            // Блокировка формы
            this.processing = true

            // Старт прогрессбара
            this.$Progress.start()

            // Отправка данных о модуле
            this.$root.$emit('addLessonMaterialEvent', this.files)

            // Закрыть всплыв. окно
            this.closeModal()
        }
    }
}
</script>