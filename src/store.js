import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
	storage: window.localStorage
});

export default new Vuex.Store({
	state: {
		username: undefined,
		password: undefined
	},
	mutations: {
		login(state, payload) {
			state.username = payload.username;
			state.password = payload.password;
		},
		logout(state) {
			state.username = undefined;
			state.password = undefined;
		}
	},
	plugins: [vuexLocal.plugin]
});
