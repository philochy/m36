<template>
	<nav
		id="container-nav"
		class="container-nav"
		:style="{
			backgroundColor: $route.path === '/' ? '' : 'var(--primary-color)',
		}">
		<Container>
			<div class="nav-wrap">
				<div
					class="nav-wrap__icon"
					@click="handleMenu">
					<Iconify
						class="nav-wrap__icon-menu"
						icon="tabler:baseline-density-medium" />
				</div>
				<Menu :menu="headerData.menu" />
				<div class="nav-wrap__logo">
					<a
						class="nav-wrap__link"
						href="/">
						<img
							:src="headerData?.piclogo?.logourl || headerData?.piclogo?.icourl"
							alt="logo" />
					</a>
				</div>
				<div
					class="nav-wrap__icon"
					@click="showSearch = !showSearch">
					<Iconify
						class="nav-wrap__icon-search"
						icon="tabler:search" />
				</div>
				<div class="nav-wrap__block">
					<!-- language -->
					<div class="wrap-language">
						<span>English</span>
						<Iconify
							class="wrap-language__icon"
							icon="tabler:chevron-down" />

						<Language
							id="language"
							:header-data="headerData" />
					</div>
					<!-- 搜索 -->
					<Search />
				</div>
			</div>
		</Container>
		<div
			v-if="showSearch"
			class="nav-search">
			<Search />
		</div>
	</nav>
</template>

<script>
export default {
	name: 'NavBar',
	props: {
		headerData: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {
			showSearch: false,
		};
	},
	mounted() {
		$('#language').hide();

		$(document).on('click', (e) => {
			if (
				!$(e.target).closest('.wrap-language').length &&
				!$(e.target).closest('.container-language>ul').length
			) {
				// 点击空白区域
				$('#language').hide();
				$('.wrap-language__icon').css({
					transform: 'rotate(0deg)',
				});
			}
		});

		$('.wrap-language').click(() => {
			$('#language').toggle();
			if (!$('#language').is(':hidden')) {
				$('.wrap-language__icon').css({
					transform: 'rotate(180deg)',
				});
			} else {
				$('.wrap-language__icon').css({
					transform: 'rotate(0deg)',
				});
			}
		});
	},
	methods: {
		handleMenu() {
			const oContainerMenu = $('.container-menu');
			oContainerMenu.toggleClass('show');
			$('body').toggleClass('body--hidden');
		},
	},
};
</script>

<style lang="less" scoped>
.container-nav {
	position: sticky;
	top: 0;
	left: 0;
	height: 90px;
	line-height: 90px;
	z-index: 99;
	background-color: transparent;

	.media-lg({
		background-color: @theme-color-primary;
	});

	.media-lg({
		height: 70px;
		line-height: 70px;
		&::after {
			content: none;
		}
	});

	.nav-wrap {
		height: 100%;
		display: flex;
		justify-content: space-between;
		height: inherit;

		&__icon {
			display: none;
			align-items: center;
			color: @header-text-color;
			.media-lg({
				display: flex;
			});
			&-menu {
				width: 20px;
				height: 20px;
			}
			&-search {
				width: 20px;
				height: 20px;
			}
		}

		&__logo {
			display: flex;
			justify-content: center;
			align-items: center;
			.media-lg({
			});
		}
		&__link {
			display: flex;
			align-items: center;
			height: 100%;
			& > img {
				height: 100%;
				box-sizing: border-box;
				padding: 10px 0;
				object-fit: contain;
			}
		}

		&__block {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			position: relative;
			color: @header-text-color;

			.wrap-language {
				position: relative;
			}

			.media-lg({
				display: none;
			});
		}
	}

	.nav-search {
		display: none;
		padding: 20px 0;
		background-color: @theme-color-primary;

		.media-lg({
			display: block;
			padding: 20px @spacing-md;
		});
	}
}
</style>
