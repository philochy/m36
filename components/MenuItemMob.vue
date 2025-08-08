<template>
  <div class="menu-item-mob">
    <ul class="menu-item-mob__list">
      <li
        v-for="(item, index) in menu"
        :key="index"
        class="menu-item-mob__item"
      >
        <div class="menu-item-mob__block">
          <a class="menu-item-mob__link" :href="item.path">
            {{ item.name_ch }}
          </a>
          <div
            v-if="item.children && item.children.length > 0"
            class="menu-item-mob__icon"
            @click="handleToggle($event)"
          >
            <Iconify
              class="menu-item-mob__icon--down"
              icon="tabler:chevron-down"
            />
          </div>
        </div>
        <div
          v-if="item.children && item.children.length > 0"
          class="menu-item-mob__child"
        >
          <MenuItemMob :menu="item.children" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	name: 'MenuItemComponent',
	props: {
		menu: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	data() {
		return {};
	},
	methods: {
		handleToggle(event) {
			$(event.currentTarget).parent().next().slideToggle(300);
			$(event.currentTarget).find('.menu-item-mob__icon--down').toggleClass('rotate');
		},
	},
};
</script>

<style lang="less" scoped>
.icon-rotate() {
	transform: rotate(-180deg);
}
.rotate {
	.icon-rotate();
}
.menu-item-mob {
	background-color: #fff;
	display: none;
	.media-lg({
        display: block;
    });
	&__list {
		min-width: 200px;
		position: relative;
	}
	&__block {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid @border-third;
		.media-lg({
			padding: 0 20px;
		});
		&--active {
			background-color: @theme-color-primary;
			* {
				color: #fff !important;
			}
		}
	}
	&__link {
		color: @text-color-primary;
	}

	&__icon {
		width: 30px;
		text-align: center;
		color:#bbb;
		&--down {
			transition: all 0.3s linear;
		}
	}

	&__child {
		display: none;
		// transition: all .3s ease-in;
		.menu-item-mob {
			&__item {
				padding-left: 20px;
			}
		}
	}
}
</style>
