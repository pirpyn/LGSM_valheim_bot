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
		// On lui ajoute un name et iconURL, et on va par la suite le modifier avec les valeurs.
		const BeforeEmbed = new EmbedBuilder().setAuthor({
			name: `Redémarrage...`,
			iconURL: interaction.client.user.avatarURL()
		})
		await interaction.reply({
			embeds: [BeforeEmbed],
			fetchReply: true,
			ephemeral: true
		});
		await LGSM.lgsmSendCommand("restart");
		const commandOutput = await LGSM.lgsmSendCommand("restart");
		const Embed = new EmbedBuilder()
		.setAuthor({
			name: `Redémarrage`,
			iconURL: client.user.avatarURL()
		})
		.addFields(
			{
				name: 'Console',
				value: "```"+os.EOL+`${commandOutput}`+os.EOL+"```",
				inline: true
			}
		);
		await interaction.editReply({
			embeds: [Embed],
			ephemeral: true
		})
	}
}