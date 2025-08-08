import Vue from 'vue';
import { Pagination, Message, Backtop, Icon } from 'element-ui';

const components = [Pagination, Backtop, Icon];

const Element = {
	install(vue) {
		components.forEach((component) => {
			vue.component(component.name, component);
		});
	},
};
Vue.use(Element);

Vue.prototype.$message = Message;
