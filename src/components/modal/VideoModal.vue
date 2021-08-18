<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal video_modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="modal_title">
                    {{ video.name }}
                </div>


                <!-- Вспдыв. окно - Видео -->
                <div class="video_wrap">
                    <div class="video full">
                        <!-- Вспдыв. окно - Видео - Прелоадер -->
                        <Preloader />

                        <!-- Вспдыв. окно - Видео из файла -->
                        <video id="modal_player" v-if="!video.type" playsinlne>
                            <source :src="video.url" type="video/mp4">
                        </video>

                        <!-- Вспдыв. окно - Видео с Youtube -->
                        <div id="modal_player" data-plyr-provider="youtube" :data-plyr-embed-id="video.video_id" v-if="video.type == 'youtube'"></div>

                        <!-- Вспдыв. окно - Видео с Vimeo -->
                        <div id="modal_player" data-plyr-provider="vimeo" :data-plyr-embed-id="video.video_id" v-if="video.type == 'vimeo'"></div>
                    </div>
                </div>
            </section>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/modal/videoModal.css'

// Импорт компонентов
import Preloader from "@/components/Preloader.vue"

// Импорт Plyr
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

export default {
    name: 'VideoModal',

    // Данные из вне
    props: ['video'],

    // Компоненты
    components: {
        Preloader // Прелоадер
    },

    methods: {
        // Закрыть всплыв. окно
        closeModal() {
            this.$emit('closeModalEvent')
        }
    },

    mounted () {
        // Инициализация плеера
        const video = document.getElementById('modal_player'),
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
                    showinfo: 0
                }
            }

        // Инициализация
        new Plyr(video, defaultOptions)
    }
}
</script>