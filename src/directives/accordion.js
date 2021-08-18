import Vue from 'vue'

export default Vue.directive('accordion', {
    inserted: (el) => {
        let parent = el.closest('.item'),
            accordion = el.closest('.accordion')

        el.addEventListener('click', function (e) {
            if (e.composedPath()[0] === this) {
                if (!parent.classList.contains('active')) {
                    for (var item of accordion.querySelectorAll('.item')) {
                        item.classList.remove('active')
                    }

                    parent.classList.add('active')
                } else {
                    parent.classList.remove('active')
                }
            }
        })
    }
})