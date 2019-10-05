<template>
	<v-app>
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<v-card class="elevation-12">
							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>Register form</v-toolbar-title>
								<div class="flex-grow-1"></div>
							</v-toolbar>
							<v-card-text>
								<v-form>
									<v-text-field
										label="Username"
										v-model="username"
										prepend-icon="mdi-account"
										type="text"
									/>

									<v-text-field
										label="Password"
										v-model="password"
										prepend-icon="mdi-lock"
										type="password"
									/>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<span>
									Already have an account?
									<router-link to="login">Login</router-link>
								</span>
								<div class="flex-grow-1"></div>
								<v-btn color="primary" @click="signup">Sign up</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
const HOST = 'http://laptop';
export default {
	data() {
		return { username: '', password: '' };
	},
	methods: {
		async signup() {
			const { username, password } = this;

			try {
				const response = await fetch(`${HOST}/signup`, {
					method: 'POST',
					body: JSON.stringify({ username, password })
				});

				if (response.status === 200) {
					this.$store.commit('login', { username, password });
					this.$router.push('/');
				}
			} catch (e) {
				console.error(e);
			}
		}
	}
};
</script>
