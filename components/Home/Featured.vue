<template>
	<div class="container-home-feat">
		<ContainerSpacing>
			<ContainerTitle
				title="Featured Products"
				desc="High quality furniture manufacturer" />
			<div class="home-feat__list">
				<a
					v-for="(item, index) in list"
					:key="index"
					class="home-feat__item"
					:href="item.path">
					<div class="home-feat-image">
						<img
							:src="item.showPic"
							:alt="item.name" />
					</div>
					<div class="home-feat-info">
						<span class="home-feat-info__name">{{ item.name }}</span>
						<div class="home-feat-info__icon">
							<CircleIcon
								border-color="#fff"
								background-color="#fff"
								:width="45"
								:height="45" />
						</div>
					</div>
				</a>
			</div>
		</ContainerSpacing>
	</div>
</template>

<script>
export default {
	name: 'Featured',
	props: {
		list: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="less" scoped>
.container-home-feat {
	.home-feat {
		&__list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20px;
			margin: 20px 0;
			.media-lg({
                grid-template-columns: repeat(1, 1fr);
            });
		}
		&__item {
			position: relative;

			&:hover {
				.home-feat-info__icon {
					opacity: 1;
				}
			}
		}

		&-image {
			display: flex;

			& > img {
				width: 100%;
			}
		}
		&-info {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			padding: 30px 50px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-color: rgba(0, 0, 0, .4);

            .media-lg({
                padding: 15px 25px;
            });

			&__name {
				color: #fff;
				text-transform: uppercase;
				font-size: 24px;
				font-weight: bold;
			}

			&__icon {
				opacity: 0;
				transition: all 0.3s ease-in-out;

                .media-lg({
                    opacity: 1;
                })
			}
		}
	}
}
</style>
