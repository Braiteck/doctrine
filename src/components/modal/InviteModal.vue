<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal" id="invite_modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="modal_title">
                    {{ $t('message.modal_title_invite') }}
                </div>


                <!-- Вспдыв. окно - Форма -->
                <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
                    <div class="line emails">
                        <div class="field">
                            <!-- Вспдыв. окно - E-mails -->
                            <v-select transition="fade" v-model.trim="emails" :class="{ selected: emails.length || searching }" multiple
                                :options="emails_options" :selectable="() => emails.length < 100" @search="onSearch">
                                <!-- Вспдыв. окно - E-mails - Список выбранных -->
                                <template #selected-option="{ label }">
                                    <span>{{ label }}</span>
                                </template>

                                <!-- Вспдыв. окно - E-mails - Поиск -->
                                <template #search="{attributes, events}">
                                    <input class="vs__search" v-bind="attributes" v-on="events">
                                </template>

                                <!-- Вспдыв. окно - E-mails - Пустой поиск -->
                                <template #no-options="{ searching }">
                                    <div v-if="searching">{{ $t('message.valid_error_empty_search') }}</div>
                                    <div v-else>{{ $t('message.form_start_search') }}</div>
                                </template>

                                <!-- Вспдыв. окно - E-mails - Элемент выпад. списка -->
                                <template #option="option">
                                    <span>{{ option.label }}</span>
                                </template>
                            </v-select>

                            <!-- Вспдыв. окно - E-mails - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_email2') }}
                            </div>
                        </div>
                    </div>


                    <div class="line">
                        <div class="field with_tip">
                            <!-- Вспдыв. окно - Поле ввода -->
                            <input type="text" class="input" v-model.trim="course_lesson_query" @input="$v.course_lesson_query.$touch"
                                :class="{ active: course_lesson_query.length }">

                            <!-- Вспдыв. окно - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_course_lesson') }}
                            </div>

                            <!-- Вспдыв. окно - Пдсказки -->
                            <div class="datalist" v-if="tips">
                                <!-- Вспдыв. окно - Пдсказки - Список курсов -->
                                <div class="group courses" v-if="tips.courses.length">
                                    <!-- Вспдыв. окно - Пдсказки - Список курсов - Заголовок -->
                                    <div class="title">{{ $t('message.product_type_courses') }}</div>

                                    <!-- Вспдыв. окно - Пдсказки - Список курсов - Курс -->
                                    <div class="tip" v-for="(tip, index) in tips.courses" :key="`${index}`" @click.prevent="chooseTip({ type: 'course', ...tip })">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>
                                        {{ tip.name }}
                                    </div>
                                </div>

                                <!-- Вспдыв. окно - Пдсказки - Список уроков -->
                                <div class="group lessons" v-if="tips.lessons.length">
                                    <!-- Вспдыв. окно - Пдсказки - Список уроков - Заголовок -->
                                    <div class="title">{{ $t('message.product_type_lessons') }}</div>

                                    <!-- Вспдыв. окно - Пдсказки - Список уроков - Урок -->
                                    <div class="tip" v-for="(tip, index) in tips.lessons" :key="`${index}`" @click.prevent="chooseTip({ type: 'lesson', ...tip })">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_lesson"></use></svg>
                                        {{ tip.name }}
                                    </div>
                                </div>
                            </div>

                            <!-- Вспдыв. окно - Пдсказки - Ничего не найдено -->
                            <div class="datalist" v-if="tips.length === 0">
                                <div class="empty">
                                    {{ $t('message.valid_error_empty_search') }}
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Кнопка отправки -->
                    <div class="submit">
                        <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                            {{ $t('message.btn_invite_send') }}
                        </button>
                    </div>
                </form>
            </section>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/modal/invite.css'

// Импорт валидаторов
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'InviteModal',

    // Локальные данные
    data () {
        return {
            processing: false,
            emails_options: [],
            emails: [],
            course_lesson_query: '',
            course_lesson: {},
            tips: false,
            searching: false,
            watchEnable: true
        }
    },

    // Валидация
    validations: {
        emails: {
            required
        },
        course_lesson_query: {
            required
        }
    },

    methods: {
        // Закрыть всплыв. окно
        closeModal() {
            this.$emit('closeModalEvent')
        },


        // Поиск email
        onSearch(search) {
            if(search.length) {
                this.searching = true

                // Запрос на сервер
                this.$store.dispatch('findEmail', search).then(res => {
                    // Запись данных
                    this.emails_options = res.data

                    // Если введён email считаем его как вариант
                    if (email(search)) {
                        this.emails_options.unshift({ label: search })
                    }
                })
            } else {
                // Поле пустое
                this.searching = false
                this.emails_options = []
            }
        },


        // Выбор урока или курса из списка подсказок
        chooseTip(tip) {
            this.watchEnable = false
            this.course_lesson = tip
            this.course_lesson_query = tip.name
        },


        // Отправка формы
        onSubmit () {
            // Блокировка формы
            this.processing = true

            // Старт прогрессбара
            this.$Progress.start()

            // Подготовка данных к отправке
            let formDataTemp = {
                emails: this.emails.map(email => email.label),
                id: this.course_lesson.id,
                type: this.course_lesson.type
            }

            // Запрос на сервер
            this.$store.dispatch('authorUsers/inviteUsers', formDataTemp).then(res => {
                // Ошибка запроса на сервер
                if(res.error) {
                    // Разблокировка формы
                    this.processing = false

                    // Показ ошибки
                    this.$toast.error(this.$t('message.notification_error_invite'))

                    // Финиш прогрессбара
                    this.$Progress.finish()

                    // Показ всплыв. окна лимита пользователей
                    if(res.data.students){
                        this.$root.$emit('openLimitStudentsModalEvent')
                    }

                    return
                }

                // Закрыть всплыв. окно
                this.closeModal()

                // Показать всплыв. окно об успешном приглашении
                this.$root.$emit('openInviteSuccessModalEvent')
            })

            // Закрыть всплыв. окно
            this.closeModal()
        }
    },

    watch: {
        // Поиск урока или курса при вводе символов
        'course_lesson_query': function(){
            this.course_lesson_query.length > 0 && this.watchEnable
                // Запрос на сервер
                ? this.$store.dispatch('findCourseLesson', this.course_lesson_query).then(res => {
                    this.tips = res.data
                })
                : this.tips = false

            this.watchEnable = true
        }
    }
}
</script>