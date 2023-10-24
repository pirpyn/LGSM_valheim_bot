const {EmbedBuilder} = require('discord.js')
const os = require('os');

const LGSM = require('../modules/lgsm')

module.exports = {
	data: {
		name: 'switch_map',
		description: `Change la map du serveur`,
		type: 1,
		options: [
			{
				name: "map",
				type: 3,
				autocomplete: true,
				description: "Map name",
				required: true,
			}
		]
	},
	async autocomplete(interaction) {
		console.log("autocomplete");
		const focusedValue = interaction.options.getFocused();
		const choices = LGSM.lgsmGetMaps();
		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
		// On lui ajoute un name et iconURL, et on va par la suite le modifier avec les valeurs.
		const BeforeEmbed = new EmbedBuilder().setAuthor({
			name: `Changement de map...`,
			iconURL: interaction.client.user.avatarURL()
		});
		await interaction.reply({
			embeds: [BeforeEmbed],
			fetchReply: true,
			ephemeral: true
		})
		const map = interaction.options.getString('map');
		const status = await LGSM.lgsmSwitchMaps(map,{interaction:interaction});
		const Embed = new EmbedBuilder();
		Embed.addFields(
			{
				name: `Changement de map`,
				value: "```"+os.EOL+status+os.EOL+"```",
			}
		);
		await interaction.editReply({
			embeds: [Embed],
			ephemeral: false
		});
	}
}