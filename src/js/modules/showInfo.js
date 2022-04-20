export default class ShowInfo {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers)

    }


    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!btn.closest('.module__info-show').nextElementSibling.classList.contains('fadeInUp')) {
                    btn.closest('.module__info-show').nextElementSibling.classList.add('animated', 'fadeInUp')
                    btn.closest('.module__info-show').nextElementSibling.style.display = 'block'
                } else {
                    btn.closest('.module__info-show').nextElementSibling.classList.remove('fadeInUp')
                    btn.closest('.module__info-show').nextElementSibling.style.display = 'none'
                }

            })
        })
    }
}