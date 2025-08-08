<template>
	<ContainerSpacing>
		<div
			:id="contactId"
			class="container-form">
			<div
				v-if="showHeader"
				class="form-header">
				<span class="form-header__title">Online Message</span>
			</div>
			<div class="form-body">
				<div class="form-body__item">
					<InputRequire
						:input-params="form.name"
						:status="status"
						:rules="formRules.name"
						@handleShowMessage="handleShowMessage">
						<input
							v-model="form.name.value"
							type="text"
							placeholder="Name"
							class="form-body__input"
							:class="[
								getRequire('name') && form.name.showMessage
									? 'form-body__input--require'
									: '',
							]" />
					</InputRequire>
				</div>
				<div class="form-body__item">
					<InputRequire
						:input-params="form.email"
						:status="status"
						:rules="formRules.email"
						@handleShowMessage="handleShowMessage">
						<input
							v-model="form.email.value"
							type="email"
							placeholder="Email"
							class="form-body__input"
							:class="[
								getRequire('email') && form.email.showMessage
									? 'form-body__input--require'
									: '',
							]"
							@input="changeVal" />
					</InputRequire>
				</div>
				<div class="form-body__item">
					<InputRequire
						:input-params="form.content"
						:status="status"
						:rules="formRules.content"
						@handleShowMessage="handleShowMessage">
						<textarea
							v-model="form.content.value"
							rows="5"
							type="text"
							placeholder="Message"
							:class="[
								getRequire('content') && form.content.showMessage
									? 'form-body__input--require'
									: '',
							]"
							class="form-body-textarea__mob form-body__textarea" />
						<div class="form-body-textarea__pc">
							<input
								v-model="form.content.value"
								type="text"
								class="form-body__input"
								placeholder="Message"
								:class="[
									getRequire('content') && form.content.showMessage
										? 'form-body__input--require'
										: '',
								]" />
							<button
								v-debounce:3000="submitForm"
								class="form-body-textarea__btn"
								:disabled="btnDisabled">
								<span>SUBSCRIBE</span>
								<div class="form-body-textarea__icon">
									<Iconify icon="tabler:chevron-right" />
								</div>
							</button>
						</div>
					</InputRequire>
					<div class="form-body__btn">
						<DefaultButton
							btn-type="button"
							text="SUBSCRIBE"
							:btn-disabled="btnDisabled"
							@handleClick="submitForm" />
					</div>
				</div>
			</div>
		</div>
	</ContainerSpacing>
</template>
<script>
export default {
	name: 'InquiryForm',
	props: {
		showHeader: {
			type: Boolean,
			default: true,
		},
		contactId: {
			type: String,
			default: 'send_inquiry',
		},
	},
	data() {
		return {
			status: 1,
			form: {
				name: {
					label: 'name',
					value: '',
					showMessage: false,
				},
				email: {
					label: 'email',
					value: '',
					showMessage: false,
				},
				content: {
					label: 'content',
					value: '',
					showMessage: false,
				},
			},
			formRules: {
				name: [
					{
						require: false,
						message: 'Please enter your name',
					},
				],
				email: [
					{
						require: false,
						message: 'Please enter your email',
					},
					{
						type: 'email',
						message: 'Please enter the correct email address',
					},
				],
				content: [
					{
						require: true,
						message: 'Please enter your content',
					},
				],
			},
			btnDisabled: false,
		};
	},
	created() {
		if (this.$store.state.askData) {
			for (const i in this.formRules) {
				if (
					this.$store.state.askData[i] &&
					this.$store.state.askData[i].required
				) {
					this.formRules[i][0].require = true;
				}
			}
		}
	},
	methods: {
		async submitForm() {
			this.status = 1;
			this.btnDisabled = true;
			for (const i in this.form) {
				if (this.getRequire(i) && !this.form[i].value) {
					this.form[i].showMessage = true;
				}
			}

			const bool = Object.entries(this.form)
				.map(([, value]) => {
					return value;
				})
				.every((v) => !v.showMessage);
			const url = new URL('https://ipadmin.aixdb.cn/ipadmin/api/ask/add');

			if (bool) {
				let params = {};
				Object.entries(this.form).forEach(([label, val]) => {
					params[label] = val.value;
				});
				params = {
					...params,
					DynamicDbConnectName: this.$store.state.footerData.inquiry,
					domain: window.location.host,
					path: window.location.href,
				};
				for (const i in params) {
					url.searchParams.append(i, params[i]);
				}
				try {
					const res = await fetch(url);
					if (res.ok) {
						const result = await res.json();
						if (result.status === 0) {
							this.$message.success(
								'We have received your message and will be in touch with you shortly.',
							);
						} else {
							this.$message.error('Server Internal Error');
							return;
						}
					} else {
						this.$message.error('Server Internal Error');
						return;
					}
					this.clearForm();
					window.location.href = '/thanks';
				} catch (err) {
					this.btnDisabled = false;
					this.$message.error('Server Internal Error');
				}
			} else {
				this.btnDisabled = false;
			}
		},
		changeVal() {
			const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

			if (!re.test(this.form.email.value)) {
				this.form.email.showMessage = true;
			} else {
				this.form.email.showMessage = false;
			}
		},
		getRequire(name) {
			if (this.formRules[name]) {
				return this.formRules[name].some((v) => v.require);
			}
		},
		clearForm() {
			this.status = 2;
			for (const i in this.form) {
				this.form[i].value = '';
				this.form[i].showMessage = false;
			}
			setTimeout(() => {
				this.status = 1;
			}, 500);
		},
		handleShowMessage(val) {
			this.form[val.label].showMessage = val.showMessage;
		},
	},
};
</script>

<style lang="less" scoped>
.container-form {
	width: 100%;

	.form-header {
		display: flex;
		flex-direction: column;

		&__title {
			color: @theme-color-primary;
			font-size: 24px;
			text-transform: uppercase;
			font-weight: bold;
		}
	}
	.form-body {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 30px 20px;
		margin-top: 10px;
		&__item {
			grid-column: span 5;
			margin-left: 10px;

			&:nth-child(1) {
				grid-column: span 2;
			}

			&:nth-child(2) {
				grid-column: span 3;
			}

			.media-lg({
				grid-column: span 5 !important;
			});
		}

		.input-styles() {
			width: 100%;
			height: 50px;
			border: none;
			border-bottom: 2px solid @input-border-primary;
			outline: none;
			box-sizing: border-box;
			resize: none;
			font-family: inherit;
			background: transparent;
			font-size: 18px;

			&::placeholder {
				font-size: 18px;
			}
			&:focus {
				border-bottom: 2px solid #000;
			}
			&--require {
				border: none;
				border-bottom: 2px solid #f56c6c !important;
			}
		}

		&__input {
			.input-styles();
		}

		&__textarea {
			.input-styles();
			height: auto;
			font-family: inherit;
		}

		&__btn {
			margin-top: 30px;
			display: none;

			.media-lg({
				display: block;
			});
		}

		&-textarea {
			&__pc {
				position: relative;

				.media-lg({
					display: none;
				});
			}

			&__mob {
				display: none;

				.media-lg({
					display:block;
				});
			}

			&__btn {
				display: flex;
				align-items: center;
				gap: 5px;
				border: none;
				background: transparent;
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				cursor: pointer;
			}

			&__icon {
				background-color: @theme-color-primary;
				color: #fff;
				border-radius: 50%;
				width: 20px;
				height: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 18px;
			}
		}
	}
}
</style>
