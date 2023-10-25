const synchronizeSlashCommands = require('../modules/sync_commands')
const {ActivityType} = require('discord.js')
const config = require('../config.json');

module.exports = {
	name: 'ready',
	async execute(client) {
		console.log(`Connecté en tant que ${client.user.username}`)
		client.user.setActivity(`/bord`, {type: ActivityType.Watching})
		await synchronizeSlashCommands(client,
			client.commands.map((c) => c.data),
			{
				debug: true, // to print number of slash command updated
				guildId: config.guild_id // to restrict sync to one guild. Best practice to avoid sync on all guild on ready.
			}
		)
	}
}