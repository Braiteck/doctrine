<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Добавления курса -->
        <form @submit.prevent="onSubmit" class="course_form form" :class="{ processing: processing }">
            <!-- Добавления курса - Верхняя часть страницы -->
            <div class="block_head bg">
                <div class="title">
                    <!-- Добавления курса - Верхняя часть страницы - Иконка -->
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>

                    <!-- Добавления курса - Верхняя часть страницы - Заголовок -->
                    {{ $t('message.page_title_add_course') }}
                </div>
            </div>


            <div class="data">
                <!-- Добавления курса - Основной информации -->
                <div class="block description">
                    <div class="info">
                        <!-- Добавления курса - Основной информации - Изображение курса -->
                        <div class="block_title">
                            <!-- Добавления курса - Основной информации - Изображение курса - Заголовок -->
                            {{ $t('message.form_title_upload_poster') }}

                            <!-- Добавления курса - Основной информации - Изображение курса - Пояснение -->
                            <div class="exp" v-html="$t('message.form_upload_poster_exp', { size: 2 })"></div>
                        </div>


                        <div class="line upload">
                            <div class="field" @dragover="fileDragOver" @drop="fileDrop">
                                <!-- Добавления курса - Основной информации - Область загрузки изображения -->
                                <input type="file" id="poster" ref="poster" accept="image/*" @change="fileUpload">

                                <label for="poster">
                                    <div>
                                        <div class="btn">
                                            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_image"></use></svg>
                                            <span>{{ $t('message.btn_upload') }}</span>
                                        </div>

                                        <div class="exp">{{ $t('message.form_upload_drag_exp') }}</div>
                                    </div>
                                </label>


                                <!-- Добавления курса - Основной информации - Изображение курса -->
                                <div class="image" v-if="formData.posterPreview">
                                    <img v-lazy="formData.posterPreview" alt="" class="lazyload" v-if="formData.image">
                                    <img v-lazy="imagesUrl + formData.posterPreview" alt="" class="lazyload" v-else>

                                    <!-- Добавления курса - Основной информации - Изображение курса - Кнопка удаления -->
                                    <button type="button" class="del_btn" @click.prevent="fileDelete">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Добавления курса - Основной информации - Ошибка валидации -->
                            <div class="error_text" v-if="!$v.formData.posterPreview.required && $v.formData.posterPreview.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>
                        </div>


                        <!-- Добавления курса - Вводная информация -->
                        <div class="block_title">
                            {{ $t('message.form_title_course_info') }}
                        </div>

                        <!-- Добавления курса - Вводная информация - Заголовок -->
                        <div class="line">
                            <div class="field" :class="{ invalid: $v.formData.name.$error }">
                                <!-- Добавления курса - Вводная информация - Поле ввода -->
                                <input type="text" class="input with_limit" maxlength="60" v-model.trim="formData.name" @input="$v.formData.name.$touch" v-focus
                                    :class="{ active: formData.name.length != 0 }">

                                <!-- Добавления курса - Вводная информация - Название поля -->
                                <div class="label">
                                    {{ $t('message.form_label_course_name') }}
                                </div>

                                <!-- Добавления курса - Вводная информация - Тултип -->
                                <div class="tooltip" id="tooltip1">
                                    <v-popover container="#tooltip1">
                                        <!-- Добавления курса - Вводная информация - Тултип - Иконка -->
                                        <svg class="tooltip_icon tooltip-target"><use xlink:href="/images/sprite.svg#ic_tooltip2"></use></svg>

                                        <!-- Добавления курса - Вводная информация - Тултип - Всплывашка -->
                                        <template slot="popover">
                                            <div class="thumb">
                                                <img data-src="/images/tmp/video_thumb2.jpg" alt="" class="lozad">
                                            </div>

                                            <a href="https://www.youtube.com/watch?v=60VYXd9RVJ0" class="video_link">
                                                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_video_play"></use></svg>
                                                <span>Смотреть видео</span>
                                            </a>

                                            <div class="text">Электрон недетерминировано переворачивает плазменный фонон. Волна, вследствие квантового характера явления, отражает вихревой взрыв...</div>
                                        </template>
                                    </v-popover>
                                </div>

                                <!-- Добавления курса - Вводная информация - Лимит символов -->
                                <div class="limit_count">{{ 60 - formData.name.length }}</div>
                            </div>

                            <!-- Добавления курса - Вводная информация - Ошибка валидации -->
                            <div class="error_text" v-if="!$v.formData.name.required && $v.formData.name.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>

                            <!-- Добавления курса - Вводная информация - Ошибка валидации -->
                            <div class="error_text" v-if="!$v.formData.name.maxLength && $v.formData.name.$dirty">
                                {{ $t('message.valid_error_maxLength', { count: $v.formData.name.$params.maxLength.max }) }}
                            </div>
                        </div>


                        <!-- Добавления курса - Категория -->
                        <div class="line category">
                            <div class="field" :class="{ invalid: $v.formData.category_id.$error }">
                                <!-- Добавления курса - Категория - Выбор -->
                                <v-select transition="fade" v-model.trim="formData.category_id" :class="{ selected: formData.category_id != 0 }"
                                    :options="categories" :reduce="category => category.id" :value="formData.category_id">
                                    <!-- Добавления курса - Категория - Выбранная категория -->
                                    <template #selected-option="{ label }">
                                        <span>{{ label }}</span>
                                    </template>

                                    <!-- Добавления курса - Категория - Поиск -->
                                    <template #search="{attributes, events}">
                                        <input class="vs__search" v-bind="attributes" v-on="events">
                                    </template>

                                    <!-- Добавления курса - Категория - Пустой поиск -->
                                    <template #no-options>
                                        {{ $t('message.valid_error_empty_search') }}
                                    </template>

                                    <!-- Добавления курса - Категория - Элемент выпад. списка -->
                                    <template #option="option">
                                        <span>{{ option.label }}</span>
                                    </template>
                                </v-select>

                                <!-- Добавления курса - Категория - Название поля -->
                                <div class="label">
                                    {{ $t('message.form_label_course_category') }}
                                </div>
                            </div>

                            <!-- Добавления курса - Категория - Ошибка валидации -->
                            <div class="error_text" v-if="!$v.formData.category_id.required && $v.formData.category_id.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>
                        </div>


                        <!-- Добавления курса - Краткое описание -->
                        <div class="line">
                            <div class="field" :class="{ invalid: $v.formData.short_description.$error }">
                                <!-- Добавления курса - Краткое описание - Поле ввода -->
                                <textarea-autosize class="with_limit" maxlength="130" v-model.trim.lazy="formData.short_description"
                                    :class="{ active: formData.short_description.length != 0 }" />

                                <!-- Добавления курса - Краткое описание - Название поля -->
                                <div class="label">
                                    {{ $t('message.form_label_summary') }}
                                </div>

                                <!-- Добавления курса - Краткое описание - Лимт -->
                                <div class="limit_count">{{ 130 - formData.short_description.length }}</div>
                            </div>

                            <!-- Добавления курса - Краткое описание - Ошибка валидации -->
                            <div class="error_text" v-if="!$v.formData.short_description.required && $v.formData.short_description.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>

                            <!-- Добавления курса - Краткое описание - Ошибка валидации -->
                            <div class="error_text" v-if="!$v.formData.short_description.maxLength && $v.formData.short_description.$dirty">
                                {{ $t('message.valid_error_maxLength', { count: $v.formData.short_description.$params.maxLength.max }) }}
                            </div>
                        </div>


                        <!-- Добавления курса - Адрес страницы -->
                        <div class="line url">
                            <!-- Добавления курса - Адрес страницы - Название поля -->
                            <div class="name">{{ $t('message.form_label_slug') }}</div>

                            <!-- Добавления курса - Адрес страницы - Кнопка копирования url -->
                            <button type="button" class="copy_btn"
                                v-clipboard:copy="`${appUrl}/course/${$store.state.user.data.slug}/${formData.slug}`"
                                v-clipboard:success="onCopy">
                                <span>{{ $t('message.btn_copy_url') }}</span>
                                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_copy2"></use></svg>
                            </button>

                            <div class="field" :class="{ invalid: $v.formData.slug.$error }">
                                <!-- Добавления курса - Адрес страницы - Фикс. url -->
                                <div class="pre_value">{{ appUrl }}/course/{{ $store.state.user.data.slug }}/</div>

                                <!-- Добавления курса - Адрес страницы - Поле ввода -->
                                <input type="text" class="input url_input" v-model.trim="formData.slug" @input="$v.formData.slug.$touch" maxlength="100">

                                <!-- Добавления курса - Адрес страницы - Кнопка очистки поля -->
                                <transition name="fade">
                                <button type="button" class="remove" @click.prevent="formData.slug = '', slugOccupied = false" v-if="formData.slug.length != 0"></button>
                                </transition>
                            </div>

                            <!-- Добавления курса - Адрес страницы - Ошибка валидации -->
                            <div class="error_text" v-if="!$v.formData.slug.required && $v.formData.slug.$dirty">
                                {{ $t('message.valid_error_required') }}
                            </div>

                            <!-- Добавления курса - Адрес страницы - Ошибка валидации -->
                            <div class="error_text" v-if="!$v.formData.slug.maxLength && $v.formData.slug.$dirty">
                                {{ $t('message.valid_error_maxLength', { count: $v.formData.slug.$params.maxLength.max }) }}
                            </div>

                            <!-- Добавления курса - Адрес страницы - Ошибка валидации -->
                            <div class="error_text" v-if="slugOccupied">
                                {{ $t('message.valid_error_slug_course') }}
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Добавления курса - Модули -->
                <div class="block program">
                    <!-- Добавления курса - Модули - Заголовок -->
                    <div class="block_title">
                        {{ $t('message.form_title_course_modules') }}
                    </div>

                    <!-- Добавления курса - Модули - Список -->
                    <div class="list accordion" v-if="formData.modules.length != 0">
                        <!-- Добавления курса - Модули - Список - Модуль -->
                        <div class="item" v-for="(module, moduleIndex) in formData.modules" :key="`${moduleIndex}`">
                            <!-- Добавления курса - Модули - Список - Модуль - Шапка -->
                            <div class="head" v-accordion>
                                <!-- Добавления курса - Модули - Список - Модуль - Название -->
                                <div class="title">
                                    <span>{{ module.name }}</span>
                                </div>

                                <!-- Добавления курса - Модули - Список - Модуль - Кнопка редактирования -->
                                <button type="button" class="edit_btn" @click.prevent="openEditModuleModal({ index: moduleIndex, name: module.name })">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_edit"></use></svg>
                                </button>

                                <!-- Добавления курса - Модули - Список - Модуль - Кнопка удаления -->
                                <button type="button" class="del_btn" @click.prevent="openDeleteModuleModal(moduleIndex)">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
                                </button>

                                <!-- Добавления курса - Модули - Список - Модуль - Стрелка -->
                                <div class="arr"></div>

                                <!-- Добавления курса - Модули - Список - Модуль - Очерёдность -->
                                <div class="order">
                                    <button type="button" class="up_btn" @click.prevent="moduleMoveUp(module.position)"></button>
                                    <button type="button" class="down_btn" @click.prevent="moduleMoveDown(module.position)"></button>
                                </div>

                                <!-- Добавления курса - Модули - Список - Модуль - Моб. действия -->
                                <div class="mob_actions">
                                    <button type="button" class="btn" @click.prevent="moduleMobDropdown = moduleIndex"><span></span></button>

                                    <div class="dropdown" v-if="moduleMobDropdown === moduleIndex" v-click-outside="closeModuleMobDropdown">
                                        <div class="edit">
                                            <button type="button" @click.prevent="openEditModuleModal({ index: moduleIndex, name: module.name })">
                                                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_edit"></use></svg>
                                                <span>{{ $t('message.btn_edit') }}</span>
                                            </button>
                                        </div>

                                        <div class="move_up">
                                            <button type="button" @click.prevent="moduleMoveUp(module.position)">
                                                <span>{{ $t('message.btn_move_up') }}</span>
                                            </button>
                                        </div>

                                        <div class="move_down">
                                            <button type="button" @click.prevent="moduleMoveDown(module.position)">
                                                <span>{{ $t('message.btn_move_down') }}</span>
                                            </button>
                                        </div>

                                        <div class="delete border">
                                            <button type="button" @click.prevent="openDeleteModuleModal(moduleIndex)">
                                                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
                                                <span>{{ $t('message.btn_delete') }}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <!-- Добавления курса - Модули - Список уроков -->
                            <div class="data lessons">
                                <div class="list" v-if="module.lessons.length != 0">
                                    <!-- Добавления курса - Модули - Список уроков - Урок -->
                                    <LessonItem v-for="(lesson, lessonIndex) in module.lessons" :key="`${lessonIndex}`" :lesson="lesson" :lessonIndex="`${lessonIndex}`" :moduleIndex="`${moduleIndex}`" />
                                </div>

                                <!-- Добавления курса - Модули - Список уроков - Кнопка добавления -->
                                <button class="add_lesson_btn" @click.prevent="openAddLessonModal({ index: moduleIndex, name: module.name })">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_add_video"></use></svg>
                                    <span>{{ $t('message.btn_add_lesson') }}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Добавления курса - Модули - Кнопка добавления -->
                    <button type="button" class="add_btn" @click.prevent="openAddModuleModal">
                        <span class="icon"></span>{{ $t('message.btn_add_module') }}
                    </button>
                </div>


                <!-- Прелоадер -->
                <Preloader v-if="processing" />
            </div>


            <!-- Добавления курса - Кнопка удаления -->
            <div class="delete_course" v-if="formData.id">
                <button type="button" @click.prevent="openDeleteCourseModal">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
                    <span>{{ $t('message.btn_delete_course') }}</span>
                </button>
            </div>


            <!-- Добавления курса - Нижняя фикс. панель курса -->
            <div class="fixed_panel">
                <!-- Добавления курса - Нижняя фикс. панель курса - Название курса -->
                <div class="name" v-if="formData.name.length != 0">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_course"></use></svg>
                    {{ formData.name }}
                </div>

                <!-- Добавления курса - Нижняя фикс. панель курса - Кнопка сохранения -->
                <button type="submit" class="submit_btn publish_btn">
                    <span v-if="!formData.id">{{ $t('message.btn_publish') }}</span>
                    <span v-else>{{ $t('message.btn_save') }}</span>
                </button>
            </div>
        </form>


        <!-- Всплыв. окно добавления модуля -->
        <transition name="fade">
        <AddModuleModal v-if="showAddModuleModal" @closeModalEvent='closeAddModuleModal' />
        </transition>

        <!-- Всплыв. окно редактирования модуля -->
        <transition name="fade">
        <EditModuleModal v-if="showEditModuleModal" @closeModalEvent='closeEditModuleModal' :module="moduleInfo" />
        </transition>

        <!-- Всплыв. окно удаления модуля -->
        <transition name="fade">
        <DeleteModuleModal v-if="showDeleteModuleModal" @closeModalEvent='closeDeleteModuleModal' />
        </transition>


        <!-- Всплыв. окно добавления урока -->
        <transition name="fade">
        <AddLessonModal v-if="showAddLessonModal" @closeModalEvent='closeAddLessonModal' :module="lessonModule" />
        </transition>

        <!-- Всплыв. окно удаления урока -->
        <transition name="fade">
        <DeleteLessonModal v-if="showDeleteLessonModal" @closeModalEvent='closeDeleteLessonModal' />
        </transition>


        <!-- Всплыв. окно удаления курса -->
        <transition name="fade">
        <DeleteCourseModal v-if="showDeleteCourseModal" @closeModalEvent='closeDeleteCourseModal' />
        </transition>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/page/lessons.css'
