<template>
    <!-- Комментарии -->
    <section class="comments">
        <!-- Комментарии - Заголовок блока -->
        <div class="head">
            <!-- Комментарии - Заголовок блока - Иконка -->
            <svg class="icon"><use xlink:href="/images/sprite.svg#ic_comment"></use></svg>

            <!-- Комментарии - Заголовок блока - Текст -->
            <span v-if="!totalComments">{{ $t('message.comments_empty_block_title') }}</span>
            <span v-else>{{ $tc('message.comments_block_title', totalComments) }}</span>
        </div>


        <!-- Комментарии - Форма -->
        <div class="add_comment">
            <form @submit.prevent="onNewSubmit" :class="{ processing: processing }">
                <div class="field">
                    <!-- Комментарии - Форма - Поле ввода -->
                    <textarea-autosize v-model.trim="comment"
                        :class="{ active: comment.length != 0 }" />

                    <!-- Комментарии - Форма - Название поля -->
                    <div class="label">
                        {{ $t('message.form_placeholder_comments') }}
                    </div>
                </div>

                <!-- Комментарии - Форма - Кнопка отправки -->
                <button type="submit" class="submit_btn">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_send"></use></svg>
                </button>
            </form>
        </div>


        <!-- Комментарии - Список -->
        <div class="list">
            <!-- Комментарии - Комментарий -->
            <CommentItem v-for="(comment, index) in comments" :key="`${index}`" :comment="comment" :lessonSlug="lessonSlug" :lessonAuthorId="lessonAuthorId" />
        </div>


        <!-- Комментарии - Форма -->
        <div class="add_comment" v-show="totalComments > 20">
            <form @submit.prevent="onNewSubmit" :class="{ processing: processing }">
                <div class="field">
                    <!-- Комментарии - Форма - Поле ввода -->
                    <textarea-autosize v-model.trim="comment"
                        :class="{ active: comment.length != 0 }" />

                    <!-- Комментарии - Форма - Название поля -->
                    <div class="label">
                        {{ $t('message.form_placeholder_comments') }}
                    </div>
                </div>

                <!-- Комментарии - Форма - Кнопка отправки -->
                <button type="submit" class="submit_btn">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_send"></use></svg>
                </button>
            </form>
        </div>


        <!-- Кнопка скролла к верху страницы -->
        <back-to-top visibleoffset="1500" class="tablet_hide"><span></span></back-to-top>
    </section>
</template>


<script>
// Импорт CSS
import '@/assets/css/component/comments.css'

// Импорт компонентов
import CommentItem from "@/components/comments/CommentItem.vue"

export default {
    name: 'CommentsList',

    // Данные из вне
    props: ['comments', 'totalComments', 'lessonSlug', 'lessonAuthorId'],

    // Компоненты
    components: {
        CommentItem // Шаблон комментария
    },

    // Локальные данные
    data () {
        return {
            processing: false,
            comment: ''
        }
    },

    mounted() {
        // Сокеты - Подключение к каналу и прослушка события появления нового комментария
        window.Echo.channel(`doctrine_database_app-comments.${this.$route.params.lessonSlug}`).listen('CommentMessage', (payload) => {
            this.$store.commit('lessonInfo/SET_COMMENT', payload)
        })
    },

    methods: {
        // Отправка нового комментария
        onNewSubmit () {
            // Блокировка формы
            this.processing = true

            // Старт прогрессбара
            this.$Progress.start()

            // Подготовка данных для отправки
            let formDataTemp = {
                slug: this.lessonSlug,
                comment: this.comment
            }

            // Запрос на сервер
            this.$store.dispatch('lessonInfo/addComment', formDataTemp).then(res => {
                // Разблокировка формы
                this.processing = false

                // Финиш прогрессбара
                this.$Progress.finish()

                // Ошибка запроса на сервер
                if(res.error) {
                    // Показ сообщения об ошибке
                    this.$toast.error(this.$t('message.notification_error_comment_add'))
                }

                // Успешный запрос на сервер
                if(res.success) {
                    // Очищаем поле комментария
                    this.comment = ''

                    // Показ сообщения об успешном изменении
                    this.$toast.success(this.$t('message.notification_success_comment_add'))
                }
            })
        }
    }
}
</script>