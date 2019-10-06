<template>
	<v-container fill-height>
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<v-card class="elevation-12">
							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>Login form</v-toolbar-title>
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
									Need an account?
									<router-link to="register">Register</router-link>
								</span>
								<div class="flex-grow-1"></div>
								<v-btn color="primary" @click="login()">Login</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-container>
</template>

<script>
export default {
	data() {
		return { username: '', password: '' };
	},
	methods: {
		async login() {
			const { username, password } = this;

			try {
				const response = await fetch(`${process.env.VUE_APP_HOST}/login`, {
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