import '@/assets/css/page/courseForm.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import AddModuleModal from "@/components/modal/AddModule.vue"
import EditModuleModal from "@/components/modal/EditModule.vue"
import DeleteModuleModal from "@/components/modal/DeleteModule.vue"
import AddLessonModal from "@/components/modal/AddLesson.vue"
import DeleteLessonModal from "@/components/modal/DeleteLesson.vue"
import LessonItem from "@/components/lessons/LessonItem2.vue"
import DeleteCourseModal from "@/components/modal/DeleteCourse.vue"

// Импорт валидаторов
import { required, maxLength } from 'vuelidate/lib/validators'

// Транслит кирилицы
import CyrillicToTranslit from 'cyrillic-to-translit-js'

// Движение по массиву
import 'array.prototype.move'

// Импорт vuex
import { mapGetters } from 'vuex'

export default {
    name: 'AuthorAddCourse',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.$i18n.t('message.page_title_add_course'),
            bodyAttrs: {
                class: ['course_form']
            }
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
        AddModuleModal, // Всплыв. окно добавления модуля
        EditModuleModal, // Всплыв. окно редактирования модуля
        DeleteModuleModal, // Всплыв. окно удаления модуля
        AddLessonModal, // Всплыв. окно добавления урока
        DeleteLessonModal, // Всплыв. окно удаления урока
        DeleteCourseModal, // Всплыв. окно удаления курса
        LessonItem // Шаблон урока
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            processing: false,
            showAddModuleModal: false,
            showEditModuleModal: false,
            showDeleteModuleModal: false,
            showAddLessonModal: false,
            showDeleteLessonModal: false,
            showDeleteCourseModal: false,
            slugOccupied: false,
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            appUrl: process.env.VUE_APP_ACCOUNT_SITE_URL,
            moduleInfo: {},
            moduleMobDropdown: false,
            lessonModule: {},
            lessonInfo: {},
            deleteLesson: {},
            watchEnable: false,
            formData: {
                name: '',
                category_id: 0,
                posterPreview: '',
                short_description: '',
                slug: '',
                modules: []
            }
        }
    },

    // Валидация
    validations: {
        formData: {
            posterPreview: {
                required
            },
            name: {
                required,
                maxLength: maxLength(60)
            },
            category_id: {
                required
            },
            short_description: {
                required,
                maxLength: maxLength(130)
            },
            slug: {
                required,
                maxLength: maxLength(100)
            }
        }
    },

    computed: {
        ...mapGetters({
            // Получение списка категорий курсов
            categories: 'getCourseСategories'
        })
    },

    beforeCreate () {
        // Очистка данных
        this.formData = {
            name: '',
            category_id: 0,
            posterPreview: '',
            short_description: '',
            slug: '',
            modules: []
        }

        // Загрузка категорий курсов
        this.$store.dispatch('loadCourseСategories')

        // Загрузка данных о курсе
        if(this.$route.params.courseId){
            this.$store.dispatch('courseInfo/editCourseInfo', this.$route.params.courseId).then(res => {
                if(res.success) {
                    // Удаление данных о модулях из localStorage
                    localStorage.removeItem('courseModules')

                    // Запись данных
                    this.formData = res.data
                }
            })
        }
    },

    mounted () {
        // Получение списка модулей из localStorage
        if (!this.formData.id && localStorage.getItem('courseModules')) {
            this.formData.modules = JSON.parse(localStorage.getItem('courseModules'))
        }

        // Прелоадер
        this.preloader = false


        // Добавление нового модуля
        this.$root.$on('addModuleEvent', moduleInfo => {
            this.formData.modules.push(moduleInfo)

            // Пересчёт позиций
            this.formData.modules.forEach((module, i) => module.position = i)

            // Финиш прогрессбара
            this.$Progress.finish()

            // Показ сообщения об успешном добавлении
            this.$toast.clear()
            this.$toast.success(this.$t('message.notification_success_module_add'))

            // Раскрытие добавленного модуля
            setTimeout(() => {
                for (var item of document.querySelector('.program .list').querySelectorAll('.item')) {
                    item.classList.remove('active')
                }

                document.querySelector('.program .list .item:last-child').classList.add('active')
            })
        })


        // Редактирование модуля
        this.$root.$on('editModuleEvent', moduleInfo => {
            this.formData.modules[moduleInfo.index].name = moduleInfo.name

            // Финиш прогрессбара
            this.$Progress.finish()

            // Показ сообщения об успешном редактировании
            this.$toast.clear()
            this.$toast.success(this.$t('message.notification_success_module_edit'))
        })


        // Удаление модуля
        this.$root.$on('deleteModuleEvent', () => {
            this.formData.modules.splice(this.moduleInfo.index, 1)

            // Пересчёт позиций
            this.formData.modules.forEach((module, i) => {
                module.position = i
            })

            // Финиш прогрессбара
            this.$Progress.finish()

            // Показ сообщения об успешном удалении
            this.$toast.clear()
            this.$toast.success(this.$t('message.notification_success_module_delete'))
        })


        // Показаться всплыв. окно удаления урока
        this.$root.$on('openDeleteLessonModal', (moduleIndex, lessonIndex) => {
            this.deleteLesson = {
                moduleIndex,
                lessonIndex
            }
            this.showDeleteLessonModal = true
            document.body.classList.add('lock')
        })


        // Добавление урока в модуль
        this.$root.$on('addLessonEvent', lessoninfo => {
            // Добавление урока в массив
            this.formData.modules[this.lessonModule.index].lessons.push(lessoninfo)

            // Пересчёт позиций
            this.formData.modules[this.lessonModule.index].lessons.forEach((lesson, i) => {
                lesson.position = i
            })

            // Финиш прогрессбара
            this.$Progress.finish()

            // Показ сообщения об успешном добавлении
            this.$toast.clear()
            this.$toast.success(this.$t('message.notification_success_lesson_add'))
        })


        // Удаление урока из модуля
        this.$root.$on('deleteModuleLessonEvent', () => {
            // Удаление урока из массива
            this.formData.modules[this.deleteLesson.moduleIndex].lessons.splice(this.deleteLesson.lessonIndex, 1)

            // Пересчёт позиций
            this.formData.modules[this.deleteLesson.moduleIndex].lessons.forEach((lesson, i) => {
                lesson.position = i
            })

            // Финиш прогрессбара
            this.$Progress.finish()

            // Показ сообщения об успешном удалении
            this.$toast.clear()
            this.$toast.success(this.$t('message.notification_success_lesson_delete'))

            // Закрыть всплыв. окно
            this.closeDeleteLessonModal()
        })


        // Перемещение урока наверх
        this.$root.$on('lessonMoveUpEvent', (moduleIndex, lessonPosition) => {
            this.formData.modules[moduleIndex].lessons.move(lessonPosition, lessonPosition-1)

            // Пересчёт позиций
            this.formData.modules[moduleIndex].lessons.forEach((lesson, i) => {
                lesson.position = i
            })
        })

        // Перемещение урока вниз
        this.$root.$on('lessonMoveDownEvent', (moduleIndex, lessonPosition) => {
            this.formData.modules[moduleIndex].lessons.move(lessonPosition, lessonPosition+1)

            // Пересчёт позиций
            this.formData.modules[moduleIndex].lessons.forEach((lesson, i) => {
                lesson.position = i
            })
        })


        // Удаление курса
        this.$root.$on('deleteCourseEvent', () => {
            // Старт прогрессбара
            this.$Progress.start()

            this.$store.dispatch('courseInfo/deleteCourse', this.formData.id).then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Очищаем массив с курсами
                this.$store.state.authorCourses.data = []

                // Успешный запрос на сервер
                this.$router.push(`/${this.$store.state.user.data.route}/courses`)
            })
        })
    },

    methods: {
        // Загрузка изображения курса
        fileUpload () {
            let file = this.$refs.poster.files[0]

            // Проверка веса картинки
            if(file.size <= 2097152){
                this.formData.image = file

                let reader = new FileReader()

                reader.addEventListener('load', function () {
                    this.formData.posterPreview = reader.result
                }.bind(this), false)

                if( this.formData.image ){ reader.readAsDataURL(this.formData.image) }

                this.$v.formData.posterPreview.$touch()
            } else {
                // Удаление мзображения
                this.fileDelete()

                // Показ ошибки
                this.$toast.error(this.$t('message.notification_error_poster'))
            }
        },

        // Удаление изображения курса
        fileDelete () {
            this.formData.posterPreview = ''
            this.formData.image = ''
            this.$refs.poster.value = ''
        },

        // Перетаскивание картинки в область
        fileDragOver(e) { e.preventDefault() },

        // Перетаскивание картинки в область
        fileDrop(e) {
            e.preventDefault()

            this.$refs.poster.files = e.dataTransfer.files
            this.fileUpload()
        },


        // Копирование url курса
        onCopy () {
            // Показ сообщения об успешном копировании
            this.$toast.clear()
            this.$toast.success(this.$t('message.notification_success_link_copy'))
        },


        // Показаться всплыв. окно добавления модуля
        openAddModuleModal () {
            this.showAddModuleModal = true
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно добавления модуля
        closeAddModuleModal () {
            this.showAddModuleModal = false
            document.body.classList.remove('lock')
        },


        // Показаться всплыв. окно добавления урока
        openAddLessonModal (module) {
            this.lessonModule = module
            this.showAddLessonModal = true
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно добавления урока
        closeAddLessonModal () {
            this.showAddLessonModal = false
            document.body.classList.remove('lock')
        },


        // Показаться всплыв. окно редактирования модуля
        openEditModuleModal (module) {
            this.moduleInfo = module
            this.showEditModuleModal = true
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно редактирования модуля
        closeEditModuleModal () {
            this.moduleInfo = {}
            this.showEditModuleModal = false
            document.body.classList.remove('lock')
        },


        // Показаться всплыв. окно удаления модуля
        openDeleteModuleModal (modauleIndex) {
            this.moduleInfo.index = modauleIndex
            this.showDeleteModuleModal = true
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно удаления модуля
        closeDeleteModuleModal () {
            this.moduleInfo = {}
            this.showDeleteModuleModal = false
            document.body.classList.remove('lock')
        },


        // Скрыть всплыв. окно удаления урока
        closeDeleteLessonModal () {
            this.deleteLesson = {}
            this.showDeleteLessonModal = false
            document.body.classList.remove('lock')
        },


        // Показаться всплыв. окно удаления курса
        openDeleteCourseModal () {
            this.showDeleteCourseModal = true
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно удаления курса
        closeDeleteCourseModal () {
            this.showDeleteCourseModal = false
            document.body.classList.remove('lock')
        },


        // Перемещение модуля наверх
        moduleMoveUp (modulePosition) {
            this.formData.modules.move(modulePosition, modulePosition-1)

            // Пересчёт позиций
            this.formData.modules.forEach((module, i) => {
                module.position = i
            })

            this.moduleMobDropdown = false
        },

        // Перемещение модуля вниз
        moduleMoveDown (modulePosition) {
            this.formData.modules.move(modulePosition, modulePosition+1)

            // Пересчёт позиций
            this.formData.modules.forEach((module, i) => {
                module.position = i
            })

            this.moduleMobDropdown = false
        },

        closeModuleMobDropdown () {
            this.moduleMobDropdown = false
        },


        // Отправка формы
        onSubmit() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                // Блокировка формы
                this.processing = true

                // Старт прогрессбара
                this.$Progress.start()

                // Подготовка данных к отправке
                let formDataTemp = new FormData()

                formDataTemp.append('id', this.formData.id)
                formDataTemp.append('name', this.formData.name)
                formDataTemp.append('category_id',  this.formData.category_id)
                formDataTemp.append('short_description', this.formData.short_description)
                formDataTemp.append('slug', this.formData.slug)
                formDataTemp.append('modules', JSON.stringify(this.formData.modules))

                if(this.$refs.poster.files.length > 0){
                    formDataTemp.append('image', this.$refs.poster.files[0])
                }

                // Определение редактирование это или создание нового курса
                let requestMethod = this.formData.id ? 'courseInfo/updateCourse' : 'courseInfo/createCourse'

                // Запрос на сервер
                this.$store.dispatch(requestMethod, formDataTemp).then(res => {
                    // Ошибка запроса на сервер
                    if(res.error) {
                        // Разблокировка формы
                        this.processing = false

                        // Показ ошибки
                        this.$toast.clear()
                        this.formData.id
                            ? this.$toast.error(this.$t('message.notification_error_update_course'))
                            : this.$toast.error(this.$t('message.notification_error_create_course'))

                        // Финиш прогрессбара
                        this.$Progress.finish()

                        // Показ всплыв. окна лимита хранилища
                        if(res.message.memory){
                            this.$root.$emit('openLimitMemoryModalEvent')
                        }

                        return
                    }

                    // Показ сообщения об успешном запросе
                    this.$toast.clear()
                    this.formData.id
                        ? this.$toast.success(this.$t('message.notification_success_update_course'))
                        : this.$toast.success(this.$t('message.notification_success_create_course'))

                    // Очищаем массив с курсами
                    this.$store.state.authorCourses.data = []

                    // Успешный запрос на сервер
                    this.$router.push(`/${this.$store.state.user.data.route}/courses`)
                })
            } else {
                // Показ сообщения об  ошибки
                this.$toast.clear()
                this.$toast.error(this.$t('message.notification_error_required'))

                // Скролл к верху страницы/всплывашки
                document.querySelector('.modal_scroll').scrollTop = 0
            }
        }
    },

    destroyed () {
        // Удаление данных о модулях из localStorage
        localStorage.removeItem('courseModules')
    },

    watch: {
        // Обновление модулей в localStorage
        'formData.modules': {
            handler: function(newVal){
                let modules = JSON.stringify(newVal)
                localStorage.setItem('courseModules', modules)
            },
            deep: true
        },

        // Проверка slug на уникальность
        'formData.slug': function(){
            if (this.formData.slug.length > 0 && this.watchEnable) {
                this.$store.dispatch('checkCourseSlug', {slug: this.formData.slug, id: this.formData.id}).then(res => {
                    res
                        ? this.slugOccupied = false
                        : this.slugOccupied = true
                })
            }

            this.formData.slug = this.formData.slug.replace(/[!@#$%^&*()+=.,/]/g, '')

            this.watchEnable = true
        },

        // Автогенерация slug
        'formData.name': function () {
            if(this.watchEnable) {
                this.formData.slug = CyrillicToTranslit().transform(this.formData.name, '_').toLowerCase().replace(/[!?@#$%^&*()+=.,/]/g, '')
            }

            this.watchEnable = true
        }
    }
}
</script>