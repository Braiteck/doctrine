<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal" id="create_lesson_modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="modal_title">
                    <span v-if="!formData.id">{{ $t('message.modal_title_create_lesson') }}</span>
                    <span v-else>{{ $t('message.modal_title_edit_lesson') }}</span>
                </div>


                <!-- Вспдыв. окно - Форма -->
                <form @submit.prevent="onSubmit" class="form" :class="{ processing: processing }">
                    <!-- Вспдыв. окно - Форма - Изображение урока -->
                    <div class="block_title">
                         <!-- Вспдыв. окно - Форма - Изображение урока - Заголовок -->
                        {{ $t('message.form_title_upload_poster') }}

                        <!-- Вспдыв. окно - Форма - Изображение урока - Пояснение -->
                        <div class="exp" v-html="$t('message.form_upload_poster_exp', { size: 2 })"></div>
                    </div>


                    <div class="line upload">
                        <div class="field" @dragover="fileDragOver" @drop="fileDrop">
                            <!-- Вспдыв. окно - Форма - Область загрузки изображения -->
                            <input type="file" id="lesson_poster" ref="lesson_poster" accept="image/*" @change="fileUpload">

                            <label for="lesson_poster">
                                <div>
                                    <div class="btn">
                                        <svg class="icon"><use xlink:href="/images/sprite.svg#ic_image"></use></svg>
                                        <span>{{ $t('message.btn_upload') }}</span>
                                    </div>

                                    <div class="exp">{{ $t('message.form_upload_drag_exp') }}</div>
                                </div>
                            </label>

                            <!-- Вспдыв. окно - Форма - Изображение урока -->
                            <div class="image" v-if="formData.posterPreview.length">
                                <img v-lazy="formData.posterPreview" alt="" class="lazyload" v-if="formData.image">
                                <img v-lazy="imagesUrl + formData.posterPreview" alt="" class="lazyload" v-else>

                                <!-- Вспдыв. окно - Форма - Изображение урока - Кнопка удаления -->
                                <button type="button" class="del_btn" @click.prevent="fileDelete">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
                                </button>
                            </div>
                        </div>

                        <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                        <div class="error_text" v-if="!$v.formData.posterPreview.required && $v.formData.posterPreview.$dirty">
                            {{ $t('message.valid_error_required') }}
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Обложка из видео -->
                    <div class="line accordion video_cover" v-show="!formData.id || formData.id && formData.video.type != 'file'">
                        <div class="item">
                            <div class="head" v-accordion>
                                <!-- Вспдыв. окно - Форма - Обложка из видео - Иконка -->
                                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_video_cover"></use></svg>

                                <!-- Вспдыв. окно - Форма - Обложка из видео - Название -->
                                <div class="title">{{ $t('message.form_label_video_cover') }}</div>

                                <!-- Вспдыв. окно - Форма - Обложка из видео - Стрелка -->
                                <div class="arr"></div>
                            </div>

                            <div class="data">
                                <!-- Вспдыв. окно - Форма - Обложка из видео - Время -->
                                <div class="time">
                                    <div class="title">
                                        {{ $t('message.form_video_cover_time_title') }}
                                    </div>

                                    <div class="row">
                                        <div>
                                            <input type="number" class="input" v-model.trim="video.cover_hours" @keydown="timeKeydown" :disabled="formData.posterPreview.length != 0">
                                            <div>{{ $t('message.time_hours') }}</div>
                                        </div>

                                        <div>
                                            <input type="number" class="input" v-model.trim="video.cover_minutes" @keydown="timeKeydown" :disabled="formData.posterPreview.length != 0">
                                            <div>{{ $t('message.time_minutes') }}</div>
                                        </div>

                                        <div>
                                            <input type="number" class="input" v-model.trim="video.cover_seconds" @keydown="timeKeydown" :disabled="formData.posterPreview.length != 0">
                                            <div>{{ $t('message.time_seconds') }}</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Вспдыв. окно - Форма - Обложка из видео - Предупреждение -->
                                <div class="exp">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_tooltip"></use></svg>
                                    <span>{{ $t('message.form_video_cover_exp') }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                        <div class="error_text" v-if="video.time_error">
                            {{ $t('message.valid_error_video_time') }}
                        </div>
                    </div>


                    <div class="line sep" v-show="!formData.id || formData.id && formData.video.type != 'file'"></div>


                    <!-- Вспдыв. окно - Форма - Название урока -->
                    <div class="line">
                        <div class="field" :class="{ invalid: $v.formData.name.$error }">
                            <!-- Вспдыв. окно - Форма - Поле ввода -->
                            <input type="text" class="input" v-model.trim="formData.name" @input="$v.formData.name.$touch" v-focus maxlength="60"
                                :class="{ active: formData.name.length != 0 }">

                            <!-- Вспдыв. окно - Форма - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_lesson_name') }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Лимит символов -->
                            <div class="limit_count">{{ 60 - formData.name.length }}</div>
                        </div>

                        <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                        <div class="error_text" v-if="!$v.formData.name.required && $v.formData.name.$dirty">
                            {{ $t('message.valid_error_required') }}
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Описание урока -->
                    <div class="line">
                        <div class="field" :class="{ invalid: $v.formData.short_description.$error }">
                            <!-- Вспдыв. окно - Форма - Поле ввода -->
                            <textarea-autosize v-model.trim.lazy="formData.short_description" maxlength="130"
                                :class="{ active: formData.short_description.length != 0 }" />

                            <!-- Вспдыв. окно - Форма - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_summary') }}
                            </div>

                            <!-- Вспдыв. окно - Форма - Лимит символов -->
                            <div class="limit_count">{{ 300 - formData.short_description.length }}</div>
                        </div>

                        <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                        <div class="error_text" v-if="!$v.formData.short_description.required && $v.formData.short_description.$dirty">
                            {{ $t('message.valid_error_required') }}
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Адрес страницы -->
                    <div class="line url">
                        <!-- Вспдыв. окно - Форма Адрес страницы - Название поля -->
                        <div class="name">{{ $t('message.form_label_slug') }}</div>

                        <!-- Вспдыв. окно - Форма Адрес страницы - Кнопка копирования url -->
                        <button type="button" class="copy_btn"
                            v-clipboard:copy="`${appUrl}/lesson/${$store.state.user.data.slug}/${formData.slug}`"
                            v-clipboard:success="onCopy">
                            <span>{{ $t('message.btn_copy_url') }}</span>
                            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_copy2"></use></svg>
                        </button>

                        <div class="field" :class="{ invalid: $v.formData.slug.$error }">
                            <!-- Вспдыв. окно - Форма Адрес страницы - Фикс. url -->
                            <div class="pre_value">{{ appUrl }}/lesson/{{ $store.state.user.data.slug }}/</div>

                            <!-- Вспдыв. окно - Форма Адрес страницы - Поле ввода -->
                            <input type="text" class="input url_input" v-model.trim="formData.slug" @input="$v.formData.slug.$touch" maxlength="100">

                            <!-- Вспдыв. окно - Форма Адрес страницы - Кнопка очистки поля -->
                            <transition name="fade">
                            <button type="button" class="remove" @click.prevent="formData.slug = '', slugOccupied = false" v-if="formData.slug.length != 0"></button>
                            </transition>
                        </div>

                        <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                        <div class="error_text" v-if="!$v.formData.slug.required && $v.formData.slug.$dirty">
                            {{ $t('message.valid_error_required') }}
                        </div>

                        <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                        <div class="error_text" v-if="!$v.formData.slug.maxLength && $v.formData.slug.$dirty">
                            {{ $t('message.valid_error_maxLength', { count: $v.formData.slug.$params.maxLength.max }) }}
                        </div>

                        <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                        <div class="error_text" v-if="slugOccupied">
                            {{ $t('message.valid_error_slug_lesson') }}
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Категория -->
                    <div class="line category">
                        <div class="field" :class="{ invalid: $v.formData.category_id.$error }">
                            <!-- Вспдыв. окно - Форма - Категория - Выбор -->
                            <v-select transition="fade" v-model.trim="formData.category_id" :class="{ selected: formData.category_id }"
                                :options="categories" :reduce="category => category.id" :value="formData.category_id">
                                <!-- Вспдыв. окно - Форма - Категория - Выбранная категория -->
                                <template #selected-option="{ label }">
                                    <span>{{ label }}</span>
                                </template>

                                <!-- Вспдыв. окно - Форма - Категория - Поиск -->
                                <template #search="{attributes, events}">
                                    <input class="vs__search" v-bind="attributes" v-on="events">
                                </template>

                                <!-- Вспдыв. окно - Форма - Категория - Пустой поиск -->
                                <template #no-options>
                                    {{ $t('message.valid_error_empty_search') }}
                                </template>

                                <!-- Вспдыв. окно - Форма - Категория - Элемент выпад. списка -->
                                <template #option="option">
                                    <span>{{ option.label }}</span>
                                </template>
                            </v-select>

                            <!-- Вспдыв. окно - Форма - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_lesson_category') }}
                            </div>
                        </div>

                        <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                        <div class="error_text" v-if="!$v.formData.category_id.required && $v.formData.category_id.$dirty">
                            {{ $t('message.valid_error_required') }}
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Видео -->
                    <div class="line">
                        <!-- Вспдыв. окно - Форма Адрес страницы - Название поля -->
                        <div class="name">{{ $t('message.form_label_video_file') }}</div>

                        <div class="field">
                            <!-- Вспдыв. окно - Форма - Видео - Файл -->
                            <div class="add_video full">
                                <input type="file" id="video_file" ref="video_file" accept="video/mp4" @change="videoUpload">

                                <!-- Вспдыв. окно - Форма - Видео - Файл - Выбрать -->
                                <label for="video_file" v-if="formData.video.length == 0">
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_video_file"></use></svg>
                                    <span>{{ $t('message.btn_choose_file') }}</span>
                                </label>

                                <!-- Вспдыв. окно - Форма - Видео - Файл - Выбран -->
                                <label for="video_file" class="selected_file" v-else>
                                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_video"></use></svg>
                                    <span>{{ formData.video.name }}</span>
                                    <button type="button" class="delete" @click.prevent="deleteVideoFile"></button>
                                </label>
                            </div>
                        </div>

                        <!-- Вспдыв. окно - Форма - Ошибка валидации -->
                        <div class="error_text" v-if="!$v.formData.video.required && $v.formData.video.$dirty">
                            {{ $t('message.valid_error_required') }}
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Задание -->
                    <div class="line complete_task">
                        <div class="field">
                            <!-- Вспдыв. окно - Форма - Поле ввода -->
                            <froala :tag="'textarea'" :config="editorConfig2" v-model="formData.task" />

                            <!-- Вспдыв. окно - Форма - Задание - Время -->
                            <div class="complete_time">
                                <span>{{ $t('message.form_label_lesson_task_time') }}</span>

                                <v-select transition="fade" v-model.trim="formData.task_min" :class="{ selected: formData.task_min != 0 }"
                                    :options="task_min_options" :reduce="item => item.value" :value="formData.task_min">
                                    <!-- Вспдыв. окно - Форма - Задание - Время - Выбранное значение -->
                                    <template #selected-option="{ label }">
                                        <span>{{ label }}</span>
                                    </template>

                                    <!-- Вспдыв. окно - Форма - Задание - Время - Поиск -->
                                    <template #search="{attributes, events}">
                                        <input class="vs__search" v-bind="attributes" v-on="events">
                                    </template>

                                    <!-- Вспдыв. окно - Форма - Задание - Время - Пустой поиск -->
                                    <template #no-options>
                                        {{ $t('message.valid_error_empty_search') }}
                                    </template>

                                    <!-- Вспдыв. окно - Форма - Задание - Время - Элемент выпад. списка -->
                                    <template #option="option">
                                        <span>{{ option.label }}</span>
                                    </template>
                                </v-select>
                            </div>
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Полное описание -->
                    <div class="line">
                        <div class="field">
                            <!-- Вспдыв. окно - Форма - Поле ввода -->
                            <froala :tag="'textarea'" :config="editorConfig" v-model="formData.description" />
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Файлы для скачивания -->
                    <div class="line files">
                        <!-- Вспдыв. окно - Форма - Файлы для скачивания - Заголовок -->
                        <div class="title">
                            {{ $t('message.form_title_download_files') }}
                        </div>

                        <div class="field row">
                            <input multiple type="file" id="download_files" ref="download_files" @change="downloadFileUpload">

                            <!-- Вспдыв. окно - Форма - Файлы для скачивания - Кнопка добавления -->
                            <label for="download_files" class="add_file">
                                <span class="icon"></span>
                            </label>

                            <!-- Вспдыв. окно - Форма - Файлы для скачивания - Файлы -->
                            <div class="file" v-for="(file, index) in formData.download_files" :key="`${index}`">
                                <!-- Вспдыв. окно - Форма - Файлы для скачивания - Файлы - Иконка -->
                                <div class="icon">
                                    <div class="name">{{ file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2) || 'file' }}</div>
                                </div>

                                <div>
                                    <!-- Вспдыв. окно - Форма - Файлы для скачивания - Файлы - Название -->
                                    <div class="file_name">{{ file.name }}</div>

                                    <!-- Вспдыв. окно - Форма - Файлы для скачивания - Файлы - Вес -->
                                    <div class="size">{{ parseFloat((file.size/Math.pow(1024, 2)).toFixed(2)) }} {{ $t('message.file_size_mb') }}</div>
                                </div>

                                <!-- Вспдыв. окно - Форма - Файлы для скачивания - Файлы - Унопка удаления -->
                                <button type="button" class="delete" @click.prevent="deleteDownloadFile(index)"></button>
                            </div>
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Дополнительные видео -->
                    <div class="line files">
                        <!-- Вспдыв. окно - Форма - Дополнительные видео - Заголовок -->
                        <div class="title">
                            {{ $t('message.form_title_additional_files') }}
                        </div>

                        <div class="field row">
                            <!-- Вспдыв. окно - Форма - Дополнительные видео - Кнопка добавления -->
                            <button class="add_file" @click.prevent="openAddLessonMaterialModal">
                                <span class="icon"></span>
                            </button>

                            <!-- Вспдыв. окно - Форма - Дополнительные видео - Файлы -->
                            <div class="file video" v-for="(file, index) in formData.additional_files" :key="`${index}`">
                                <!-- Вспдыв. окно - Форма - Дополнительные видео - Файлы - Изображение -->
                                <div class="thumb">
                                    <img src="/images/video_default.svg" alt="">

                                    <div class="play">
                                        <svg><use xlink:href="/images/sprite.svg#ic_video_play"></use></svg>
                                    </div>
                                </div>

                                <!-- Вспдыв. окно - Форма - Дополнительные видео - Файлы - Название -->
                                <div class="file_name">{{ file.name }}</div>

                                <!-- Вспдыв. окно - Форма - Дополнительные видео - Файлы - Унопка удаления -->
                                <button type="button" class="delete" @click.prevent="deleteLessonMaterial(index)"></button>
                            </div>
                        </div>
                    </div>


                    <!-- Вспдыв. окно - Форма - Кнопка добавления -->
                    <div class="submit">
                        <button type="submit" class="submit_btn">
                            <span v-if="formData.id">{{ $t('message.btn_save') }}</span>
                            <span v-else>{{ $t('message.btn_add_lesson') }}</span>
                        </button>
                    </div>


                    <!-- Вспдыв. окно - Форма - Кнопка удаления -->
                    <div class="delete_lesson" v-if="formData.id">
                        <button @click.prevent="openDeleteLessonModal">
                            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
                            <span>{{ $t('message.btn_delete_lesson') }}</span>
                        </button>
                    </div>


                    <!-- Прелоадер -->
                    <Preloader v-if="preloader && formData.id" />
                </form>
            </section>
        </section>


        <!-- Всплыв. окно добавления урока -->
        <transition name="fade">
        <AddLessonMaterialModal v-if="showLessonMaterialModal" @closeModalEvent='closeAddLessonMaterialModal' />
        </transition>


        <!-- Всплыв. окно удаления урока -->
        <transition name="fade">
        <DeleteLessonModal v-if="showDeleteLessonModal" @closeModalEvent='closeDeleteLessonModal' />
        </transition>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/modal/createLesson.css'
