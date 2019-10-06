import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Chartkick.use(Chart));

new Vue({
	render: h => h(App),
	vuetify,
	store,
	router
}).$mount('#app');
