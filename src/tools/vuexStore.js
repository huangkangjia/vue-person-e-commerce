import Vue from 'vue'

// vuex
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		cartInfo: JSON.parse(window.localStorage.getItem('cartInfo')) || {},
		isLogin: false,
	},
	mutations: {
		addGoods(state, payload) {
			let id = payload.id
			if (state.cartInfo.id == undefined) {
				Vue.set(state.cartInfo, id, payload.buycount)
			} else {
				state.cartInfo.id += payload.buycount
			}
		},
		updateGoodsInfo(state, payload) {
			let id = payload.id
			state.cartInfo[id] = payload.buycount
		},
		deleteGoods(state, id) {
			Vue.delete(state.cartInfo, id)
		},
		toggleLoginStatus(state, val) {
			state.isLogin = val
		}
	},
	getters: {
		cartNum: state => {
			let num = 0;
			for (const key in state.cartInfo) {
				num += state.cartInfo[key]
			}
			return num
		}

	}
})

export default store