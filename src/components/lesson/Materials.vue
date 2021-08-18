<template>
    <!-- Доп. материалы -->
    <div class="materials">
        <!-- Доп. материалы - Заголовок -->
        <div class="head" @click.prevent="toggleMobMaterials">
            <!-- Доп. материалы - Заголовок - Иконка -->
            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_files"></use> </svg>

            <!-- Доп. материалы - Заголовок - Текст -->
            <span>{{ $t('message.lesson_materials_title') }}</span>

            <!-- Доп. материалы - Заголовок - Моб. стрелка -->
            <div class="arr"></div>
        </div>


        <!-- Доп. материалы - Список -->
        <div class="list">
            <!-- Доп. материалы - Список - Материал -->
            <button class="material" v-for="(video, index) in videos" :key="`${index}`" @click.prevent="openModal(video)">
                <!-- Доп. материалы - Список - Материал - Изображение -->
                <div class="thumb">
                    <img v-lazy="imagesUrl + video.poster_video" alt="" class="lazyload" v-if="!video.type">
                    <img v-lazy="`https://img.youtube.com/vi/${video.video_id}/0.jpg`" alt="" class="lazyload" v-if="video.type == 'youtube'">
                    <img v-lazy="imagesUrl + video.poster" alt="" class="lazyload" v-if="video.type == 'vimeo'">

                    <!-- Доп. материалы - Список - Материал - Изображение - Иконка -->
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_video_play"></use></svg>
                </div>

                <div>
                    <!-- Доп. материалы - Список - Материал - Название -->
                    <div class="name">{{ video.name }}</div>
                </div>
            </button>
        </div>


        <!-- Всплыв. окно с видео -->
        <transition name="fade">
        <VideoModal v-if="showMaterialModal" @closeModalEvent='closeModal' :video="showMaterialModal" />
        </transition>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/lesson/Materials.css'

// Импорт компонентов
import VideoModal from "@/components/modal/VideoModal.vue"

export default {
    name: 'LessonMaterials',

    // Данные из вне
    props: ['videos'],

    // Компоненты
    components: {
        VideoModal // Всплыв. окно с видео
    },

    // Локальные данные
    data () {
        return {
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            showMaterialModal: false
        }
    },

    methods: {
        // Показать всплыв. окно с видео
        openModal(video) {
            this.showMaterialModal = video
            document.body.classList.add('lock')
        },

        // Скрыть всплыв. окно с видео
        closeModal() {
            this.showMaterialModal = false
            document.body.classList.remove('lock')
        },


        // Моб. отображение материалов
        toggleMobMaterials(event) {
            let parent = event.target.closest('.materials'),
                btn = parent.querySelector('.head')

            !btn.classList.contains('active')
                ? btn.classList.add('active')
                : btn.classList.remove('active')
        }
    }
}
</script>