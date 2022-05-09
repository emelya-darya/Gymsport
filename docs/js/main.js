'use strict'

//!-----------------Определение типа устройства на котором открыт сайт--------------------------------------------------------------
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android()
			|| isMobile.BlackBerry()
			|| isMobile.iOS()
			|| isMobile.Opera()
			|| isMobile.Windows()
		);
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch')
} else {
	document.body.classList.add('_pc')
}

//!--------------------------------------Открытие подменю и меню на тачпаде--------------------------------------------------------------------
const blockWsubmenu = document.querySelector('.header__crumb-w-sublist span');
const submenu = document.querySelector('.header__sublist');
const menuIcon = document.querySelector('.header__menu-icon')
const headerCrumbs = document.querySelector('.header__crumbs')

if (document.body.classList.contains('_touch')) {
	headerCrumbs.classList.add('_touchme');

	blockWsubmenu.addEventListener('click', function (e) {
		submenu.classList.toggle('_open');
	})

	menuIcon.addEventListener('click', (e) => {
		menuIcon.classList.toggle('_open');
		headerCrumbs.classList.toggle('_open');
		document.body.classList.toggle('_lock')

	})
}


//!--------------------------------------Trainers Likes and hearts--------------------------------------------------------------------
const trainHearts = document.querySelectorAll('.trainer__icons-left svg:nth-child(1)');
const trainLikes = document.querySelectorAll('.trainer__icons-left svg:nth-child(2)');

trainHearts.forEach((el,ind) => {
	el.addEventListener('click',()=> {
		el.classList.toggle('_color');	
	})
})

trainLikes.forEach((el, ind) => {
	el.addEventListener('click', () => {
		el.classList.toggle('_color');
	})
})

//!-----------------------------Trainers slider-swiper-----------------------------------------------------
new Swiper('.trainers', {
	loop: true,

	navigation: {
		nextEl: '.trainers-swiper-button-next',
		prevEl: '.trainers-swiper-button-prev',
	},

	grabCursor: true,

	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},

	slidesPerView: 2,
	watchOverflow: true,
	slidesPerGroup: 1,
	speed: 500,

	preloadImages: false,

	lazy: {
		loadOnTransitionStart: true,
		loadPrevNext: true,
	},

	watchSlidesProgress: true,
	watchSlidesVisibility: true,

	ally: {
		enabled: true,
	},

	grid: {
		rows: 1,
	},

});

//!------------------------------------------------Gallery swiper---------------------------------------

new Swiper('.gallery-swiper', {
	navigation: {
		nextEl: '.gallery-button-next',
		prevEl: '.gallery-button-prev',
	},

	simulateTouch: true,
	grabCursor: true,

	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},

	mousewheel: {
		sensitivity: 1,
		eventsTarget: '.gallery-item', // указать один конкретный класс слайда
	},

	watchOverflow: true,
	spaceBetween: 5,
	slidesPerGroup: 3,
	slidesPerView: 3,

	grid: {
		columns: 3,
		rows: 2,
	},

	autoplay: {
		delay: 4000,
		disableOnInteraction: true,
		pauseOnMouseEnter: true,
	},

	speed: 1800,

	breakpoints: {
		320: {
			slidesPerView: 1,
			slidesPerGroup: 1,
			grid: {
				columns: 1,
				rows: 1,
			},
		},
		430: { slidesPerView: 2, slidesPerGroup: 2},
		576: { slidesPerView: 3, slidesPerGroup: 3},
	},

	watchSlidesProgress: true,
	watchSlidesVisibility: true,

	ally: {
		enabled: true,
	},

});

//!--------------------------Twitter swiper------------------------------------------------------------------------------
new Swiper('.twitter-swiper', {
	loop: true,

	simulateTouch: false,
	
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},

	mousewheel: {
		sensitivity: 1,
		eventsTarget: '.twitter__slide', 
	},

	watchOverflow: true,

	autoplay: {
		delay: 4000,
		pauseOnMouseEnter: true,
	},

	speed: 800,
	effect: 'fade',

	fadeEffect: {
		crossFade: true,
	},

	ally: {
		enabled: true,
	},

});

//!-----------------------------------------------------------------------------Плавный скролл-------------------------------------------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {

		e.preventDefault();

		let currentHref = this.getAttribute('href'),
			currentAnchor = document.getElementById(currentHref.substring(1)),
			currentAnchorT = currentAnchor.getBoundingClientRect().top;

		window.scrollTo({
			top: currentAnchorT + window.scrollY,
			behavior: 'smooth'
		});

	});
});

