<template>
	<div
		class="circle-icon"
		:style="{
			'--border-color': borderColor,
			'--background-color': backgroundColor,
			'--icon-color': iconColor,
			'--hover-border': hoverBorder,
			'--hover-bg': hoverBg,
			'--hover-icon': hoverIcon,
			'--width': width + 'px',
			'--height': height + 'px',
		}">
		<Iconify
			class="circle-icon__right"
			icon="tabler:chevron-right" />
	</div>
</template>

<script>
export default {
	name: 'CircleIcon',
	props: {
		width: {
			type: Number,
			default: 50,
		},
		height: {
			type: Number,
			default: 50,
		},
		borderColor: {
			type: String,
			default: 'var(--primary-color)',
		},
		backgroundColor: {
			type: String,
			default: 'transparent',
		},
		iconColor: {
			type: String,
			default: 'var(--primary-color)',
		},
		hoverBorder: {
			type: String,
			default: 'var(--primary-color)',
		},
		hoverBg: {
			type: String,
			default: 'var(--primary-color)',
		},
		hoverIcon: {
			type: String,
			default: '#fff',
		},
	},
};
</script>

<style lang="less" scoped>
.circle-icon {
	width: var(--width);
	height: var(--height);
	border-radius: 50%;
	border-width: 2px;
	border-style: solid;
	transition: all 0.3s ease-in-out;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30px;
	cursor: pointer;
	box-sizing: border-box;
	background-color: var(--background-color);
	border-color: var(--border-color);
	color: var(--icon-color);

	&:hover {
		background-color: var(--hover-bg);
		border-color: var(--hover-border);
		color: var(--hover-icon);
	}
}
</style>