import '@/assets/css/froalaEditor.css'

// Импорт компонентов
import AddLessonMaterialModal from "@/components/modal/AddLessonMaterial.vue"
import DeleteLessonModal from "@/components/modal/DeleteLesson.vue"
import Preloader from "@/components/Preloader.vue"

// Импорт валидаторов
import { required, maxLength, requiredIf } from 'vuelidate/lib/validators'

// Транслит кирилицы
import CyrillicToTranslit from 'cyrillic-to-translit-js'

// Импорт vuex
import { mapGetters } from 'vuex'

export default {
    name: 'CreateLessonModal',

    // Данные из вне
    props: ['lessonInfo'],

    // Компоненты
    components: {
        AddLessonMaterialModal, // Всплыв. окно добавления дополнительного материала
        DeleteLessonModal, // Всплыв. окно удаления урока
        Preloader // Прелоадер
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            processing: false,
            slugOccupied: false,
            showLessonMaterialModal: false,
            showDeleteLessonModal: false,
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            appUrl: process.env.VUE_APP_ACCOUNT_SITE_URL,
            watchEnable: false,
            formData: {
                name: '',
                posterPreview: '',
                description: '',
                short_description: '',
                slug: '',
                video: '',
                video_duration: 0,
                task: '',
                download_files: [],
                additional_files: [],
                task_min: 5
            },
            video: {
                cover_hours: 0,
                cover_minutes: 0,
                cover_seconds: 0,
                cover_time: 0,
                time_error: false
            },
            task_min_options: [
                { value: 5, label: this.$i18n.tc('message.lesson_task_min', 5) },
                { value: 15, label: this.$i18n.tc('message.lesson_task_min', 15) },
                { value: 30, label: this.$i18n.tc('message.lesson_task_min', 30) },
                { value: 60, label: this.$i18n.tc('message.lesson_task_hour', 1) },
                { value: 180, label: this.$i18n.tc('message.lesson_task_hour', 2) },
                { value: 360, label: this.$i18n.tc('message.lesson_task_hour', 6) },
                { value: 720, label: this.$i18n.tc('message.lesson_task_hour', 12) },
                { value: 1440, label: this.$i18n.tc('message.lesson_task_day', 1) },
                { value: 4320, label: this.$i18n.tc('message.lesson_task_day', 3) },
                { value: 10080, label: this.$i18n.tc('message.lesson_task_week', 1) },
                { value: 20160, label: this.$i18n.tc('message.lesson_task_week', 2) },
                { value: 43200, label: this.$i18n.tc('message.lesson_task_month', 1) }
            ],
            editorConfig: {
                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'insertLink', 'formatOLSimple', 'formatUL'],
                pluginsEnabled: ['lists', 'link', 'charCounter', 'image'],
                initOnClick: false,
                attribution: false,
                language: process.env.VUE_APP_EXTENSION_CODE,
                heightMin: 182,
                heightMax: 550,
                charCounterMax: 5000,
                key: 'DUA2yF1D2A1A9B4B3pialdcF-7B-32qC2E-13zdC3E3G3C7B6B5A4E4F3B1==',
                placeholderText: this.$i18n.t('message.form_label_lesson_desc'),
                pasteAllowedStyleProps: [''],
                filesManagerAllowedTypes: [''],
                videoAllowedTypes: [''],
                imagePaste: false,
                imageUpload: false,
                pastePlain: true
            },
            editorConfig2: {
                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'insertLink', 'formatOLSimple', 'formatUL'],
                pluginsEnabled: ['lists', 'link', 'charCounter', 'image'],
                initOnClick: false,
                attribution: false,
                language: process.env.VUE_APP_EXTENSION_CODE,
                heightMin: 182,
                heightMax: 550,
                charCounterMax: 5000,
                key: 'DUA2yF1D2A1A9B4B3pialdcF-7B-32qC2E-13zdC3E3G3C7B6B5A4E4F3B1==',
                placeholderText: this.$i18n.t('message.form_label_lesson_task'),
                pasteAllowedStyleProps: [''],
                filesManagerAllowedTypes: [''],
                videoAllowedTypes: [''],
                imagePaste: false,
                imageUpload: false,
                pastePlain: true
            }
        }
    },

    // Валидация
    validations() {
        return {
            formData: {
                posterPreview: {
                    required: requiredIf(() => !this.video.cover_time > 0)
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
                },
                video: {
                    required
                }
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
        // Загрузка категорий курсов
        this.$store.dispatch('loadCourseСategories')

        // Загрузка данных об уроке
        if(this.$options.propsData.lessonInfo.id) {
            this.$store.dispatch('lessonInfo/editLessonInfo', this.$options.propsData.lessonInfo.id).then(res => {
                if(res.success) {
                    // Запись данных
                    this.formData = res.data

                    // Прелоадер
                    setTimeout(() => {
                        this.preloader = false
                    }, 300)
                }
            })
        }
    },

    mounted () {
        // Добавление доп. видео
        this.$root.$on('addLessonMaterialEvent', materials => {
            // Финиш прогрессбара
            this.$Progress.finish()

            this.formData.additional_files = this.formData.additional_files.concat(materials)
        })


        // Удаление урока
        this.$root.$on('deleteLessonEvent', () => {
            // Старт прогрессбара
            this.$Progress.start()

            // Прелоадер
            this.preloader = true

            this.$store.dispatch('lessonInfo/deleteLesson', this.formData.id).then(() => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Показ сообщения об успешном запросе
                this.$toast.clear()
                this.$toast.success(this.$t('message.notification_success_delete_lesson'))

                // Закрыть всплыв. окно
                this.closeModal()

                // Обновляем список уроков
                this.$root.$emit('updateAuthorLessonsEvent')
            })
        })
    },

    methods: {
        // Закрыть всплыв. окно
        closeModal() {
            this.$root.$emit('closeCreateLessonModalEvent')
        },


        // Загрузка постера
        fileUpload () {
            let file = this.$refs.lesson_poster.files[0]

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
                // Удаление изображения
                this.fileDelete()

                // Показ ошибки
                this.$toast.error(this.$t('message.notification_error_poster_size'))
            }
        },

        // Удаление постера
        fileDelete () {
            this.formData.posterPreview = ''
            this.formData.image = ''
            this.$refs.lesson_poster.value = ''
        },

        // Перетаскивание картинки в область
        fileDragOver(e) {
            e.preventDefault()
        },

        // Перетаскивание картинки в область
        fileDrop(e) {
            e.preventDefault()

            this.$refs.lesson_poster.files = e.dataTransfer.files
            this.fileUpload()
        },


        // Загрузка видео урока
        videoUpload () {
            let videoFile = this.$refs.video_file.files[0]

            // Проверка веса видео файла
            if(videoFile.size <= 2147483648){
                this.formData.video = videoFile
            } else {
                // Удаление видео файда
                this.deleteVideoFile()

                // Показ ошибки
                this.$toast.error(this.$t('message.notification_error_video_size'))
            }
        },

        // Удаление видео урока
        deleteVideoFile () {
            this.formData.video = false
            this.$refs.video_file.value = ''
        },


        // Загрузка файлов для скачивания
        downloadFileUpload () {
            let files = this.$refs.download_files.files,
                approvedАiles = [],
                error = false

            // Проверка веса каждого файла
            files.forEach(function(file) {
                file.size <= 524288000
                    ? approvedАiles.push(file)
                    : error = true
            })

            this.formData.download_files = this.formData.download_files.concat(approvedАiles)

            // Показ ошибки
            if(error){ this.$toast.error(this.$t('message.notification_error_download_file_size')) }
        },

        deleteDownloadFile (fileIndex) {
            let fileList = [...this.formData.download_files]

            fileList.splice(fileIndex, 1)

            this.formData.download_files = fileList
        },


        // Показаться всплыв. окно добавления модуля
        openAddLessonMaterialModal () {
            this.showLessonMaterialModal = true
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно добавления модуля
        closeAddLessonMaterialModal () {
            this.showLessonMaterialModal = false
            document.body.classList.add('lock')
        },


        // Удаление доп. материала
        deleteLessonMaterial (fileIndex) {
            let fileList = [...this.formData.additional_files]

            fileList.splice(fileIndex, 1)

            this.formData.additional_files = fileList
        },


        // Показаться всплыв. окно удаления урока
        openDeleteLessonModal () {
            this.showDeleteLessonModal = true
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно удаления урока
        closeDeleteLessonModal () {
            this.showDeleteLessonModal = false
            document.body.classList.remove('lock')
        },


        // Копирование url курса
        onCopy () {
            // Показ сообщения об успешном копировании
            this.$toast.success(this.$t('message.notification_success_link_copy'))
        },


        // Ввод времени видео
        timeKeydown () {
            setTimeout(() => {
                if(this.video.cover_hours > 60){
                    this.video.cover_hours = 60
                }

                if(this.video.cover_minutes > 60){
                    this.video.cover_minutes = 60
                }

                if(this.video.cover_seconds > 60){
                    this.video.cover_seconds = 60
                }

                this.video.cover_time = parseInt(this.video.cover_hours*360 + this.video.cover_minutes * 60 + this.video.cover_seconds)

                // Скрываем ошибку
                this.video.time_error = false
            })
        },


        // Проверка продолжительности видео
        checkVideoDuration () {
            return new Promise((resolve) => {
                if(this.formData.video.type != 'file') {
                    var videoFile = this.formData.video,
                    testVideo = document.createElement('video'),
                        _self = this

                    testVideo.preload = 'metadata'
                    testVideo.src = URL.createObjectURL(videoFile)

                    testVideo.onloadedmetadata = () => {
                        window.URL.revokeObjectURL(testVideo.src)

                        this.formData.video_duration = parseInt(testVideo.duration)

                        if(_self.video.cover_time > parseInt(testVideo.duration)){
                            // Показ ошибки
                            _self.video.time_error = true

                            // Скролл к верху страницы/всплывашки
                            document.querySelector('.modal_scroll').scrollTop = 0
                        }

                        resolve(_self.video.time_error)
                    }
                } else {
                    resolve(this.video.time_error)
                }
            })
        },


        // Отправка формы
        onSubmit() {
            // Проверка валидации формы
            this.$v.$touch()

            if (!this.$v.$invalid) {
                // Блокировка формы
                this.processing = true

                // Статус завершения загрузки
                this.$store.state.lessonInfo.completedStatus = false

                // Старт прогрессбара
                this.$Progress.start()

                // Проверка продолжительности видео
                this.checkVideoDuration().then(result => {
                    if(!result) {
                        // Подготовка данных к отправке
                        let formDataTemp = new FormData()

                        formDataTemp.append('name', this.formData.name)
                        formDataTemp.append('category_id', this.formData.category_id)
                        formDataTemp.append('description', this.formData.description)
                        formDataTemp.append('short_description', this.formData.short_description)
                        formDataTemp.append('task', this.formData.task)
                        formDataTemp.append('task_min', this.formData.task_min)
                        formDataTemp.append('slug', this.formData.slug)
                        formDataTemp.append('time', this.video.cover_time)
                        formDataTemp.append('video_duration', this.formData.video_duration)

                        typeof this.formData.video === 'object'
                            ? formDataTemp.append('video', this.formData.video)
                            : formDataTemp.append('video', JSON.stringify(this.formData.video))

                        if(this.formData.id) {
                            formDataTemp.append('id', this.formData.id)
                        }

                        if(this.$refs.lesson_poster.files.length > 0){
                            formDataTemp.append('image', this.$refs.lesson_poster.files[0])
                        }


                        // Файлы для скачивания
                        this.formData.download_files.forEach(function(item) {
                            item.id
                                ? formDataTemp.append('download[]', JSON.stringify(item))
                                : formDataTemp.append('download_files[]', item)
                        })

                        if(!formDataTemp.get('download_files[]')) {
                            formDataTemp.append('download_files[]', '')
                        }

                        if(!formDataTemp.get('download[]')) {
                            formDataTemp.append('download[]', '')
                        }


                        // Дополнительные видео
                        this.formData.additional_files.forEach(function(item) {
                            item.file
                                ? formDataTemp.append('additional_files[]', item.file, item.name)
                                : formDataTemp.append('additional[]', JSON.stringify(item))
                        })

                        if(!formDataTemp.get('additional_files[]')) {
                            formDataTemp.append('additional_files[]', '')
                        }

                        if(!formDataTemp.get('additional[]')) {
                            formDataTemp.append('additional[]', '')
                        }

                        // Открытие всплывашки с прогрессом
                        this.$root.$emit('openCreateLessonProgressModalEvent')

                        // Запрос на сервер
                        let requestMethod = this.formData.id ? 'lessonInfo/updateLesson' : 'lessonInfo/createLesson'

                        this.$store.dispatch(requestMethod, formDataTemp).then(res => {
                            // Ошибка запроса на сервер
                            if(res.error) {
                                // Разблокировка формы
                                this.processing = false

                                // Показ ошибки
                                this.$toast.clear()
                                this.formData.id
                                    ? this.$toast.error(this.$t('message.notification_error_update_lesson'))
                                    : this.$toast.error(this.$t('message.notification_error_create_lesson'))

                                // Финиш прогрессбара
                                this.$Progress.finish()

                                // Показ всплыв. окна лимита хранилища
                                if(res.data.memory){
                                    this.$root.$emit('closeCreateLessonProgressModalEvent')
                                    this.$root.$emit('openLimitMemoryModalEvent')
                                }

                                return
                            }

                            // Статус завершения загрузки
                            this.$store.state.lessonInfo.completedStatus = true

                            // Закрыть всплыв. окно
                            this.closeModal()

                            // Финиш прогрессбара
                            this.$Progress.finish()

                            // Показ сообщения об успешном запросе
                            this.$toast.clear()
                            this.formData.id
                                ? this.$toast.success(this.$t('message.notification_success_update_lesson'))
                                : this.$toast.success(this.$t('message.notification_success_create_lesson'))

                            // Обновляем список уроков
                            this.$root.$emit('updateAuthorLessonsEvent')
                        })
                    } else {
                        // Разблокировка формы
                        this.processing = false

                        // Финиш прогрессбара
                        this.$Progress.finish()
                    }
                })
            } else {
                // Показ сообщения об ошибки
                this.$toast.error(this.$t('message.notification_error_required'))

                // Скролл к верху страницы/всплывашки
                document.querySelector('.modal_scroll').scrollTop = 0
            }
        }
    },

    watch: {
        // Проверка slug на уникальность
        'formData.slug': function () {
            if (this.formData.slug.length > 0 && this.watchEnable) {
                this.$store.dispatch('checkLessonSlug', {slug: this.formData.slug, id: this.formData.id}).then(res => {
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