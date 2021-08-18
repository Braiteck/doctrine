<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="modal_title">
                    {{ $t('message.modal_title_update_social') }}
                </div>


                <!-- Вспдыв. окно - Форма -->
                <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }" v-if="social == 'facebook'">
                    <div class="line">
                        <div class="field" :class="{ invalid: $v.facebook.$error }">
                            <!-- Вспдыв. окно - Поле ввода -->
                            <input type="url" class="input" v-model.trim="facebook" v-focus
                                @input="$v.facebook.$touch"
                                :class="{ active: facebook !== null }">

                            <!-- Вспдыв. окно - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_fb_url') }}
                            </div>

                            <!-- Вспдыв. окно - Ошибка -->
                            <div class="error_text" v-if="!$v.facebook.required && $v.facebook.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>

                            <!-- Вспдыв. окно - Ошибка -->
                            <div class="error_text" v-if="!$v.facebook.url && $v.facebook.$dirty">
                                {{ $t('message.valid_error_url') }}
                            </div>
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Кнопка отправки -->
                    <div class="submit">
                        <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                            {{ $t('message.btn_add') }}
                        </button>
                    </div>
                </form>


                <!-- Вспдыв. окно - Форма -->
                <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }" v-if="social == 'vk'">
                    <div class="line">
                        <div class="field" :class="{ invalid: $v.vk.$error }">
                            <!-- Вспдыв. окно - Поле ввода -->
                            <input type="url" class="input" v-model.trim="vk" v-focus
                                @input="$v.vk.$touch"
                                :class="{ active: vk !== null }">

                            <!-- Вспдыв. окно - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_vk_url') }}
                            </div>

                            <!-- Вспдыв. окно - Ошибка -->
                            <div class="error_text" v-if="!$v.vk.required && $v.vk.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>

                            <!-- Вспдыв. окно - Ошибка -->
                            <div class="error_text" v-if="!$v.vk.url && $v.vk.$dirty">
                                {{ $t('message.valid_error_url') }}
                            </div>
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Кнопка отправки -->
                    <div class="submit">
                        <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                            {{ $t('message.btn_add') }}
                        </button>
                    </div>
                </form>


                <!-- Вспдыв. окно - Форма -->
                <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }" v-if="social == 'youtube'">
                    <div class="line">
                        <div class="field" :class="{ invalid: $v.youtube.$error }">
                            <!-- Вспдыв. окно - Поле ввода -->
                            <input type="url" class="input" v-model.trim="youtube" v-focus
                                @input="$v.youtube.$touch"
                                :class="{ active: youtube !== null }">

                            <!-- Вспдыв. окно - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_youtube_url') }}
                            </div>

                            <!-- Вспдыв. окно - Ошибка -->
                            <div class="error_text" v-if="!$v.youtube.required && $v.youtube.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>

                            <!-- Вспдыв. окно - Ошибка -->
                            <div class="error_text" v-if="!$v.youtube.url && $v.youtube.$dirty">
                                {{ $t('message.valid_error_url') }}
                            </div>
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Кнопка отправки -->
                    <div class="submit">
                        <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                            {{ $t('message.btn_add') }}
                        </button>
                    </div>
                </form>


                <!-- Вспдыв. окно - Форма -->
                <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }" v-if="social == 'instagram'">
                    <div class="line">
                        <div class="field" :class="{ invalid: $v.instagram.$error }">
                            <!-- Вспдыв. окно - Поле ввода -->
                            <input type="url" class="input" v-model.trim="instagram" v-focus
                                @input="$v.instagram.$touch"
                                :class="{ active: instagram !== null }">

                            <!-- Вспдыв. окно - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_insta_url') }}
                            </div>

                            <!-- Вспдыв. окно - Ошибка -->
                            <div class="error_text" v-if="!$v.instagram.required && $v.instagram.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>

                            <!-- Вспдыв. окно - Ошибка -->
                            <div class="error_text" v-if="!$v.instagram.url && $v.instagram.$dirty">
                                {{ $t('message.valid_error_url') }}
                            </div>
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Кнопка отправки -->
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
import { required, url } from 'vuelidate/lib/validators'

export default {
    name: 'UpdateSocialModal',

    // Данные из вне
    props: ['social'],

    // Локальные данные
    data () {
        return {
            processing: false,
            facebook: this.$store.state.user.data.url_facebook,
            vk: this.$store.state.user.data.url_vk,
            youtube: this.$store.state.user.data.url_youtube,
            instagram: this.$store.state.user.data.url_instagram
        }
    },

    // Валидация
    validations() {
        if (this.social == 'facebook') {
            return { facebook: { required, url } }
        }
        if (this.social == 'vk') {
            return { vk: { required, url } }
        }
        if (this.social == 'youtube') {
            return { youtube: { required, url } }
        }
        if (this.social == 'instagram') {
            return { instagram: { required, url } }
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

            // Копия данных формы
            let formDataTemp = {}

            switch (this.social) {
                case 'facebook':
                    formDataTemp = { facebook: this.facebook }
                    break

                case 'vk':
                    formDataTemp = { vk: this.vk }
                    break

                case 'youtube':
                    formDataTemp = { youtube: this.youtube }
                    break

                case 'instagram':
                    formDataTemp = { instagram: this.instagram }
                    break
            }

            // Запрос на сервер
            this.$store.dispatch('user/update_social', formDataTemp).then(res => {
                // Разблокировка формы
                this.processing = false

                // Финиш прогрессбара
                this.$Progress.finish()

                // Ошибка запроса на сервер
                if(res.error) {
                    // Показ сообщения об ошибке
                    this.$toast.error(this.$t('message.notification_error_update_social'))
                }

                // Успешный запрос на сервер
                if(res.success) {
                    // Закрыть всплыв. окно
                    this.closeModal()

                    // Показ сообщения об успешном изменении
                    this.$toast.success(this.$t('message.notification_success_update_social'))
                }
            })
        }
    }
}
</script>