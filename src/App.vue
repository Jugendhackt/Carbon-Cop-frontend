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

			<router-link to="login">
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
	components: { AddRide }
};
</script>

<style lang="scss">
html,
body {
	overflow: auto !important;
}
</style>
