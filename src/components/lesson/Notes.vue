<template>
    <!-- Заметки -->
    <section class="notes">
        <!-- Заметки - Моб. кнопка -->
        <div class="mob_btn" @click.prevent="toggleMobNotes">
            <!-- Заметки - Моб. кнопка - Иконка -->
            <div class="icon">
                <svg><use xlink:href="/images/sprite.svg#ic_note"></use></svg>
            </div>

            <!-- Заметки - Моб. кнопка - Текст -->
            <div>{{ $t('message.lesson_notes_title') }} <span><b>{{ totalNotes }}</b> / {{ notesLimit }}</span></div>

            <!-- Заметки - Моб. кнопка - Стрелка -->
            <div class="arr"></div>
        </div>


        <div class="tabs_container">
            <!-- Табы заметок -->
            <div class="head">
                <div class="tabs">
                    <!-- Табы заметок - "Создать заметку" -->
                    <button :class="{ active: activeTab == 'tab1' }" @click.prevent="activeTab = 'tab1'" v-if="notes && notes.length < notesLimit">
                        {{ $t('message.lesson_notes_tab1') }}
                    </button>

                    <!-- Табы заметок - "Мои заметки" -->
                    <button :class="{ active: activeTab == 'tab2' }" @click.prevent="activeTab = 'tab2'" v-if="notes && notes.length">
                        {{ $t('message.lesson_notes_tab2') }} <span><b>{{ totalNotes }}</b> / {{ notesLimit }}</span>
                    </button>
                </div>
            </div>


            <!-- Форма создания заметки -->
            <div class="tab_content" :class="{ active: activeTab == 'tab1' }" v-if="notes && notes.length < notesLimit">
                <div class="add_note">
                    <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
                        <div class="line">
                            <div class="field" :class="{ invalid: $v.formData.name.$error }">
                                <!-- Форма создания заметки - Поле "Заголовок" -->
                                <input type="text" class="input with_limit" v-model.trim="formData.name" @input="$v.formData.name.$touch" maxlength="60"
                                    :class="{ active: formData.name.length != 0 }">

                                <!-- Форма создания заметки - Название поля -->
                                <div class="label">
                                    {{ $t('message.form_label_note_name') }}
                                </div>

                                <!-- Форма создания заметки - Лимит символов -->
                                <div class="limit_count">{{ 60 - formData.name.length }}</div>
                            </div>

                            <!-- Форма создания заметки - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.name.required && $v.formData.name.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>
                        </div>


                        <div class="line">
                            <div class="field" :class="{ invalid: $v.formData.description.$error }">
                                <!-- Форма создания заметки - Поле "Описание" -->
                                <textarea-autosize class="with_limit" v-model.trim.lazy="formData.description" maxlength="1000"
                                    :class="{ active: formData.description.length != 0 }" />

                                <!-- Форма создания заметки - Название поля -->
                                <div class="label">
                                    {{ $t('message.form_label_desc') }}
                                </div>

                                <!-- Форма создания заметки - Лимит символов -->
                                <div class="limit_count">{{ 1000 - formData.description.length }}</div>
                            </div>

                            <!-- Форма создания заметки - Ошибка -->
                            <div class="error_text" v-if="!$v.formData.description.required && $v.formData.description.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>
                        </div>


                        <!-- Форма создания заметки - Кнопка отправки -->
                        <div class="submit">
                            <button type="submit" class="submit_btn" :disabled="$v.$invalid">
                                {{ $t('message.btn_add_plus') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>


            <!-- Список заметок -->
            <div class="tab_content" :class="{ active: activeTab == 'tab2' }" v-if="notes">
                <div class="list">
                    <!-- Список заметок - Заметка -->
                    <NoteItem v-for="(note, index) in notes" :key="`${index}`" :note="note" :lessonSlug="lessonSlug" />
                </div>


                <!-- Кнопка дозагрузки -->
                <div class="load_more" v-if="loadStatus" @click.prevent="loadLessonNotes(lessonSlug)">
                    <div class="btn">{{ $t('message.btn_load_more') }}</div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/lesson/Notes.css'

// Импорт компонентов
import NoteItem from "@/components/notes/NoteItem.vue"

// Импорт валидаторов
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
    name: 'LessonNotes',

    // Данные из вне
    props: ['notes', 'totalNotes', 'loadStatus', 'lessonSlug'],

    // Компоненты
    components: {
        NoteItem // Шаблон заметки
    },

    // Локальные данные
    data () {
        return {
            notesLimit: process.env.VUE_APP_NOTES_LIMIT,
            processing: false,
            activeTab: 'tab1',
            formData: {
                name: '',
                description: ''
            }
        }
    },

    // Валидация полей
    validations: {
        formData: {
            name: {
                required,
                maxLength: maxLength(60)
            },
            description: {
                required,
                maxLength: maxLength(1000)
            }
        }
    },

    methods: {
        // Дозагрузка заметок
        loadLessonNotes(lessonSlug) {
            // Старт прогрессбара
            this.$Progress.start()

            // Вызов метода дозагрузки
            this.$store.dispatch('lessonInfo/loadNotes', lessonSlug).then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()
            })
        },


        // Моб. отображение заметок
        toggleMobNotes(event) {
            let parent = event.target.closest('.notes'),
                btn = parent.querySelector('.mob_btn')

            !btn.classList.contains('active')
                ? btn.classList.add('active')
                : btn.classList.remove('active')
        },


        // Отправка формы создания заметки
        onSubmit() {
            // Блокировка формы
            this.processing = true

            // Старт прогрессбара
            this.$Progress.start()

            // Копия данных формы
            let formDataTemp = JSON.parse(JSON.stringify(this.formData))

            formDataTemp.slug = this.lessonSlug

            // Запрос на сервер
            this.$store.dispatch('lessonInfo/addNote', formDataTemp).then(res => {
                // Разблокировка формы
                this.processing = false

                // Финиш прогрессбара
                this.$Progress.finish()

                // Ошибка запроса на сервер
                if(res.error) {
                    // Показ сообщения об ошибке
                    this.$toast.error(this.$t('message.notification_error_note_add'))
                }

                // Успешный запрос на сервер
                if(res.success) {
                    // Очищаем поля
                    this.formData.name = ''
                    this.formData.description = ''

                    this.$nextTick(() => { this.$v.$reset() })

                    // Показ сообщения об успешном изменении
                    this.$toast.success(this.$t('message.notification_success_note_add'))
                }
            })
        }
    }
}
</script>