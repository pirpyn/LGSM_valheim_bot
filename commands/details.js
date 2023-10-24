const {EmbedBuilder} = require('discord.js')

const LGSM = require('../modules/lgsm')
const os = require('os');

module.exports = {
	data: {
		name: 'details',
		description: `Informations détaillées du serveur`,
		options: []
	},
	async execute(interaction) {
		const BeforeEmbed = new EmbedBuilder().setAuthor({
			name: `Requête...`,
			iconURL: interaction.client.user.avatarURL()
		})
		const sent = await interaction.reply({
			embeds: [BeforeEmbed],
			fetchReply: true,
			ephemeral: true
		})
		
		let embeds = [];
		const detailsDict = await LGSM.lgsmGetDetails();

		// console.log(detailsDict);
		for (const [key, value] of Object.entries(detailsDict)) {
			const Embed = new EmbedBuilder();
			Embed.addFields(
				{
					name: `${key}`,
					value: "```" + os.EOL + value + os.EOL + "```",
				}
			);
			embeds.push(Embed);
		};
		await interaction.editReply({
			embeds: embeds,
			ephemeral: true
		})
	}
}