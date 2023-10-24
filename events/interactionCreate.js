const { Events } = require('discord.js');

async function interactionCreateChatInput(command,interaction) {
	if (!interaction.isChatInputCommand())
		return;
	await command.execute(interaction);
}

async function interactionCreateAutocomplete(command,interaction){
	if (!interaction.isAutocomplete())
		return;
	await command.autocomplete(interaction);
}

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		try {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				throw new Error(`No command matching ${interaction.commandName} was found.`);
			}
			console.log(`/${interaction.commandName} - Par ${interaction.user.username}`);
			await interactionCreateChatInput(command,interaction);
			await interactionCreateAutocomplete(command,interaction);
		} catch (error) {
			console.error(error);
			return interaction.reply({
				content: "Une erreur s'est produite lors de l'exécution de cette commande !",
				ephemeral: true,
				fetchReply: true
			});
		}
	},
};
