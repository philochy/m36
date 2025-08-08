import Vue from 'vue';
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

// 将 jQuery 添加到 Vue 原型上
Vue.prototype.$ = jQuery;
