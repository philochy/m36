<template>
	<Icon
		:icon="icon"
		:width="width"
		:height="height"
		:color="color" />
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
	components: {
		Icon,
	},
	props: {
		icon: {
			type: String,
			default: '',
		},
		width: {
			type: [String, Number],
			default: '',
		},
		height: {
			type: [String, Number],
			default: '',
		},
		color: {
			type: String,
			default: null,
		},
	},
};
</script>
