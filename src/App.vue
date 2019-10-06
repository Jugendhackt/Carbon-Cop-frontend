<template>
	<v-app>
		<v-app-bar app :dark="!$store.state.username && $route.name === 'home'">
			<v-toolbar-title class="headline">
				Low Car
			</v-toolbar-title>

			<v-spacer />

			<router-link to="/">
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon v-on="on">
							<v-icon>mdi-home</v-icon>
						</v-btn>
					</template>

					<span>Home</span>
				</v-tooltip>
			</router-link>

			<v-tooltip bottom v-if="$store.state.username">
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on" @click="$store.commit('logout')">
						<v-icon>mdi-logout</v-icon>
					</v-btn>
				</template>
				<span>Logout</span>
			</v-tooltip>

			<router-link to="login" v-else>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn icon v-on="on">
							<v-icon>mdi-account</v-icon>
						</v-btn>
					</template>
					<span>Login</span>
				</v-tooltip>
			</router-link>
		</v-app-bar>

		<router-view />

		<AddRide v-if="$store.state.username" />
	</v-app>
</template>

<script>
import AddRide from './components/AddRide';

export default {
	name: 'App',
	components: { AddRide },
	methods: {
		loginLogout() {
			if (this.$store.state.username) {
				this.$store.commit('logout');
			} else {
				this.$router.push('login');
			}
		}
	}
};
</script>

<style lang="scss">
html,
body {
	overflow: auto !important;
}
</style>
