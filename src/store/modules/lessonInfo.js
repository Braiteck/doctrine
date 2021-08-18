import Vue from 'vue'

export default {
    namespaced: true,

    state: () => ({
        limit: 6,
        percentCompleted: 0,
        completedStatus: false,
        data: [
            {
                loadStatus: false
            }
        ]
    }),


    mutations: {
        // Запись данных об уроке
        SET_LESSON(state, lesson) {
            state.data = lesson.data

            // Определение есть ли дозагрузка заметок
            state.data.total_notes - state.data.notes.length > 0
                ? state.data.loadStatus = true
                : state.data.loadStatus = false
        },


        // Дозагрузка заметок урока
        SET_NOTES(state, payload) {
            // Добавляем новые заметки в массив
            state.data.notes = state.data.notes.concat(payload.notes)

            // Определение есть ли дозагрузка заметок
            state.data.total_notes - state.data.notes.length > 0
                ? state.data.loadStatus = true
                : state.data.loadStatus = false
        },


        // Добавление новой заметки
        SET_NOTE(state, payload) {
            // Добавляем новую заметку в массив
            state.data.notes.unshift(payload)

            // Изменение тотала заметок
            state.data.total_notes++
        },


        // Добавление нового комментария
        SET_COMMENT(state, payload) {
            // Поиск комментария родительского если это ответ
            if (payload.comment.response_id) {
                window.parser = function (findId, comments) {
                    let comment = comments.find(comment => comment.id == findId)

                    if (comment === undefined) {
                        // Комментарий не найден - ищем глубже
                        comments.forEach(function (comment) {
                            window.parser(findId, comment.response)
                        })
                    } else {
                        // Комментарий найден - добавляем к нему ответ
                        comment.response.push(payload.comment)
                    }
                }

                // Поиск комментария
                window.parser(payload.comment.response_id, state.data.comments)
            } else {
                state.data.comments.unshift(payload.comment)
            }

            // Изменение тотала комментариев
            state.data.total_comments++
        },


        // Установка процентов загрузки
        SET_PERCENTS(state, payload) {
            // Изменение процента загрузки
            state.percentCompleted = payload
        },


        // Удаление комментария
        DELETE_COMMENT(state, commentId) {
            state.data.comments.forEach(function (commentFirst, index) {
                // Найден в первом уровне
                if (commentFirst.id === commentId) {
                    state.data.comments.splice(index, 1)
                } else {
                    commentFirst.response.forEach(function (commentSecond, index) {
                        // Найден во втором уровне
                        if (commentSecond.id === commentId) {
                            commentFirst.response.splice(index, 1)
                        } else {
                            commentFirst.response.forEach(function (commentThird, index) {
                                // Найден в третьем уровне
                                if (commentThird.id === commentId) {
                                    commentSecond.response.splice(index, 1)
                                }
                            })
                        }
                    })
                }
            })

            // Изменение тотала комментариев
            state.data.total_comments = state.data.total_comments - 1
        }
    },


    actions: {
        // Получение данных об уроке
        async loadLessonInfo({ commit }, lessonSlug) {
            return await Vue.axios.get('/auth/lesson', {
                params: {
                    slug: lessonSlug
                }
            })
                .then(res => {
                    commit('SET_LESSON', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Дозагрузка заметок урока
        async loadNotes({ state, commit }, lessonSlug) {
            return await Vue.axios.get('/auth/notes/lesson', {
                params: {
                    slug: lessonSlug,
                    limit: state.limit,
                    offset: state.data.notes.length
                }
            })
                .then(res => {
                    commit('SET_NOTES', res.data.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Добавление новой заметки
        async addNote({ commit }, formData) {
            return await Vue.axios.post('/auth/note/create', formData)
                .then(res => {
                    commit('SET_NOTE', res.data.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Удаление заметки
        async deleteNote({ state }, noteID) {
            if (state.data.notes) {
                // Удаление заметки из массива
                let noteIndex = state.data.notes.findIndex(note => note.id == noteID)
                state.data.notes.splice(noteIndex, 1)

                // Изменение тотала заметок
                state.data.total_notes--

                return await Vue.axios.post('/auth/note/delete', { id: noteID })
                    .then(res => res.data)
                    .catch(error => error.response.data)
            }
        },


        // Добавление нового комментария
        async addComment({ app }, formData) {
            console.log(app)
            return await Vue.axios.post('/auth/create/comment', formData)
                .then(res => res.data)
                .catch(error => error.response.data)
        },


        // Добавление нового комментария
        async deleteComment({ commit }, commentId) {
            return await Vue.axios.delete('/auth/comment/delete', {
                params: {
                    id: commentId
                }
            })
                .then(res => {
                    commit('DELETE_COMMENT', commentId)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Создание нового урока
        async createLesson({ commit }, formData) {
            return await Vue.axios.post('/auth/lesson/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress(progressEvent) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)

                    commit('SET_PERCENTS', percentCompleted)
                }
            })
                .then(res => res.data)
                .catch(error => error.response.data)
        },

        // Получение данных об уроке для редактирования
        async editLessonInfo({ app }, lessonId) {
            console.log(app)
            return await Vue.axios.get('/auth/lesson/show', {
                params: {
                    id: lessonId
                }
            })
                .then(res => res.data)
                .catch(error => error.response.data)
        },

        // Редактирование урока
        async updateLesson({ commit }, formData) {
            return await Vue.axios.post('/auth/lesson/update', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress(progressEvent) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)

                    commit('SET_PERCENTS', percentCompleted)
                }
            })
                .then(res => res)
                .catch(error => error.response.data)
        },

        // Удаление урока
        async deleteLesson({ app }, lessonID) {
            console.log(app)
            return await Vue.axios.delete('/auth/lesson/delete', {
                params: {
                    id: lessonID
                }
            })
                .then(res => res)
                .catch(error => error.response.data)
        }
    },


    getters: {
        getPercentsCompleted: state => state.percentCompleted,
        getCompletedStatus: state => state.completedStatus
    }
}