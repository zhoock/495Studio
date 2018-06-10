@import 'vendor/jquery-1.10.2.min.js'
@import 'vendor/parallax.min.js'


// гамбургер меню
var isActive = false,
		$hamburgerToggle = $(".b-menu-hamburger__toggle");

$('.js-menu-hamburger').on('click', function () {
	if (isActive) {
		$(this).find($hamburgerToggle).removeClass('active');
		$('body').removeClass('menu-open');
	} else {
		$(this).find($hamburgerToggle).addClass('active');
		$('body').addClass('menu-open');
	}

	isActive = !isActive;

});

$(".js-menu a").on("click", function () {
	if (isActive) {
		$hamburgerToggle.removeClass('active');
		$('body').removeClass('menu-open');
	} else {
		$hamburgerToggle.addClass('active');
		$('body').addClass('menu-open');
	}

	isActive = !isActive;


	//return false;

});

//parallax
$('.parallax-window').parallax({
	positionY: 'top',
	positionX: 'left'
});

//menu

$('.js-menu-footer').on('click', function (e) {
	$(this)
		.closest(".b-nav-col")
		.find(".b-expandable")
		.stop(true,true)
		.toggle();

	e.preventDefault();
});



