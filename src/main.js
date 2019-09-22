import Vue from 'vue'

import router from './tools/routes';
import store from './tools/vuexStore';
import './tools/libs';

// components
import App from './App.vue'


window.onbeforeunload = function () {
	window.localStorage.setItem('cartInfo', JSON.stringify(store.state.cartInfo))
}

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')