//!----------------------------------------------------------------------Popups------------------------------------------------------------------
// получаем в переменную все ссылки по которым открываются попапы (имеют класс .popup__link)
const popupLinks = document.querySelectorAll('.popup__link');
// Получаем все ссылки-крестики, которые будут закрывать попапы
const popupCloseIcon = document.querySelectorAll('.close-popup');
// Все модальные окна имеют класс .popup, внутри .popup есть .popup__content
const popups = document.querySelectorAll('.popup');
// получаем весь body документа, чтобы блокировать скролл по нему при открытом попапе
const body = document.querySelector('body');
// всем фиксированным элементам (position:fixed) задаем класс .lock-padding, получаем
//коллекцию из этих элементов
const lockPadding = document.querySelectorAll('.lock-padding');


document.addEventListener('click', () => {
	if (event.target.closest('.popup__link')) {
		let popupId = event.target.closest('.popup__link').getAttribute('href').replace('#', '');
		let requiredPopup = document.getElementById(popupId);
		openPopup(requiredPopup);
		event.preventDefault();
	}
})

document.addEventListener('click', () => {
	if (event.target.closest('.close-popup')) {
		closePopup(event.target.closest('.popup'))
		event.preventDefault();
	}
})

popups.forEach((el) => {
	el.addEventListener('click', () => {
		if (!event.target.closest('.popup__content')) {
			closePopup(event.target.closest('.popup'))
		}
	})
})
document.addEventListener('keydown', () => {
	if (event.code === 'Escape') {
		const popupActive = document.querySelector('.popup.open');
		closePopup(popupActive)
	}
});

function openPopup(requiredPopup) {
	const popupActive = document.querySelector('.popup.open');
	if (popupActive) {
		closePopup(popupActive);
		requiredPopup.classList.add('open');
	} else {
		requiredPopup.classList.add('open');
		bodyLock();
	}
}
function bodyLock() {
	const addPadding = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	body.style.paddingRight = addPadding;
	lockPadding.forEach((el) => {
		el.style.paddingRight = addPadding;
	});
	body.classList.add('_lock')
}
function bodyUnlock() {
	body.style.paddingRight = '0px';
	lockPadding.forEach((el) => {
		el.style.paddingRight = '0px';
	});
	body.classList.remove('_lock')
}
function closePopup(willClosePopup) {
	willClosePopup.classList.remove('open');
	bodyUnlock()
}


//!---------------------------------------------------------Валидация и отправка форм------------------------------------------------
//! Маска
let inpPhoneNumber = document.querySelectorAll('input[type = "tel"]');
let im = new Inputmask("+7 (999) 999-99-99");
im.mask(inpPhoneNumber);

//!

const thanksWindow = document.querySelector('.thanks-you-window');

let validateForms = function (selector, rules, messages, successModal, yaGoal) {
	new window.JustValidate(selector, {
		rules: rules,
		messages: messages,

		// submitHandler: async function (form) {
		// 	// получаем все данные из формы в объект (только данные из форм, у которых есть атрибут name)))
		// 	let formData = new FormData(form);

		// 	let response = await fetch('php/sendmail.php', {
		// 		method: 'POST',
		// 		body: formData,
		// 	});

		// 	if (response.ok) {
		// 		let result = await response.json();
		// 		console.log(successModal);
		// 		successModal.classList.add('_visible');
		// 		setTimeout(successModal.classList.remove('_visible'), 2000);
		// 		form.reset();
		// 	} else {
		// 		alert('Ошибка')
		// 	}

		// },

		colorWrong: 'red',

	},
	)
}

validateForms('.popup-callback1',
	{ num1: { required: true, phone: true } },
	{ num1: { required: 'Введите номер телефона', phone: 'Неправильный номер' } },
	thanksWindow,
	'send goal');

validateForms('.popup-callback2',
	{ num2: { required: true, phone: true } },
	{ num2: { required: 'Введите номер телефона', phone: 'Неправильый номер' } },
	thanksWindow,
	'send goal');

validateForms('.footer__email-form',
	{ email: { required: true, email: true } },
	{ email: { required: 'Введите email', email: 'Введите существующий email' } },
	thanksWindow,
	'send goal');










