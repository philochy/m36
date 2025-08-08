function init() {
	function fn() {
		$('.container-menu__item').off();
		$('.menu-item__item').off();
		$('.container-menu__icon').off();
		$('.container-menu__icon--down').removeClass('rotate');
		if (window.innerWidth > 1024) {
			$('.container-menu__item').on({
				mouseenter: function () {
					$('.container-menu__child').hide();
					$(this).find('.container-menu__child').toggle();
					// // 文字底部线条
					$(this)
						.find('.container-menu__link')
						.addClass('container-menu__link--hover');

					// 图标效果
					$(this)
						.find('.container-menu__link')
						.next()
						.find('.container-menu__icon--down')
						.addClass('container-menu__icon--hover');
				},
				mouseleave: function () {
					$('.container-menu__child').hide();
					$(this)
						.find('.container-menu__link')
						.removeClass('container-menu__link--hover');
					$(this)
						.find('.container-menu__link')
						.next()
						.find('.container-menu__icon--down')
						.removeClass('container-menu__icon--hover');
				},
			});

			$('.menu-item__item').on({
				mouseenter: function () {
					$(this).find('.menu-item__child').show();

					// 选中文字
					$(this)
						.find('.menu-item__link')
						.eq(0)
						.addClass('menu-item__link--hover');

					// 图标
					$(this)
						.find('.menu-item__link')
						.eq(0)
						.next()
						.addClass('menu-item__icon--hover');
				},
				mouseleave: function () {
					$(this).find('.menu-item__child').hide();

					$(this)
						.find('.menu-item__link')
						.removeClass('menu-item__link--hover');

					$(this)
						.find('.menu-item__link')
						.eq(0)
						.next()
						.removeClass('menu-item__icon--hover');
				},
			});
		} else {
			$('.container-menu__icon').on({
				click: function () {
					$(this).parent().next().slideToggle(300);
					$(this).find('.container-menu__icon--down').toggleClass('rotate');
				},
			});
		}
	}

	fn();

	window.addEventListener('resize', fn);
}

document.addEventListener('DOMContentLoaded', init);