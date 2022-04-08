export default class Difference {
	constructor(oldOficer, newOficer, items) {
		this.oldOficer = document.querySelector(oldOficer)
		this.newOficer = document.querySelector(newOficer)
		this.oldItems = this.oldOficer.querySelectorAll(items)
		this.newItems = this.newOficer.querySelectorAll(items)
		this.oldCounter = 0
		this.newCounter = 0
	}

	bindTriggers(plus, counter, items) {
		plus.querySelector('.plus').addEventListener('click', () => {
			if (counter !== items.length - 2) {
				items[counter].style.display = 'flex'
				counter++
			} else {
				items[counter].style.display = 'flex'
				items[items.length - 1].remove()
			}
		})
	}

	hideItems(block) {
		block.forEach((item, i, arr) => {
			if (i !== arr.length - 1) {
				item.style.display = 'none'
			}
		})
	}

	init() {
		this.hideItems(this.oldItems)
		this.hideItems(this.newItems)
		this.bindTriggers(this.oldOficer, this.oldCounter, this.oldItems)
		this.bindTriggers(this.newOficer, this.newCounter, this.newItems)
	}
}
