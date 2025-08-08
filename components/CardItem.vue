<template>
	<a
		:href="path"
		:title="name"
		class="card-item">
		<div class="card-item__image">
			<img
				width="600"
				height="600"
				:data-src="showPic"
				:alt="name" />
			<ImageLoading />
			<div class="card-item__icon">
				<CircleIcon
					:hover-bg="filterTypeBg"
					:hover-icon="filterTypeIcon"
					:border-color="filterTypeBorder"
					:icon-color="filterTypeIconColor"
					:width="45"
					:height="45" />
			</div>
		</div>
		<div
			v-if="createTime"
			class="card-item__time">
			{{ formatDate(createTime) }}
		</div>
		<div class="card-item__name">{{ name }}</div>
	</a>
</template>

<script>
import { formatDate } from '@/utils/index';
export default {
	name: 'CardItem',
	props: {
		showType: {
			type: String,
			default: 'products',
		},
		name: {
			type: String,
			default: '',
		},
		showPic: {
			type: String,
			default: '',
		},
		path: {
			type: String,
			default: '',
		},
		createTime: {
			type: String,
			default: '',
		},
	},
	computed: {
		filterTypeBorder() {
			return this.showType === 'products' ? 'var(--primary-color)' : '#fff';
		},
		filterTypeBg() {
			return this.showType === 'products' ? 'var(--primary-color)' : '#fff';
		},
		filterTypeIcon() {
			return this.showType === 'products' ? '#fff' : 'var(--primary-color)';
		},
		filterTypeIconColor() {
			return this.showType === 'products' ? 'var(--primary-color)' : '#fff';
		},
	},
	methods: {
		formatDate,
	},
};
</script>

<style lang="less" scoped>
.card-item {
	&__image {
		position: relative;
		& > img {
			width: 100%;
			display: block;
      aspect-ratio: 1 / 1;
      object-fit: cover;
		}
	}
	&__icon {
		position: absolute;
		bottom: 30px;
		left: 30px;

		.media-lg({
			bottom: 15px;
			left: 15px;
		});
	}
	&__time {
		color: @text-color-third;
		margin: 5px 0;
	}
	&__name {
		font-size: 22px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 10px;
	}
}
</style>
