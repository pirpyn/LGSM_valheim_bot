const {EmbedBuilder} = require('discord.js')

const LGSM = require('../modules/lgsm')

module.exports = {
	data: {
		name: 'delete_map',
		description: "Supprime une map",
		type: 1,
		options: [
			{
				name: "name",
				type: 3,
				description: "Nom de la map",
				autocomplete: true,
				required: true,
			},
		]
	},
	async autocomplete(interaction) {
		console.log("autocomplete");
		const focusedValue = interaction.options.getFocused();
		const choices = LGSM.GetMaps();
		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
		const BeforeEmbed = new EmbedBuilder().setAuthor({
			name: `Suppression de map...`,
			iconURL: interaction.client.user.avatarURL()
		});
		await interaction.reply({
			embeds: [BeforeEmbed],
			fetchReply: true,
			ephemeral: false
		})
		const name = interaction.options.getString('name');
		const Embed = new EmbedBuilder();
		await LGSM.DeleteMap(name);
		Embed.addFields(
			{
				name: `Suppression de '${name}'`,
				value: `success`,
			}
		);
		Embed.setColor('Orange');
		await interaction.editReply({
			embeds: [Embed]
		});
	}
}