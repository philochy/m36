<template>
	<div class="home-choose">
		<ContainerSpacing>
			<div class="home-choose__title">
				<ContainerTitle
					title="Blog recommendations"
					desc="High quality furniture manufacturer" />
				<div class="home-choose__list">
					<div
						v-for="(item, index) in list"
						:key="index"
						class="home-choose__item">
						<img
							:src="item.image"
							:alt="item.name" />
						<div class="home-choose__name">{{ item.name }}</div>
						<div class="home-choose__content">{{ item.content }}</div>
					</div>
				</div>
			</div>
		</ContainerSpacing>
	</div>
</template>

<script>
export default {
	name: 'HomeChoose',
	data() {
		return {
			list: [
				{
					image: require('@/assets/img/home-choose1.webp'),
					name: 'OEM&ODM',
					content:
						'We focus on improving customer operations with our rich experience and professional knowledge. We always focus on utilizing our technical knowledge to add valves to our customers and maximize our effectiveness.',
				},
				{
					image: require('@/assets/img/home-choose2.webp'),
					name: '7*24 Service',
					content:
						'We focus on improving customer operations with our rich experience and professional knowledge. We always focus on utilizing our technical knowledge to add valves to our customers and maximize our effectiveness.',
				},
				{
					image: require('@/assets/img/home-choose1.webp'),
					name: 'OEM&ODM',
					content:
						'We focus on improving customer operations with our rich experience and professional knowledge. We always focus on utilizing our technical knowledge to add valves to our customers and maximize our effectiveness.',
				},
				{
					image: require('@/assets/img/home-choose2.webp'),
					name: '7*24 Service',
					content:
						'We focus on improving customer operations with our rich experience and professional knowledge. We always focus on utilizing our technical knowledge to add valves to our customers and maximize our effectiveness.',
				},
			],
		};
	},
};
</script>

<style lang="less" scoped>
.home-choose {
	background-color: @theme-color-secondary;

	&__title {
		padding: @spacing-top 0;

        .media-lg({
            padding: @spacing-top-lg 0;
        });
	}

	&__list {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 100px;
        margin-top: 30px;

		.media-lg({
            gap: 20px;
            grid-template-columns: repeat(2, minmax(0, 1fr));
        });
	}

	&__item {
		display: flex;
		flex-direction: column;
		gap: 10px;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			right: -50px;
			top: 0;
			width: 2px;
			height: 100%;
			background-color: @border-sixth;
		}

        .media-lg({
            &::after{
                content: none;
            }
        });

		&:last-child {
			&::after {
				content: none;
			}
		}
		img {
			width: 30px;
			object-fit: contain;
		}
	}

	&__name {
		font-weight: bold;
		font-size: 22px;
	}

	&__content {
		color: @text-color-secondary;
        font-size: 18px;
	}
}
</style>
