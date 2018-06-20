@import 'vendor/jquery-1.10.2.min.js'
@import 'vendor/parallax.min.js'
@import 'vendor/jquery.inputmask.bundle.js'
@import 'vendor/APlayer.min.js'

var STUDIO = STUDIO || {};

// гамбургер меню
STUDIO.hamburger = function(){
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

	});
};



//parallax
STUDIO.parallax = function(){
	$('.parallax-window').parallax({
		positionY: 'top',
		positionX: 'left',
		androidFix: 'false'
	});	
};




//menufooter
STUDIO.menufooter = function(){
	$('.js-menu-footer').on('click', function (e) {
		$(this)
			.closest(".b-nav-col")
			.find(".b-expandable")
			.stop(true,true)
			.toggle();

		e.preventDefault();
	});	
};


// mask
STUDIO.mask = function(){
	$(":input").inputmask();	
};


// validate form
STUDIO.validateform = function(){
	$('.js_btn_submit').on('click', function (e) {
		e.preventDefault();
		$(this).closest('form').submit();
	});

	$('.js-validate-forms input').on('keyup', function () {
		if ($(this).hasClass('error'))
			$(this).removeClass('error').next('.error').fadeOut('fast', function () {
				$(this).remove();
			});
	});

	$('.js-validate-forms').on('submit', function (e) {
		e.preventDefault();
		simpleValid($(this));
	});
};

function simpleValid($formObj) {
	$formObj.find('input').each(function () {
		var $this = $(this);
		if ($this.data('validate') && !$this.prop('disabled')) {
			if (!$this.val()) {
				if ($this.next('.error').size() == 0) {
					var $obj = $('<span class="error">' + $this.data('validate') + '</span>');
					$this.addClass('error').after($obj.fadeIn());

					//при измении DOM, вручную обновляем эффект параллакса
					jQuery(window).trigger('resize').trigger('scroll');
				}
				else
					$this.addClass('error');
			}			
		}			
	});
};


$(function(){
	STUDIO.hamburger();
	STUDIO.parallax();
	STUDIO.menufooter();
	STUDIO.mask();
	STUDIO.validateform();
});






