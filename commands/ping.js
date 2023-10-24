const {EmbedBuilder} = require('discord.js')
module.exports = {
	// "data" est le corps de la commande,
	// c'est ce qu'on va retrouver quand on va taper /ping
	data: {
		name: 'ping',
		description: 'Obtenir le ping du robot',
		options: []
	},
	// et tout ça, c'est la logique de la commande
	async execute(interaction) {
		// Par exemple là on créée un embed avec EmbedBuilder de discord.js
		// On lui ajoute un name et iconURL, et on va par la suite le modifier avec les valeurs.
		const PingBeforeEmbed = new EmbedBuilder().setAuthor({
			name: `L'oiseau va revenir avec le ping du robot...`,
			iconURL: interaction.client.user.avatarURL()
		})
		const sent = await interaction.reply({
			embeds: [PingBeforeEmbed],
			fetchReply: true,
			ephemeral: true
		})
		const TotalPing = sent.createdTimestamp - interaction.createdTimestamp
		const PingEmbed = new EmbedBuilder()
		.setAuthor({
			name: `Le ping de ${interaction.client.user.username}`,
			iconURL: interaction.client.user.avatarURL()
		})
		.addFields({
			name: 'Total du ping',
			value: `${TotalPing}ms`,
			inline: true
		},
		{
			name: 'Websocket',
			value: `${interaction.client.ws.ping} ms`,
			inline: true
		})
		await interaction.editReply({
			embeds: [PingEmbed],
			ephemeral: true
		})
	}
}