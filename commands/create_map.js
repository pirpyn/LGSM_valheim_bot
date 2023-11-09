const {EmbedBuilder} = require('discord.js')

const LGSM = require('../modules/lgsm')

module.exports = {
	data: {
		name: 'create_map',
		description: `Crée une nouvelle map`,
		type: 1,
		options: [
			{
				name: "name",
				type: 3,
				description: "Nom du monde",
				required: true,
			},
			{
				name: "description",
				type: 3,
				description: "Titre à afficher",
				required: true,
			},
			{
				name: "password",
				type: 3,
				min_length: 5,
				description: "Mot de passe",
			}
		]
	},
	async execute(interaction) {
		const BeforeEmbed = new EmbedBuilder().setAuthor({
			name: `Création de map...`,
			iconURL: interaction.client.user.avatarURL()
		});
		await interaction.reply({
			embeds: [BeforeEmbed],
			fetchReply: true,
			ephemeral: false
		})
		const name = interaction.options.getString('name');
		const desc = interaction.options.getString('description');
		const pass = interaction.options.getString('password');
		const Embed = new EmbedBuilder();
		const output = await LGSM.CreateMap(name,desc,pass);
		Embed.addFields(
			{
				name: 'Création de map',
				value: output,
			}
		);
		Embed.setColor('Orange');
		await interaction.editReply({
			embeds: [Embed]
		});
	}
}