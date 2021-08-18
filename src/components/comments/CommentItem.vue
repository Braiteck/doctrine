<template>
    <div class="comment_wrap" :class="{ border: comment.response && comment.response.length && !comment.finish }">
        <!-- Комментарий -->
        <div class="comment">
            <!-- Комментарий - Аватар -->
            <div class="photo">
                <img v-lazy="imagesUrl + comment.user.avatar.avatar_mini" alt="" class="lazyload" v-if="comment.user.avatar">
                <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>
            </div>

            <!-- Комментарий - Имя, Фамилия -->
            <div class="name">{{ comment.user.name }} {{ comment.user.surname }}</div>

            <!-- Комментарий - Дата -->
            <div class="time">
                <timeago :datetime="comment.created_at" :auto-update="60"></timeago>
            </div>

            <!-- Комментарий - Текст -->
            <div class="text">{{ comment.comment }}</div>

            <!-- Комментарий - Кнопка "Ответить" -->
            <button class="reply_btn" @click.prevent="commentOpen = !commentOpen" v-if="!comment.finish">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_reply"></use></svg>
                <span>{{ $t('message.btn_reply') }}</span>
            </button>

            <!-- Комментарий - Кнопка удаления -->
            <button type="button" class="del_btn" @click.prevent="deleteComment(comment.id)" v-if="lessonAuthorId == $store.state.user.data.id">
                <svg class="icon"><use xlink:href="/images/sprite.svg#ic_delete"></use></svg>
            </button>
        </div>


        <!-- Форма ответа на комментарий -->
        <div class="add_reply" v-show="commentOpen" v-if="!comment.finish">
            <form @submit.prevent="onResponseSubmit" :class="{ processing: processing }">
                <!-- Форма ответа на комментарий - Аватар -->
                <div class="photo">
                    <img v-lazy="imagesUrl + user.avatar.avatar_mini" alt="" class="lazyload" v-if="user.avatar">
                    <img v-lazy="'/images/avatar_default_mini.jpg'" alt="" class="lazyload" v-else>
                </div>

                <!-- Форма ответа на комментарий - Поле ввода -->
                <div class="field">
                    <textarea-autosize v-model.trim="responseComment"
                        :placeholder="$t('message.form_placeholder_comments')"
                        :class="{ active: responseComment.length != 0 }" />
                </div>

                <!-- Форма ответа на комментарий - Кнопка отправки -->
                <button type="submit" class="submit_btn">
                    <svg class="icon"><use xlink:href="/images/sprite.svg#ic_send"></use></svg>
                </button>
            </form>
        </div>


        <!-- Ответы на комментарий -->
        <div class="children" v-if="comment.response && comment.response.length && !comment.finish">
            <!-- Ответы на комментарий - Комментарий -->
            <CommentItem v-for="(comment, index) in comment.response" :key="`${index}`" :comment="comment" :lessonSlug="lessonSlug" />
        </div>


        <!-- Прелоадер -->
        <Preloader v-if="preloader" />
    </div>
</template>


<script>
// Импорт компонентов
import Preloader from "@/components/Preloader.vue"

// Импорт Vuex
import { mapGetters } from 'vuex'

export default {
    name: 'CommentItem',

    // Данные из вне
    props: ['comment', 'lessonSlug', 'lessonAuthorId'],

    // Компоненты
    components: {
        Preloader // Прелоадер
    },

    // Локальные данные
    data () {
        return {
            preloader: false,
            imagesUrl: process.env.VUE_APP_IMAGES_URL,
            processing: false,
            commentOpen: false,
            responseComment: ''
        }
    },

    computed: {
        ...mapGetters({
            // Данные о пользователе
            user: 'user/getData'
        })
    },


    methods: {
        // Удаление комментария
        deleteComment () {
            // Старт прогрессбара
            this.$Progress.start()

            // Прелоадер
            this.preloader = true

            // Запрос на сервер
            this.$store.dispatch('lessonInfo/deleteComment', this.comment.id).then(res => {
                // Финиш прогрессбара
                this.$Progress.finish()

                // Ошибка запроса на сервер
                if(res.error) {
                    // Показ сообщения об ошибке
                    this.$toast.error(this.$t('message.notification_error_comment_delete'))

                    // Прелоадер
                    this.preloader = false
                }

                // Успешный запрос на сервер
                if(res.success) {
                    // Показ сообщения об успешном удалении
                    this.$toast.success(this.$t('message.notification_success_comment_delete'))
                }
            })
        },


        // Отправка ответа на комментарий
        onResponseSubmit () {
            // Блокировка формы
            this.processing = true

            // Старт прогрессбара
            this.$Progress.start()

            // Подготовка данных для отправки
            let formDataTemp = {
                slug: this.lessonSlug,
                comment: this.responseComment,
                response_id: this.comment.id
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
                    // Очищаем поле комментария и скрываем форму ответе
                    this.responseComment = '',
                    this.commentOpen = false

                    // Показ сообщения об успешном изменении
                    this.$toast.success(this.$t('message.notification_success_comment_add'))
                }
            })
        }
    }
}
</script>