export default class Form {
	constructor(forms) {
		this.forms = document.querySelectorAll(forms)
		this.path = 'assets/question.php'
		this.inputs = document.querySelectorAll('input')

		this.message = {
			loading: 'Загрузка...',
			success: 'Скоро мы с вами свяжемся!',
			failure: 'Что пошло не так...',
		}
	}

	async postData(url, data) {
		let res = await fetch(url, {
			method: 'POST',
			body: data,
		})

		return await res.text()
	}

	checkTextInputs() {
		let txtInputs = document.querySelectorAll('[type="email"]')

		txtInputs.forEach((item) => {
			item.addEventListener('keypress', function (e) {
				if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
					e.preventDefault()
				}
			})
		})
	}

	initMask() {
		function setCursorPosition(pos, elem) {
			elem.focus()
			if (elem.setSelectionRange) {
				elem.addEventListener('mouseup', () => {
					elem.setSelectionRange(pos, pos)
				})
			} else if (elem.createTextRange) {
				let range = elem.createTextRange()
				range.addEventListener('mouseup', () => {
					range.collaps(true)
					range.moveEnd('character', pos)
					range.moveStart('character', pos)
					range.select()
				})
			}
		}

		function createMask(event) {
			let matrix = '+1 (___) ___-__'
			let i = 0
			let def = matrix.replace(/\D/g, '')
			let val = this.value.replace(/\D/g, '')

			if (def.length >= val.length) {
				val = def
			}

			this.value = matrix.replace(/./g, function (a) {
				return /[_\d]/.test(a) && i < val.length
					? val.charAt(i++)
					: i >= val.length
					? ''
					: a
			})

			if (event.type === 'blur') {
				if (this.value.length == 2) {
					this.value = ''
				}
			} else {
				setCursorPosition(this.value.length, this)
			}
		}

		let inputs = document.querySelectorAll('[name="phone"]')

		inputs.forEach((input) => {
			input.addEventListener('input', createMask)
			input.addEventListener('focus', createMask)
			input.addEventListener('blur', createMask)
		})
	}

	clearInputs() {
		this.inputs.forEach((item) => {
			item.value = ''
		})
	}

	init() {
		this.checkTextInputs()
		this.initMask()

		this.forms.forEach((form) => {
			form.addEventListener('submit', (e) => {
				e.preventDefault()

				let statusMessage = document.createElement('div')
				statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `
				form.parentNode.appendChild(statusMessage)
				statusMessage.textContent = this.message.loading

				const formData = new FormData(form)

				this.postData(this.path, formData)
					.then((res) => {
						console.log(res)
						statusMessage.textContent = this.message.success
					})
					.catch(() => {
						statusMessage.textContent = this.message.failure
					})
					.finally(() => {
						this.clearInputs()
						setTimeout(() => {
							statusMessage.remove()
						}, 6000)
					})
			})
		})
	}
}
