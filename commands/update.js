const {EmbedBuilder} = require('discord.js')

const LGSM = require('../modules/lgsm')
const os = require('os');

module.exports = {
	data: {
		name: 'update',
		description: `Met à jour le serveur`,
		options: []
	},
	async execute(interaction) {
		const BeforeEmbed = new EmbedBuilder().setAuthor({
			name: `Requête...`,
			iconURL: interaction.client.user.avatarURL()
		});
		await interaction.reply({
			embeds: [BeforeEmbed],
			fetchReply: true,
			ephemeral: false
		});
		const lgsmOptions = LGSM.getOptions();
		lgsmOptions.interaction = interaction;
		await LGSM.SendCommand("update",lgsmOptions);
	}
}