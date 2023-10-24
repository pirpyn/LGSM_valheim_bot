const {EmbedBuilder} = require('discord.js')
const gamedigGetStatus = require('../modules/gamedig')

module.exports = {
	data: {
		name: 'status',
		description: 'Obtenir le status du serveur Valheim',
		options: []
	},
	async execute(interaction) {
		// On lui ajoute un name et iconURL, et on va par la suite le modifier avec les valeurs.
		const BeforeEmbed = new EmbedBuilder().setAuthor({
			name: `Connexion au serveur...`,
			iconURL: interaction.client.user.avatarURL()
		})
		const sent = await interaction.reply({
			embeds: [BeforeEmbed],
			fetchReply: true,
			ephemeral: true
		})

		const serverStatus = await gamedigGetStatus();
		const Embed = new EmbedBuilder();
		Embed.setAuthor({
			name: `Status @${serverStatus.host}`,
			iconURL: interaction.client.user.avatarURL()
		});
		if (serverStatus.online) {
			Embed.addFields(
				{
					name: 'Map',
					value: serverStatus.map,
					inline: true
				},
				{
					name: 'Joueurs',
					value: `${serverStatus.players}`,
					inline: true
				},
			)
		}
		else {
			Embed.addFields(
				{
					name: 'Status',
					value: "offline ou incapable d'avoir le status",
					inline: true
				},
			);
		}
		await interaction.editReply({
			embeds: [Embed],
			ephemeral: true
		})
	}
}