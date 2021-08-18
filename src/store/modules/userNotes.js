import Vue from 'vue'

export default {
    namespaced: true,

    state: () => ({
        limit: 6,
        loadStatus: false,
        total_lessons: 0,
        total_notes_all: 0,
        data: [],
        lesson: {
            loadStatus: false,
            notes: []
        }
    }),


    mutations: {
        // Запись данных о уроках
        SET_LESSONS(state, lessons) {
            // Запись данных в state
            state.data = state.data.concat(lessons.data)
            state.total_lessons = lessons.total_lessons
            state.total_notes_all = lessons.total_notes_all

            // Определение есть ли дозагрузка у уроков
            state.total_lessons - state.data.length > 0
                ? state.loadStatus = true
                : state.loadStatus = false

            // Определение есть ли дозагрузка у заметок в каждом уроке
            state.data.forEach(function (item) {
                item.total_notes - item.notes.length > 0
                    ? item.loadStatus = true
                    : item.loadStatus = false
            })
        },


        // Запись данных о заметках урока
        SET_LESSON_NOTES(state, data) {
            // Выбираем урок по slug
            let lesson = state.data.find(lesson => lesson.slug == data.slug)

            // Добавляем новые заметки в массив
            lesson.notes = lesson.notes.concat(data.notes)

            // Определение есть ли дозагрузка у заметок в каждом уроке
            lesson.total_notes - lesson.notes.length > 0
                ? lesson.loadStatus = true
                : lesson.loadStatus = false
        },


        // Запись данных об уроке
        SET_LESSON(state, data) {
            // Запись данных в state
            state.lesson.name = data.data.name
            state.lesson.slug = data.data.slug
            state.lesson.notes = state.lesson.notes.concat(data.data.notes)
            state.lesson.total_notes = data.total_notes

            // Определение есть ли дозагрузка заметок
            state.lesson.total_notes - state.lesson.notes.length > 0
                ? state.lesson.loadStatus = true
                : state.lesson.loadStatus = false
        }
    },


    actions: {
        // Получение списка уроков
        async loadLessons({ state, commit }) {
            return await Vue.axios.get('/auth/notes', {
                params: {
                    limit: state.limit,
                    offset: state.data.length
                }
            })
                .then(res => {
                    commit('SET_LESSONS', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Получение списка заметок для одного урока
        async loadLessonNotes({ state, commit }, lessonSlug) {
            let lesson = state.data.find(lesson => lesson.slug == lessonSlug)

            return await Vue.axios.get('/auth/notes/lesson', {
                params: {
                    slug: lessonSlug,
                    limit: state.limit,
                    offset: lesson.notes.length
                }
            })
                .then(res => {
                    commit('SET_LESSON_NOTES', res.data.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Получение данных одного урока
        async loadLesson({ state, commit }, lessonSlug) {
            return await Vue.axios.get('/auth/notes/lesson', {
                params: {
                    slug: lessonSlug,
                    limit: state.limit,
                    offset: state.lesson.notes.length
                }
            })
                .then(res => {
                    commit('SET_LESSON', res.data)
                    return res.data
                })
                .catch(error => error.response.data)
        },


        // Удаление заметки
        async deleteNote({ state }, { lessonSlug, noteID }) {
            var lesson = state.data.find(lesson => lesson.slug == lessonSlug)

            if (typeof (lesson) == 'undefined') {
                lesson = state.lesson
            }

            // Удаление заметки из массива
            let noteIndex = lesson.notes.findIndex(note => note.id == noteID)
            lesson.notes.splice(noteIndex, 1)

            // Изменение тотала заметок в уроке
            lesson.total_notes--

            // Изменение тотала заметок
            state.total_notes_all--

            // Если удалили все заметки, то удаляем и урок из массива
            if (lesson.total_notes == 0) {
                let lessonIndex = state.data.findIndex(lesson => lesson.slug == lessonSlug)
                state.data.splice(lessonIndex, 1)

                // Изменение тотала уроков
                state.total_lessons--
            }

            return await Vue.axios.post('/auth/note/delete', { id: noteID })
                .then(res => res.data)
                .catch(error => error.response.data)
        }
    }
}