export default class Slider {
	constructor({
		container = null,
		btns = null,
		btnNext = null,
		btnPrev = null,
		next = null,
		prev = null,
		activeClass = '',
		animate,
		autoplay,
	} = {}) {
		this.container = document.querySelector(container)
		try {
			this.slides = this.container.children
		} catch (e) {}
		this.btnNext = document.querySelectorAll(btnNext)
		this.btnPrev = document.querySelectorAll(btnPrev)
		this.btns = document.querySelectorAll(btns)
		this.prev = document.querySelector(prev)
		this.next = document.querySelector(next)
		this.activeClass = activeClass
		this.animate = animate
		this.autoplay = autoplay
		this.slideIndex = 1
	}
}
