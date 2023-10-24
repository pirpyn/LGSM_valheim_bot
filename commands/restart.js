const {EmbedBuilder} = require('discord.js')

const LGSM = require('../modules/lgsm')
const os = require('os');

module.exports = {
	data: {
		name: 'restart',
		description: `Redémarrer le serveur`,
		options: []
	},
	async execute(interaction) {
		const BeforeEmbed = new EmbedBuilder().setAuthor({
			name: `Redémarrage...`,
			iconURL: interaction.client.user.avatarURL()
		})
		await interaction.reply({
			embeds: [BeforeEmbed],
			fetchReply: true,
			ephemeral: true
		});
		await LGSM.lgsmSendCommand("restart",{interaction: interaction});
	}
}