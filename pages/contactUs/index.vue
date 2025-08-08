<template>
	<div class="container-contact">
		<Container>
			<BreadCrumb :bread-list="breadList" />

			<div>
				<div class="contact-wrap">
					<div class="contact-wrap__left">
						<div class="contact-wrap__block">
							<div class="contact-wrap__title">Contact Us</div>
							<div class="contact-wrap__content">
								Our portfolio includes full range of 12-145kV cable accessories,
								including medium voltage cold-shrinkable terminations and
								joints, shielded separable connectors, inner cone pluggable
								terminations for Gas-insulated switchgear (GIS).
							</div>
						</div>
						<div class="contact-wrap__block">
							<div
								v-for="(item, index) in list"
								:key="index"
								class="contact-wrap-item">
								<span class="contact-wrap-item__title">{{ item.name }}</span>
								<a
									v-if="item.type === 'email'"
									class="contact-wrap__content"
									:href="`mailto:${item.content}`"
									>{{ item.content }}</a
								>
								<span
									v-else
									class="contact-wrap__content"
									>{{ item.content }}</span
								>
							</div>
						</div>
					</div>
					<div class="contact-wrap__right">
						<InquiryForm :show-header="false" />
					</div>
				</div>

				<div class="contact-wrap">
					<div class="contact-wrap__left">
						<div class="contact-wrap__block">
							<div class="contact-wrap__title">common problem</div>
							<div class="contact-wrap__content">
								Our portfolio includes full range of 12-145kV cable accessories,
								including medium voltage cold-shrinkable terminations and
								joints, shielded separable connectors, inner cone pluggable
								terminations for Gas-insulated switchgear (GIS).
							</div>
						</div>
					</div>
					<div class="contact-wrap__right">
						<ul class="contact-wrap-node__list">
							<li
								v-for="(item, index) in nodeList"
								:key="index"
								class="contact-wrap-node__item">
								<div class="contact-wrap-node__block">
									<span class="contact-wrap-node__title">{{ item.title }}</span>
									<Iconify
										class="contact-wrap-node__icon contact-wrap-node__down"
										icon="tabler:plus" />
									<Iconify
										class="contact-wrap-node__icon--hidden contact-wrap-node__icon contact-wrap-node__show"
										icon="tabler:x" />
								</div>
								<div class="contact-wrap-node__content">
									{{ item.content }}
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</Container>
	</div>
</template>

<script>
import { flatTreeData, findParentElements } from '~/utils/index.js';
export default {
	asyncData({ app, store, route }) {
		const db = app.$websiteDataHelper;
		const routeId = route.meta[0].nodeid;

		const recommendList = db.websitedata.products.slice(0, 8) || [];

		const menus = store.state.menu.filter((m) => m.type === 'contact');
		const flatArray = flatTreeData(menus);
		const breadList = findParentElements(routeId, flatArray);

		return {
			recommendList,
			breadList,
		};
	},
	data() {
		return {
			list: [
				{
					type: 'address',
					name: 'Address',
					content:
						"Building B, National Digital Publishing Base, Tiangu7th Road,Xi'an City",
				},
				{
					type: 'phoneNumber',
					name: 'Phone',
					content: '029-89315850/029-89315851',
				},
				{
					type: 'email',
					name: 'Email',
					content: 'Tennyson@somyshare.com',
				},
			],
			nodeList: [
				{
					title: 'How About Product Quality?',
					content:
						'The next generation TeSys Deca series products provide a reliable and solid solution, which can speed up the time to market of perfume by adopting advanced extraction technology.',
				},
				{
					title: 'How About Product Quality?',
					content:
						'The next generation TeSys Deca series products provide a reliable and solid solution, which can speed up the time to market of perfume by adopting advanced extraction technology.',
				},
				{
					title: 'How About Product Quality?',
					content:
						'The next generation TeSys Deca series products provide a reliable and solid solution, which can speed up the time to market of perfume by adopting advanced extraction technology.',
				},
				{
					title: 'How About Product Quality?',
					content:
						'The next generation TeSys Deca series products provide a reliable and solid solution, which can speed up the time to market of perfume by adopting advanced extraction technology.',
				},
			],
		};
	},
	mounted() {
    this.list.map((v) => {
			v.content = this.$store.state?.baseInfo?.[v.type] || v.content;
			return v;
		});

		// $('.contact-wrap-node__list li .contact-wrap-node__content').show();

		$('.contact-wrap-node__list li').on({
			click: function () {
				$(this)
					.find('.contact-wrap-node__title')
					.addClass('.contact-wrap-node__title--active');

				$(this).find('.contact-wrap-node__content').toggle();

				$(this).find('.contact-wrap-node__show').toggle();
				$(this).find('.contact-wrap-node__down').toggle();

				$(this)
					.siblings()
					.find('.contact-wrap-node__title')
					.removeClass('contact-wrap-node__title--active');
			},
		});
	},
};
</script>

<style lang="less" scoped>
.flex-wrap() {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.container-contact {
	margin: @page-my 0;
	.contact-wrap {
		display: flex;
		gap: 90px;
		margin-top: 40px;
		&:first-child {
			.contact-wrap__left {
				position: relative;

				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					background: @border-sixth;
					width: 100%;
					height: 2px;

					.media-lg({
						content: none;
					});
				}
			}
		}

		.media-lg({
			flex-direction: column;
			gap: 0;
		});
		&__left {
			.flex-wrap();
			gap: 30px;
			width: 40%;
			padding-bottom: 40px;

			.media-lg({
				width: 100%;
				padding-bottom: 20px;
			});
		}

		&__block {
			.flex-wrap();
			gap: 10px;
		}

		&__title {
			font-size: 26px;
			font-weight: bold;
			color: @text-color-primary;
			text-transform: uppercase;
		}

		&__content {
			font-size: 18px;
			color: @text-color-secondary;
		}

		&-item {
			.flex-wrap();
			gap: 10px;

			&__title {
				font-size: 22px;
				font-weight: bold;
			}
		}

		&__right {
			flex: 1;
			:deep(.container-spacing){
				.media-lg({
					margin: 0;
				});
			}

			:deep(.container-wrap) {
				padding: 0;
			}

			:deep(.form-body__item){
				margin-left: 0;
			}
		}

		&-node {
			&__list {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 20px;

				.media-md({
					grid-template-columns: repeat(1, 1fr);
				});
			}

			&__item {
				.flex-wrap();
				gap: 10px;
			}

			&__block {
				padding: 30px 40px;
				border: 2px solid @theme-color-secondary;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			&__title {
				color: @text-color-secondary;

				&--active {
					color: @text-color-primary;
				}
			}

			&__icon {
				&__show {
					color: @text-color-fourth;
				}
				&--hidden {
					display: none;
				}
			}

			&__content {
				display: none;
				padding: 0 20px;
			}
		}
	}
}
</style>
