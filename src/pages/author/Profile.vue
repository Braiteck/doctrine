<template>
    <!-- Профиль -->
    <section class="profile block">
        <!-- Профиль - Верхняя часть страницы -->
        <div class="block_head">
            <div class="title">
                <!-- Профиль - Верхняя часть страницы - Иконка -->
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_profile"></use></svg>

                <!-- Профиль - Верхняя часть страницы - Заголовок -->
                {{ $t('message.page_title_profile') }}
            </div>
        </div>


        <div class="row">
            <div class="col_left">
                <div class="photo">
                    <!-- Профиль - Аватар -->
                    <div class="current">
                        <img v-lazy="imagesUrl + formData.avatar.avatar_full" alt="" class="lazyload" v-if="formData.avatar">
                        <img v-lazy="'/images/avatar_default.jpg'" alt="" class="lazyload" v-else>
                    </div>

                    <!-- Профиль - Аватар - Кнопка изменения аватара -->
                    <input type="file" id="avatar" ref="avatar" accept="image/*" @change="avatarUpload">
                    <label for="avatar" class="change_btn">
                        {{ $t('message.btn_change_photo') }}
                    </label>
                </div>

                <!-- Профиль - Соц. сети -->
                <div class="socials">
                    <button :class="{ active: formData.url_facebook !== null }"
                        @click.prevent="openUpdateSocialModal('facebook')">
                        <svg class="ic_facebook"><use xlink:href="/images/socials.svg#ic_facebook"></use></svg>
                    </button>

                    <button :class="{ active: formData.url_vk !== null }"
                        @click.prevent="openUpdateSocialModal('vk')">
                        <svg class="ic_vkontakte"><use xlink:href="/images/socials.svg#ic_vkontakte"></use></svg>
                    </button>

                    <button :class="{ active: formData.url_youtube !== null }"
                        @click.prevent="openUpdateSocialModal('youtube')">
                        <svg class="ic_youtube"><use xlink:href="/images/socials.svg#ic_youtube"></use></svg>
                    </button>

                    <button :class="{ active: formData.url_instagram !== null }"
                        @click.prevent="openUpdateSocialModal('instagram')">
                        <svg class="ic_instagram"><use xlink:href="/images/socials.svg#ic_instagram"></use></svg>
                    </button>
                </div>
            </div>


            <div class="col_main">
                <div class="personal_info">
                    <!-- Профиль - Форма -->
                    <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
                        <div class="line">
                            <div class="field" :class="{ invalid: $v.formData.name.$error }">
                                <!-- Профиль - Форма - Поле ввода -->
                                <input type="text" class="input" v-model.trim="formData.name"
                                    @input="$v.formData.name.$touch"
                                    :class="{ active: formData.name.length }">

                                <!-- Профиль - Форма - Название поля -->
                                <div class="label">
                                    {{ $t('message.form_label_name') }}
                                </div>

                                <!-- Профиль - Форма - Ошибка -->
                                <div class="error_text" v-if="!$v.formData.name.required && $v.formData.name.$dirty">
                                    {{ $t('message.valid_error_required') }}
                                </div>

                                <!-- Профиль - Форма - Ошибка -->
                                <div class="error_text" v-if="!$v.formData.name.minLength && $v.formData.name.$dirty">
                                    {{ $t('message.valid_error_minLength', { count: $v.formData.name.$params.minLength.min }) }}
                                </div>

                                <!-- Профиль - Форма - Ошибка -->
                                <div class="error_text" v-if="!$v.formData.name.maxLength && $v.formData.name.$dirty">
                                    {{ $t('message.valid_error_maxLength', { count: $v.formData.name.$params.maxLength.max }) }}
                                </div>
                            </div>
                        </div>

                        <div class="line">
                            <div class="field" :class="{ invalid: $v.formData.surname.$error }">
                                <!-- Профиль - Форма - Поле ввода -->
                                <input type="text" class="input" v-model.trim="formData.surname"
                                    @input="$v.formData.surname.$touch"
                                    :class="{ active: formData.surname.length }">

                                <!-- Профиль - Форма - Название поля -->
                                <div class="label">
                                    {{ $t('message.form_label_surname') }}
                                </div>

                                <!-- Профиль - Форма - Ошибка -->
                                <div class="error_text" v-if="!$v.formData.surname.required && $v.formData.surname.$dirty">
                                    {{ $t('message.valid_error_required') }}
                                </div>

                                <!-- Профиль - Форма - Ошибка -->
                                <div class="error_text" v-if="!$v.formData.surname.minLength && $v.formData.surname.$dirty">
                                    {{ $t('message.valid_error_minLength', { count: $v.formData.surname.$params.minLength.min }) }}
                                </div>

                                <!-- Профиль - Форма - Ошибка -->
                                <div class="error_text" v-if="!$v.formData.surname.maxLength && $v.formData.surname.$dirty">
                                    {{ $t('message.valid_error_maxLength', { count: $v.formData.surname.$params.maxLength.max }) }}
                                </div>
                            </div>
                        </div>


                        <div class="line phone">
                            <div class="field">
                                <div class="code">
                                    <!-- Профиль - Форма - Выбор страны -->
                                    <v-select transition="fade" v-model.trim="formData.code" disabled
                                        :options="countries" :reduce="country => country.code" :value="formData.code">
                                        <!-- Профиль - Форма - Выбор страны - Выбранная страна -->
                                        <template #selected-option="{ flag, label }">
                                            <img :src="imagesUrl + flag" alt="">
                                            <span>{{ label }}</span>
                                        </template>

                                        <!-- Профиль - Форма - Выбор страны - Поиск -->
                                        <template #search="{attributes, events}">
                                            <input class="vs__search" v-bind="attributes" v-on="events" v-model="countrySearch" @blur="countrySearch = '+'">
                                        </template>

                                        <!-- Профиль - Форма - Выбор страны - Пустой поиск -->
                                        <template #no-options>
                                            {{ $t('message.valid_error_empty_search') }}
                                        </template>

                                        <!-- Профиль - Форма - Выбор страны - Элемент выпад. списка -->
                                        <template #option="option">
                                            <img :src="imagesUrl + option.flag" alt="">
                                            <span>{{ option.label }}</span>
                                        </template>
                                    </v-select>
                                </div>

                                <div class="number">
                                    <!-- Профиль - Форма - Поле ввода -->
                                    <input type="number" class="input" v-model.trim="formData.phone" readonly
                                        :class="{ active: formData.phone.length }">
                                </div>
                            </div>
                        </div>

                        <div class="line">
                            <div class="field">
                                <!-- Профиль - Форма - Поле ввода -->
                                <input type="text" class="input" v-model.trim="formData.email" readonly
                                    :class="{ active: formData.email.length }">

                                <!-- Профиль - Форма - Название поля -->
                                <div class="label">
                                    {{ $t('message.form_label_email') }}
                                </div>
                            </div>
                        </div>

                        <div class="line">
                            <div class="field">
                                <!-- Профиль - Форма - Поле ввода -->
                                <input type="password" value="88888888" class="input active" readonly>

                                <!-- Профиль - Форма - Название поля -->
                                <div class="label">
                                    {{ $t('message.form_label_password') }}
                                </div>

                                <!-- Профиль - Форма - Кнопка изменения вида -->
                                <button type="button" class="edit_pass_btn" @click.prevent="openEditPasswordModal">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_edit"></use></svg>
                                </button>
                            </div>
                        </div>


                        <!-- Профиль - Форма - Кнопка отправки -->
                        <div class="submit">
                            <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                                {{ $t('message.btn_save') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <!-- Всплыв. окно смены соц. сети -->
        <transition name="fade">
        <UpdateSocialModal v-if="showUpdateSocialModal" @closeModalEvent='closeUpdateSocialModal' :social="showUpdateSocialModal" />
        </transition>

        <!-- Всплыв. окно смены пароля -->
        <transition name="fade">
        <EditPasswordModal v-if="showEditPasswordModal" @closeModalEvent='closeEditPasswordModal' />
        </transition>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/profile.css'

// Импорт валидаторов
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

// Импорт компонентов
import UpdateSocialModal from "@/components/modal/UpdateSocial.vue"
import EditPasswordModal from "@/components/modal/EditPassword.vue"

export default {
    name: 'AuthorProfile',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_profile')
        }
    },

    // Компоненты
    components: {
        UpdateSocialModal, // Всплыв. окно смены соц. сети
        EditPasswordModal // Всплыв. окно смены пароля
    },

    // Локальные данные
    data () {
        return {
            processing: false,
            showUpdateSocialModal: false,
            showEditPasswordModal: false,
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            countrySearch: '',
            countries: JSON.parse(JSON.stringify(this.$store.getters['getCountries'])),
            formData: JSON.parse(JSON.stringify(this.$store.getters['user/getData']))
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
            }
        }
    },

    methods: {
        // Загрузка аватара
        avatarUpload () {
            // Старт прогрессбара
            this.$Progress.start()

            // Подготовка данных к отправке
            let formData = new FormData()

            formData.append('avatar', this.$refs.avatar.files[0])

            // Запрос на сервер
            this.$store.dispatch('user/uploadAvatar', formData).then(res => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Ошибка запроса на сервер
                if(res.error) {
                    // Показ сообщения об ошибке
                    this.$toast.error(this.$t('message.notification_error_avatar_update'))
                }

                // Успешный запрос на сервер
                if(res.success) {
                    // Обновление аватара
                    this.formData.avatar = res.data
                    this.$store.dispatch('user/update_photo', res.data)

                    // Показ сообщения об успешном изменении
                    this.$toast.success(this.$t('message.notification_success_avatar_update'))
                }
            })
        },


        // Показаться всплыв. окно смены пароля
        openEditPasswordModal() {
            this.showEditPasswordModal = true
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно смены пароля
        closeEditPasswordModal() {
            this.showEditPasswordModal = false
            document.body.classList.remove('lock')
        },


        // Показаться всплыв. окно смены соц. сети
        openUpdateSocialModal(social) {
            this.showUpdateSocialModal = social
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно смены соц. сети
        closeUpdateSocialModal() {
            this.showUpdateSocialModal = false
            document.body.classList.remove('lock')
        },


        // Отправка формы
        onSubmit() {
            // Блокировка формы
            this.processing = true

            // Старт прогрессбара
            this.$Progress.start()

            // Копия данных формы
            let formDataTemp = {
                name: this.formData.name,
                surname: this.formData.surname
            }

            // Запрос на сервер
            this.$store.dispatch('user/update', formDataTemp).then(res => {
                // Разблокировка формы
                this.processing = false

                // Финиш прогрессбара
                this.$Progress.finish()

                // Ошибка запроса на сервер
                if(res.error) {
                    // Показ сообщения об ошибке
                    this.$toast.error(this.$t('message.notification_error_update'))
                }

                // Успешный запрос на сервер
                if(res.success) {
                    // Показ сообщения об успешном изменении
                    this.$toast.success(this.$t('message.notification_success_update'))
                }
            })
        }
    }
}
</script>