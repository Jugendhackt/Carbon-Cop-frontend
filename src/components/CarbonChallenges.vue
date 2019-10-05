<template>
	<v-container>
		<h2>Challenges 🏆</h2>
		<v-row>
			<v-col cols="12" sm="6" md="3" lg="3" v-for="n in 4" :key="n">
				<v-card outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<div class="overline mb-4">Challenge #{{ n }}</div>
							<v-list-item-title class="headline mb-1">
								Challenge #{{ n }}
							</v-list-item-title>
							<v-list-item-subtitle
								>Greyhound divisely hello coldly fonwderfully
							</v-list-item-subtitle>
						</v-list-item-content>

						<v-list-item-avatar tile size="80" color="grey">
							<v-icon dark>mdi-seal</v-icon>
						</v-list-item-avatar>
					</v-list-item>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
