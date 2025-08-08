<template>
	<div class="container-language">
		<ul>
			<li
				v-for="(item, index) in language"
				:key="index"
				:class="item.class">
				<a
					:href="
						item.language == 'English'
							? headerData.origin
							: headerData.origin.split('//')[0] +
							'//' +
							item.href +
							'.' +
							headerData.origin.split('//')[1]
					"
					:title="item.language"
					target="_blank">
					<b class="country-flag" />
					<span>{{ item.language }}</span>
				</a>
			</li>
		</ul>
		<div class="container-language__btn">
			<Iconify
				class="nav-wrap__block__language__icon"
				icon="tabler:x" />
		</div>
	</div>
</template>

<script>
import language from '../static/language.json';
export default {
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
			language,
		};
	},
};
</script>

<style lang="less" scoped>
@import '@/assets/css/language.less';

.container-language {
	position: absolute;
	top: 90px;
	right: 0;
	width: 360px;
	background: #fff;
	padding: 20px;
	z-index: 9999;
	transition: all 0.3s ease-in-out;
	border: 1px solid #ddd;
	border-radius: 4px;
	overflow-y: scroll;
	max-height: 65vh;
	display: none;

	ul {
		margin-left: 0;
		padding: 0;
		margin-bottom: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);

		li {
			display: inline-block;
			vertical-align: top;
			width: 100%;
			font-size: 10pt;
			overflow: hidden;
			margin: 0px !important;

			a {
				display: flex;
				align-items: center;
				width: 100%;
				color: #989898;
				height: 100%;
				padding: 10px 0 10px 0;
				transition: all 0.3s;
				font-weight: 400;
				position: relative;
				text-decoration: none;

				&:hover {
					color: #373737;
				}
				span {
					position: relative;
					display: block;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					// padding: 0 0 0 33px;
					margin-left: 5px;
					overflow: hidden;
					line-height: 20px;
				}
			}
		}
	}

	&__btn {
		color: #7c7c7c;
		font-size: 20px;
		text-align: center;
		background-color: #f3f3f3;
		cursor: pointer;
		margin-top: 20px;
		display: flex;
		padding: 8px 0;
		justify-content: center;

		&:hover {
			color: #004da1;
		}
	}

	&::-webkit-scrollbar {
		width: 6px; /* 设置滚动条的宽度 */
	}

	&::-webkit-scrollbar-thumb {
		background-color: #888; /* 设置滚动条滑块的颜色 */
		border-radius: 5px; /* 设置滚动条滑块的圆角 */
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: #555; /* 设置滚动条滑块在悬停时的颜色 */
	}

	&::-webkit-scrollbar-track {
		background-color: #eee; /* 设置滚动条背景的颜色 */
	}
}
</style>
