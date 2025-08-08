<template>
	<div class="default-button">
		<a
			v-if="btnType == 'href'"
			class="default-button__link"
			:href="href">
			<span>{{ text }}</span>
		</a>
		<button
			v-else
			v-debounce:3000="handleClick"
			:disabled="btnDisabled"
			class="default-button__link">
			<span>{{ text }}</span>
			<Iconify icon="tabler:chevron-right" />
		</button>
	</div>
</template>

<script>
export default {
	props: {
		href: {
			type: String,
			default: '',
		},
		text: {
			type: String,
			default: 'SHOW MORE',
		},
		btnType: {
			type: String,
			default: 'href',
		},
		btnDisabled: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		handleClick() {
			this.$emit('handleClick');
		},
	},
};
</script>

<style lang="less" scoped>
.default-button {
	display: flex;
	justify-content: center;
	&__link {
		background-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #000;
		border: 1px solid @border-primary;
		padding: 15px 70px;
		cursor: pointer;
		transition: all 0.3s ease-in-out;

		& > span {
			text-transform: uppercase;
		}

		.media-lg({
			width: 100%;
		});
		&:hover {
			background-color: @theme-color-primary;
			color: #fff;
			border-color: @theme-color-primary;
		}
	}
}
</style>
