import Vue from 'vue'

export default Vue.directive('toggle', {
    inserted: el => {
        let parent = el.closest('.item')

        el.addEventListener('click', function (e) {
            if (e.composedPath()[0] === this) {
                !parent.classList.contains('active')
                    ? parent.classList.add('active')
                    : parent.classList.remove('active')
            }
        })
    }
})