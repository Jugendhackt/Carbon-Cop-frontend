<template>
	<v-app>
		<v-app-bar app>
			<v-toolbar-title class="headline">
				<span>Carbon Cops</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<router-link to="login">
				<v-btn text @click="message = 'bar'">
					<span class="mr-2">login</span>
					<v-icon>mdi-open-in-new</v-icon>
				</v-btn>
			</router-link>
		</v-app-bar>

		<v-content>
			<router-view />
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
