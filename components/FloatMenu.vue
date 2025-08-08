<template>
	<div class="container-float-menu">
		<div class="float-menu">
			<div
				v-for="(item, index) in floatData"
				:key="index"
				class="float-menu__item">
				<a
					class="float-menu__link"
					:class="[item.content ? 'float-menu__item--active' : '']"
					:href="`${item.href}`"
					target="_blank"
					rel="nofollow">
					<div class="menu-link">
						<div class="menu-link__icon">
							<Iconify :icon="item.icon" />
						</div>
						<div
							v-if="item.content"
							class="menu-link__name">
							{{ item.content }}
						</div>
					</div>
				</a>
				<div
					v-if="item.image"
					class="float-menu__image">
					<img
						:src="item.image"
						:alt="item.name" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const contactTypes = {
	email: {
		icon: 'tabler:mail-filled',
		name: 'E-Mail',
		type: 'email',
		sort: 1,
		hrefBuilder: (v) => `mailto:${v}`,
	},
	WhatsApp: {
		icon: 'tabler:brand-whatsapp',
		name: 'WhatsApp',
		type: 'WhatsApp',
		sort: 2,
		hrefBuilder: (v) => `https://web.whatsapp.com/send?l=en&phone=${v}`,
	},
	Skype: {
		icon: 'tabler:brand-skype',
		name: 'Skype',
		type: 'Skype',
		sort: 3,
		hrefBuilder: (v) => `skype:${v}?chat`,
	},
	wxcodeurl: {
		icon: 'tabler:brand-wechat',
		name: 'WeChat',
		type: 'wxcodeurl',
		sort: 4,
		href: 'weixin://dl/about',
		content: null,
	},
};
export default {
	name: 'FloatMenu',
	props: {
		floatMenu: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {
			floatData: [],
		};
	},
	mounted() {
		const data = [];
		const { contactShare } = this.floatMenu;
		for (const item in contactShare) {
			for (const type in contactTypes) {
				if (item === type) {
					const contactType = contactTypes[type];
					if (type === 'wxcodeurl') {
						data.push({
							...contactType,
							image: contactShare[type],
						});
					} else if (contactShare[type]) {
						const values = contactShare[type].split(',').filter((v) => v);

						values.forEach((v) => {
							data.push({
								...contactType,
								href: contactType.hrefBuilder
									? contactType.hrefBuilder(v)
									: contactType.href,
								content: v,
							});
						});
					}
				}
			}
		}
		data.sort((a, b) => a.sort - b.sort);

		this.floatData = data;
	},
};
</script>

<style lang="less" scoped>
.container-float-menu {
	display: block;
	position: fixed;
	right: 0;
	top: 50%;
	transform: translate(calc(100% - 55px), -50%);
	z-index: 98;
	border-radius: 8px;
	text-align: center;
	.media-lg({
        display: none;
    });
	.float-menu {
		display: flex;
		flex-direction: column;
		gap: 20px;

		&__item {
			display: flex;

			&:hover {
				.float-menu__image {
					display: flex;
					align-items: flex-end;
					bottom: 0;
					left: -97%;
					right: 105%;
				}
			}
			&:last-child {
				.float-menu__link {
					&::after {
						content: none;
					}
				}
			}

			&--active {
				&:hover {
					transform: translateX(calc(-100% + 55px));
				}
			}
		}

		&__link {
			position: relative;
			width: auto;
			padding: 10px;

			background: #fff;
			box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
			border-radius: 99px 0 0 99px;
			transform: translateX(0);
			transition: transform 0.3s ease-in-out;
		}

		&__image {
			position: absolute;
			display: none;
			top: 0;
			& > img {
				width: 100%;
				height: auto;
			}
		}

		.menu-link {
			display: flex;
			align-items: center;
			gap: 10px;
			&__icon {
				color: #fff;
				font-size: 20px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: @theme-color-primary;
				border-radius: 50%;
				width: 35px;
				height: 35px;
			}

			&__name {
				font-size: 14px;
			}
		}
	}
}
</style>
