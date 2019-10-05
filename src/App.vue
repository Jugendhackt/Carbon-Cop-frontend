<template>
	<v-app>
		<v-app-bar app>
			<v-toolbar-title class="headline">
				Carbon Cops
			</v-toolbar-title>

			<v-spacer></v-spacer>

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

			<v-btn fixed fab large bottom right>
				<v-icon>mdi-bike</v-icon>
			</v-btn>
		</v-content>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			message: 'hallo'
		};
	}
};
</script>

<style lang="scss" scoped>
.v-btn--ride {
	bottom: 0;
	position: fixed;
	margin: 0 0 16px 16px;
}
</style>
