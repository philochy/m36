<template>
	<div
		class="container-input-require"
		:class="rules[0].require ? 'container-input-require--active' : ''">
		<slot />
		<div
			v-if="rules[0].require && inputParams.showMessage"
			class="container-input-require--error">
			{{ message }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'InputRequire',
	props: {
		// 控制是否进行校验 1 校验 2 不校验
		status: {
			type: Number,
			default: 1,
		},
		inputParams: {
			type: Object,
			default: () => {
				return {
					type: '',
					label: '',
					value: '',
					require: true,
					showMessage: false,
					message: 'Please enter your content',
				};
			},
		},
		rules: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			message: '',
		};
	},
	watch: {
		inputParams: {
			deep: true,
			handler(val) {
				if (this.status !== 1) {
					return;
				}

				const typeObj = this.rules.find((v) => v.type);
				if (typeObj) {
					if (val.value) {
						this.message = typeObj.message;
						return;
					}
					this.message = this.rules[0].message;
				} else {
					this.message = this.rules[0].message;
					if (!val.value) {
						this.$emit('handleShowMessage', {
							...val,
							showMessage: true,
						});
					} else {
						this.$emit('handleShowMessage', {
							...val,
							showMessage: false,
						});
					}
				}
			},
		},
	},
};
</script>

<style lang="less" scoped>
.container-input-require {
	position: relative;

	.media-lg({
		&--active {
			&::before {
				font-size: 20px;
			}
		}
		&--error {
			margin-top: 0;
			font-size: 14px;
		}
	});

	&--active {
		&::before {
			content: '*';
			display: block;
			position: absolute;
			top: 50%;
			left: -10px;
			transform: translateY(-50%);
			color: #f56c6c;
			font-size: 16px;
		}
	}

	&--error {
		color: #f56c6c;
		font-size: 16px;
		line-height: 1;
		padding-top: 4px;
		position: absolute;
		top: 100%;
		left: 0;
	}
}
</style>
