import Vue from 'vue';

Vue.directive('debounce', {
	inserted: function (el, binding) {
		let timer = null;
		el.addEventListener('click', () => {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(() => {
				binding.value();
			}, binding.arg || 500);
		});
	},
});
