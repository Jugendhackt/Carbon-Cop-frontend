import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		username: undefined,
		password: undefined
	},
	mutations: {
		login(state, payload) {
			state.username = payload.username;
			state.password = payload.password;
		}
	}
});
