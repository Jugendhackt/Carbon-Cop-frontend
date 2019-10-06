<template>
	<v-app>
		<v-app-bar app>
			<v-toolbar-title class="headline">
				Carbon Cops
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

		<v-content>
			<router-view />
		</v-content>

		<AddRide />
	</v-app>
</template>

<script>
import AddRide from './components/AddRide';

export default {
	name: 'App',
	components: { AddRide }
};
</script>

<style lang="scss" scoped>
.v-btn--ride {
	bottom: 0;
	position: fixed;
	margin: 0 0 16px 16px;
}
</style>
