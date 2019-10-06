<template>
	<v-container class="landing-page white--text pa-0 ma-0" fluid fill-height>
		<v-content>
			<v-container>
				<h1 class="display-4 text-center">Low Car</h1>
				<h3 class="text-center display-1 my-12">
					Let's stop polluting the air with our cars. Low Car will help us get
					there! Low Car - {{ slogans[slogan] }}!
				</h3>

				<v-row>
					<v-col cols="12" sm="12" md="4">
						<v-card dark>
							<v-card-title>
								<v-icon large left>
									mdi-seal
								</v-icon>
								<span class="title font-weight-light">Challenges</span>
							</v-card-title>

							<v-card-text class="subtitle-1">
								Tackle some motivating challenges, help the environment and
								collect cool rewards!
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12" sm="12" md="4">
						<v-card dark>
							<v-card-title>
								<v-icon large left>
									mdi-podium
								</v-icon>
								<span class="title font-weight-light">Leaderboards</span>
							</v-card-title>

							<v-card-text class="subtitle-1">
								Climb the leaderboards and show the world what a badass you
								truly are.
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12" sm="12" md="4">
						<v-card dark>
							<v-card-title>
								<v-icon large left>
									mdi-star
								</v-icon>
								<span class="title font-weight-light">Fans love it!</span>
							</v-card-title>

							<v-card-text class="subtitle-1">
								<p>
									“Woah this really be the next level sh*t, just missing a Klieh
									then it be perfect tho”
								</p>
								— Happy User
							</v-card-text>
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
		return {
			slogan: 0,
			slogans: ['High Bike', 'Less Carbs', 'Go Green', 'Foo Bar']
		};
	},
	mounted() {
		setInterval(() => {
			let slogan = this.slogan;
			while (slogan === this.slogan) {
				slogan = Math.floor(Math.random() * this.slogans.length);
			}

			this.slogan = slogan;
		}, 3000);
	}
};
</script>

<style lang="scss" scoped>
.landing-page {
	background-image: url('../assets/landing.jpg');
	background-size: cover;
	width: 100%;

	.v-card {
		height: 100%;
	}
}
</style>
