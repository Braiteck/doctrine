<template>
    <!-- Прелоадер -->
    <Preloader v-if="preloader" />

    <section class="page_data" v-else>
        <!-- Нет доступа к уроку -->
        <AccessDenied v-if="accessDenied" />

        <!-- Урок -->
        <section class="lesson_info free row block" v-else>
            <section class="video_wrap">
                <!-- Урок - Видео -->
                <div class="video full_width" v-if="lesson.video.status === 1">
                    <!-- Прелоадер -->
                    <Preloader />

                    <!-- Урок - Видео - Из файла -->
                    <video id="player" v-if="lesson.video.type == 'file'" playsinlne :data-poster="this.imagesUrl + this.lesson.image">
                        <source :src="lesson.video.url" type="application/x-mpegURL">
                    </video>

                    <!-- Урок - Видео - С Youtube -->
                    <div id="player" data-plyr-provider="youtube" :data-plyr-embed-id="lesson.video.id" v-if="lesson.video.type == 'youtube'"></div>

                    <!-- Урок - Видео - С Vimeo -->
                    <div id="player" data-plyr-provider="vimeo" :data-plyr-embed-id="lesson.video.id" v-if="lesson.video.type == 'vimeo'"></div>
                </div>


                <!-- Урок - Видео обрабатывается -->
                <div class="video full_width" v-if="lesson.video.status === 2">
                    <div class="processed">
                        <!-- Прелоадер -->
                        <Preloader />

                        <!-- Урок - Видео обрабатывается - Текст -->
                        <div class="status_text">{{ $t('message.lesson_video_status') }}</div>
                    </div>
                </div>
            </section>


            <section class="data">
                <!-- Урок - Описание -->
                <section class="description left">
                    <div class="desc" v-if="lesson.description">
                        <!-- Урок - Описание - Заголовок -->
                        <div class="title">{{ $t('message.lesson_description_title') }}</div>

                        <!-- Урок - Описание - Текст -->
                        <div class="text_block" v-html="lesson.description"></div>
                    </div>

                    <!-- Урок - Описание - Задание -->
                    <div class="tasks" v-if="lesson.task">
                        <!-- Урок - Описание - Задание - Заголовок -->
                        <div class="title">
                            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_task"></use></svg>
                            <span>{{ $t('message.lesson_task_title') }}</span>
                        </div>

                        <!-- Урок - Описание - Задание - Текст -->
                        <div class="text_block" v-html="lesson.task"></div>

                        <!-- Урок - Описание - Задание - Время выполнения -->
                        <div class="time">
                            {{ $t('message.lesson_task_time') }}
                            <b>{{ $tc('message.lesson_task_min', lesson.task_min) }}</b>
                        </div>
                    </div>
                </section>


                <section class="col_right right">
                    <!-- Урок - Материалы -->
                    <LessonMaterials :videos="lesson.additional_files" v-if="lesson.additional_files.length > 0" />


                    <!-- Урок - Файлы -->
                    <LessonFiles :files="lesson.download_files" v-if="lesson.download_files.length > 0" />
                </section>


                <!-- Урок - Заметки -->
                <LessonNotes :notes="lesson.notes" :totalNotes="lesson.total_notes" :loadStatus="lesson.loadStatus" :lessonSlug="lesson.slug" class="left" v-if="$store.state.user.data.route == 'user'" />


                <!-- Урок - Комментарии -->
                <Comments :comments="lesson.comments" :totalComments="lesson.total_comments" :lessonSlug="lesson.slug" :lessonAuthorId="lesson.author.id" class="left" />

                <div class="clear"></div>
            </section>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/error.css'
import '@/assets/css/page/lessonInfo.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"
import AccessDenied from "@/components/AccessDenied.vue"
import Comments from "@/components/comments/Comments.vue"
import LessonNotes from "@/components/lesson/Notes.vue"
import LessonMaterials from "@/components/lesson/Materials.vue"
import LessonFiles from "@/components/lesson/Files.vue"

// Импорт Hls & Plyr
import Plyr from 'plyr'
import Hls from 'hls.js'

import 'plyr/dist/plyr.css'

export default {
    name: 'LessonInfo',

    // Мета данные
    metaInfo: function () {
        return {
            title: this.lesson.name,
            bodyAttrs: {
                class: this.$store.state.user.data.route == 'user' ? 'mini' : ''
            }
        }
    },

    // Компоненты
    components: {
        Preloader, // Прелоадер
        AccessDenied, // Нет доступа к уроку
        LessonNotes, // Заметки к уроку
        LessonMaterials, // Материалы к уроку
        LessonFiles, // Файлы для скачивания
        Comments // Комментарии
    },

    // Локальные данные
    data () {
        return {
            preloader: true,
            accessDenied: false,
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            lesson: {}
        }
    },

    beforeCreate () {
        // Загрузка данных урока
        this.$store.dispatch('lessonInfo/loadLessonInfo', this.$route.params.lessonSlug).then(res => {
            // Прелоадер
            this.preloader = false

            if(res.error){
                // Нет доступа к уроку
                this.accessDenied = true
            } else {
                // Запись данных
                this.lesson = this.$store.state.lessonInfo.data

                // Запуск плеера
                setTimeout(() => { this.initPlayer() })

                // Запись данных в шапке об уроке
                this.$root.$emit('setHeaderLessonEvent', {courseSlug: this.$route.params.courseSlug, ...this.lesson})
            }
        })
    },

    destroyed () {
        // Убрать данные об уроке из шапки
        this.$root.$emit('setHeaderLessonEvent', false)

        // Разрушение плеера
        window.hls.destroy()
    },

    methods: {
        // Инициализация плеера
        initPlayer() {
            const video = document.getElementById('player'),
                // Параметры плеера
                defaultOptions = {
                    fullscreen: { enabled: true, fallback: true, iosNative: true, container: null },
                    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
                    settings: ['quality', 'speed', 'loop'],
                    i18n: this.$i18n.t('message.plyr_player'),
                    vimeo: {
                        background: true
                    },
                    youtube: {
                        noCookie: true,
                        controls: 0,
                        iv_load_policy: 3,
                        modestbranding: 1,
                        rel: 0,
                        fs: 0,
                        showinfo: 0
                    }
                }

            // HLS
            if (Hls.isSupported()) {
                const hls = new Hls({
                    maxBufferSize: 50 * 1024 * 1024
                })

                hls.loadSource(this.lesson.video.url)

                // HLS - определание качества видео
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    const availableQualities = hls.levels.map((l) => l.height)

                    // Дополнение параметров плеера
                    defaultOptions.quality = {
                        default: availableQualities[0],
                        options: availableQualities,
                        forced: true,
                        onChange: quality => {
                            hls.levels.forEach((level, levelIndex) => {
                                if (level.height === quality) {
                                    hls.currentLevel = levelIndex
                                }
                            })
                        }
                    }

                    // Инициализация
                    new Plyr(video, defaultOptions)
                })

                hls.attachMedia(video)
                window.hls = hls
            } else {
                // Инициализация
                new Plyr(video, defaultOptions)
            }
        }
    }
}
</script>