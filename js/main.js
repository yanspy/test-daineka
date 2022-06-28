const popupBtn = document.querySelector('#popup-btn');
const popupWrapElem = document.querySelector('#popup-wrap');
const formInpElem = document.querySelector('#tel');
const popupCloseElem = document.querySelector('#popup-close');
const popupCheckBoxElem = document.querySelector('#privacy');
const popupSubmitElem = document.querySelector('#popup-submit');
const headerBurgerElem = document.querySelector('.header__burger-btn');
const headerTopElem = document.querySelector('.header__top');
const mainAdvElem = document.querySelector('.main__advantages');
const mainAdvBtnElem = document.querySelector('.main__adv-openBtn');

formInpElem.addEventListener("input", isSubmitPossible);
popupCheckBoxElem.addEventListener("click", isSubmitPossible);
mainAdvBtnElem.addEventListener('click', advOpen);

createMask(formInpElem);


popupBtn.addEventListener('click', openPopup);
popupWrapElem.addEventListener('click', closeMainPopup);
popupSubmitElem.addEventListener('click', submitConfirm);
headerBurgerElem.addEventListener('click', mobileOpen)

function advOpen(event) {
	this.classList.toggle('active');
	mainAdvElem.querySelector('.main__adv-tip').classList.toggle('active');
	const firstElemH = mainAdvElem.querySelector('.main__adv-item:first-child').clientHeight;
	if(!mainAdvElem.classList.contains('shown')) {
		mainAdvElem.classList.add('shown')
			mainAdvElem.style.height = "auto"
		var height = mainAdvElem.clientHeight + "px"
			mainAdvElem.style.height = `${firstElemH}px`
			setTimeout(() => {
					mainAdvElem.style.height = height
			}, 0) 
	} else {
		mainAdvElem.style.height = `${firstElemH}px`
		mainAdvElem.addEventListener('transitionend', () => {
				mainAdvElem.classList.remove('shown')
			}, {once: true})
	}
}

function mobileOpen (event) {
	document.querySelectorAll(".burger__line").forEach(element => {
		element.classList.toggle('active')
	});
	if(!headerTopElem.classList.contains('shown')) {
		headerTopElem.classList.add('shown')
			headerTopElem.style.height = "auto"
		var height = headerTopElem.clientHeight + "px"
			headerTopElem.style.height = "0px"
			setTimeout(() => {
					headerTopElem.style.height = height
			}, 0) 
	} else {
		headerTopElem.style.height = "0px"
		headerTopElem.addEventListener('transitionend', () => {
				headerTopElem.classList.remove('shown')
			}, {once: true})
	}
}

function submitConfirm(event) {
	event.preventDefault()
	popupSubmitElem.closest('#popup-main').classList.add('closed');
	document.querySelector('#popup-alert').classList.remove('closed');
}

function openPopup (event) {
	popupWrapElem.classList.add('shown');
}

function closeMainPopup (event) {
	if (!(!event.target.closest('.popup') || event.target.closest('.popup-close'))) return;
	popupWrapElem.classList.remove('shown');
}

function createMask(input) {	
	input .addEventListener("input", mask, false);
	input .addEventListener("focus", mask, false);
	input .addEventListener("blur", mask, false);
}

function mask(event) {
	var keyCode;
		event.keyCode && (keyCode = event.keyCode);
		var pos = this.selectionStart;
		if (pos < 3) event.preventDefault();
		var matrix = "+7 (___) ___-__-__",
				i = 0,
				def = matrix.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, ""),
				new_value = matrix.replace(/[_\d]/g, function(a) {
						return i < val.length ? val.charAt(i++) || def.charAt(i) : a
				});
		i = new_value.indexOf("_");
		if (i != -1) {
				i < 5 && (i = 3);
				new_value = new_value.slice(0, i)
		}
		var reg = matrix.substr(0, this.value.length).replace(/_+/g,
				function(a) {
						return "\\d{1," + a.length + "}"
				}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
		if (event.type == "blur" && this.value.length < 5)  this.value = ""
}

function isSubmitPossible(event) {
	const phoneNumber = formInpElem.value;
	if (popupCheckBoxElem.checked && phoneNumber.length >= 18) {
		popupSubmitElem.disabled = false
	}
	else {
		popupSubmitElem.disabled = true
	}
}
window.addEventListener('resize', (event)=>location.reload())
if (window.innerWidth <= 992) {
	const headerMobMenuItems = document.querySelectorAll('.header__mobile-item');
	const headerMobMenuElem = document.createElement('div');
	
	headerMobMenuElem.classList.add('header__mob-menu')
	headerMobMenuItems.forEach(element => {
		headerMobMenuElem.append(element);
	})
	headerTopElem.append(headerMobMenuElem);
}