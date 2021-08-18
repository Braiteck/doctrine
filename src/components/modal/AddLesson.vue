<template>
    <!-- Вспдыв. окно -->
    <section class="modal_container">
        <section class="modal_scroll" @click.self="closeModal">
            <section class="modal" id="add_lesson_modal">
                <!-- Вспдыв. окно - Кнопка закрытия -->
                <button class="close" @click.prevent="closeModal"></button>

                <!-- Вспдыв. окно - Заголовок -->
                <div class="modal_title">
                    {{ $t('message.modal_title_add_lesson', { module: module.name }) }}
                </div>


                <!-- Вспдыв. окно - Форма -->
                <form class="form">
                    <div class="line">
                        <div class="field">
                            <!-- Вспдыв. окно - Форма - Кнопка добавления нового урока -->
                            <button class="new_lesson_btn" @click.prevent="$root.$emit('openCreateLessonModalEvent')">
                                {{ $t('message.btn_add_new_lesson') }}
                            </button>
                        </div>
                    </div>


                    <div class="line">
                        <div class="field with_tip">
                            <!-- Вспдыв. окно - Поле ввода -->
                            <input type="text" class="input" v-model.trim="name" @input="$v.name.$touch" v-focus
                                :class="{ active: name.length != 0 }">

                            <!-- Вспдыв. окно - Название поля -->
                            <div class="label">
                                {{ $t('message.form_label_lesson_course_name') }}
                            </div>

                            <!-- Вспдыв. окно - Пдсказки -->
                            <div class="datalist" v-if="tips">
                                <!-- Вспдыв. окно - Пдсказки - Список -->
                                <div class="group lessons">
                                    <!-- Вспдыв. окно - Пдсказки - Список - Подсказка -->
                                    <div class="tip" v-for="(tip, index) in tips" :key="`${index}`" @click.prevent="chooseLesson(tip)">
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
                </form>
            </section>
        </section>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/modal/addLesson.css'

// Импорт валидаторов
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
    name: 'AddModuleModal',

    // Данные из вне
    props: ['module'],

    // Локальные данные
    data () {
        return {
            name: '',
            tips: false
        }
    },

    // Валидация
    validations: {
        name: {
            required,
            maxLength: maxLength(200)
        }
    },

    mounted () {
        this.findLesson()
    },

    methods: {
        // Закрыть всплыв. окно
        closeModal () {
            this.$emit('closeModalEvent')
        },


        // Выбор урока
        chooseLesson (lessonInfo) {
            // Старт прогрессбара
            this.$Progress.start()

            // Отправка данных о модуле
            this.$root.$emit('addLessonEvent', lessonInfo)

            // Закрыть всплыв. окно
            this.closeModal()
        },


        // Поиск урока при вводе символов
        findLesson () {
            this.$store.dispatch('findLesson', this.name).then(res => {
                this.tips = res.data
            })
        }
    },

    watch: {
        // Поиск урока при вводе символов
        'name': function () {
            console.log('dsgsdgsdgsd')
            this.findLesson()
        }
    }
}
</script>