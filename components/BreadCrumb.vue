<template>
	<div class="container-bread">
		<div class="bread-wrap">
			<div class="bread-wrap__block">
				<a href="/">Home</a>
			</div>
			<div
				v-for="(item, index) in menuList"
				:key="index"
				class="bread-wrap__item"
				:class="[
					(currentPath == item.path && navType == 1) ||
					(navType == 2 && index == menuList.length - 1)
						? 'bread-wrap__item--active'
						: 'bread-wrap__item--default',
				]">
				<Iconify icon="tabler:chevron-right" />
				<a
					v-if="currentPath != item.path && navType == 1"
					:href="item.path"
					>{{ item.name_ch }}</a
				>
				<a
					v-else-if="navType == 2 && index != menuList.length - 1"
					:href="item.path"
					>{{ item.name_ch }}</a
				>
				<span v-else>{{ item.name_ch }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Breadcrumb',
	props: {
		breadList: {
			type: Array,
			default: () => [],
		},
		navType: {
			type: Number,
			default: 1,
		},
	},
	data() {
		return {
			treeList: [],
			menuList: [],

			currentPath: null,
		};
	},
	mounted() {
		let strList = '';
		if (this.$route.path.endsWith('/')) {
			const pathList = this.$route.path.split('/');
			pathList.pop();
			strList = pathList;
		} else {
			strList = this.$route.path.split('/');
		}
		if (!this.$route.path.includes('/page-')) {
			this.currentPath = `/${strList[strList.length - 1]}`;
		} else {
			this.currentPath = `/${strList[strList.length - 2]}`;
		}
		if (this.breadList.length > 0) {
			this.menuList = JSON.parse(JSON.stringify(this.breadList));
			return;
		}
		this.treeList = JSON.parse(
			JSON.stringify(this.$store.state.headerData.menu),
		);
		if (this.navType === 1) {
			const nodeId = this.getParentNodeId(this.treeList, this.$route.path);
			this.menuList = this.getParentList(this.treeList, nodeId);
		} else {
			const pathList = this.$route.path.split('/');
			pathList.forEach((v) => {
				if (v) {
					const name = v.slice(0, 1).toUpperCase() + v.slice(1);
					this.menuList.push({
						name_ch: name,
						path: `/${v}`,
					});
				}
			});
		}
	},
	methods: {
		getParentNodeId(tree, path) {
			for (const node of tree) {
				if (node.path === path) {
					return node.ID;
				}
				if (
					node.children &&
					node.children.some((child) => child.path === path)
				) {
					return node.ID;
				}
				if (node.children) {
					const parentId = this.getParentNodeId(node.children, path);
					if (parentId !== null) {
						return parentId;
					}
				}
			}
			return null;
		},
		getParentList(tree, nodeId) {
			const temp = [];
			const forFn = function (arr, id) {
				for (let i = 0; i < arr.length; i++) {
					const item = arr[i];
					if (item.isDefault) {
						if (item.ID === id) {
							temp.push(item);
							if (item.children.length > 0) {
								forFn(item.children, id);
							}
							break;
						}
					} else {
						// if (item.parentid === id) {
						//   temp.push(item);
						//   break;
						// }
					}
					if (item.children.length > 0) {
						forFn(item.children, id);
					}
				}
			};
			forFn(tree, nodeId);
			return temp;
		},
	},
};
</script>

<style lang="less" scoped>
.container-bread {
	display: flex;
	.media-lg({
		display: none;
	});
	.bread-wrap {
		display: flex;
		align-items: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		background: #f6f6f6;
		padding: 10px;

		&__block {
			display: inline-block;
			& > a {
				color: @text-color-fourth;
			}
		}
		&__item {
			display: flex;
			align-items: center;
			margin-left: 4px;

			&--default {
				* {
					color: @text-color-fourth;
				}
			}
			&--active {
				* {
					color: @text-color-secondary;
				}
			}
		}
	}
}
</style>
