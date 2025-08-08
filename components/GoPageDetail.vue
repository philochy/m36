<template>
	<div class="container-pager">
		<div class="container-pager-wrap">
			<div class="pager-wrap pager-wrap__prev">
				<div
					v-if="Object.keys(prev).length !== 0"
					class="wrap-prev">
					<a
						class="wrap-prev__link"
						:href="prev?.path">
						<span class="wrap-prev__title">Previous Article:</span>
						<span class="wrap-prev__name">{{ prev?.name }}</span>
						<div class="wrap-prev__icon">
							<Iconify icon="tabler:chevron-right" />
						</div>
					</a>
				</div>
				<div v-else>
					<span class="pager-wrap__next-title">Previous Article:</span>
					<span>It's already the first page.</span>
				</div>
			</div>
			<div class="pager-wrap pager-wrap__next">
				<div
					v-if="Object.keys(next).length !== 0"
					class="wrap-next">
					<a
						class="wrap-next__link"
						:href="next?.path">
						<span class="wrap-next__title">Next Article:</span>
						<span class="wrap-next__name">{{ next?.name }}</span>
						<div class="wrap-next__icon">
							<Iconify icon="tabler:chevron-right" />
						</div>
					</a>
				</div>
				<div v-else>
					<span class="pager-wrap__next-title">Last Article:</span>
					<span>It's already the last page.</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		prev: {
			type: Object,
			default: () => {
				return {};
			},
		},
		next: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
};
</script>

<style lang="less" scoped>
.pager() {
	&__link {
		display: flex;
	}
	&__name {
		margin: 0 10px;
		color: @text-color-secondary;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		flex: 1;
	}
	&__icon {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: @theme-color-third;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.container-pager {
	position: relative;
	overflow: hidden;
	margin-top: 20px;
	.media-lg({
        margin: 0;
    });

	&-wrap {
		gap: 20px;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));

		.media-lg({
            grid-template-columns: repeat(1, minmax(0, 1fr));
        });
	}
	.pager-wrap {
		padding: 20px 10px;
		background: @theme-color-secondary;

		&:hover {
			.wrap-prev__icon,
			.wrap-next__icon {
				background: @theme-color-primary;
			}
		}

		&__prev {
			.media-lg({
                display: none;
            });
		}
	}
	.wrap-prev {
		.pager();
	}
	.wrap-next {
		.pager();
	}
}
</style>
