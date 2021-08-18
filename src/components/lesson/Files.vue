<template>
    <!-- Файлы для скачивания -->
    <div class="files">
        <!-- Файлы для скачивания - Заголовок -->
        <div class="head" @click.prevent="toggleMobFiles">
            <!-- Файлы для скачивания - Заголовок - Иконка -->
            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_download"></use></svg>

            <!-- Файлы для скачивания - Заголовок - Текст -->
            <span>{{ $t('message.lesson_files_title') }}</span>

            <!-- Файлы для скачивания - Заголовок - Моб. стрелка -->
            <div class="arr"></div>
        </div>


        <!-- Файлы для скачивания - Список -->
        <div class="list">
            <!-- Файлы для скачивания - Список - Файл -->
            <a :href="file.url" class="file" target="_blank" v-for="(file, index) in files" :key="`${index}`">
                <!-- Файлы для скачивания - Список - Файл - Иконка -->
                <div class="icon">
                    <!-- Файлы для скачивания - Список - Файл - Расширение -->
                    <div class="name">{{ file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2) || 'file' }}</div>
                </div>

                <div>
                    <!-- Файлы для скачивания - Список - Файл - Название -->
                    <div class="file_name">{{ file.name.replace(/\.[^/.]+$/, "") }}</div>

                    <!-- Файлы для скачивания - Список - Файл - Вес -->
                    <div class="size">{{ parseFloat((file.size/Math.pow(1024, 2)).toFixed(2)) }} {{ $t('message.file_size_mb') }}</div>
                </div>
            </a>
        </div>
    </div>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/lesson/Files.css'

export default {
    name: 'LessonFiles',

    // Данные из вне
    props: ['files'],

    methods: {
        // Моб. отображение файлов
        toggleMobFiles(event) {
            let parent = event.target.closest('.files'),
                btn = parent.querySelector('.head')

            !btn.classList.contains('active')
                ? btn.classList.add('active')
                : btn.classList.remove('active')
        }
    }
}
</script>