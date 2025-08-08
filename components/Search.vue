<template>
	<div class="wrap-search">
		<input
			v-model="searchVal"
			class="wrap-search__input"
			placeholder="search"
			@keydown.enter="handleSearch" />
		<div
			class="wrap-search__icon"
			@click="handleSearch">
			<Iconify icon="tabler:search" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Search',
	data() {
		return {
			searchVal: '',
		};
	},
	methods: {
		handleSearch() {
			if (this.searchVal) {
				window.location.replace(
					`${window.location.origin}/search?keywords=${this.searchVal}`,
				);
			} else {
				this.$message.error('Please enter the content!');
			}
		},
	},
};
</script>

<style lang="less">
.wrap {
	&-search {
		width: 180px;
		margin: 25px @spacing-md;
		padding: 0 20px;
		display: flex;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 30px;
		box-sizing: border-box;

		.media-lg({
			width: 100%;
			margin: 0;
		});

		&__input {
			width: 100%;
			color: @header-text-color;
			margin-right: 5px;
			padding: 10px 0;
			border: none;
			outline: none;
			background-color: transparent;
			font-size: 16px;

			&::placeholder {
				font-size: 16px;
				color: @header-text-color;
			}
		}

		&__icon {
			display: flex;
			cursor: pointer;
			font-size: 26px;
		}
	}
	&-language {
		margin: 0 30px;
		display: flex;
		align-items: center;
		cursor: pointer;

		&__icon {
			transition: all 0.3s ease-in-out;
		}
	}
}
</style>
