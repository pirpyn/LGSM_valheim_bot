const synchronizeSlashCommands = require('../modules/sync_commands')
const {ActivityType} = require('discord.js')
const config = require('../config.json');
const gamedig = require('../modules/gamedig')

function setPresence(client){
	gamedig.GetStatus().then((server_status) => {
		if (server_status.online)
			client.user.setActivity(`${server_status.map}: ${server_status.players} players`, {type: ActivityType.Custom});
		else
			client.user.setActivity(`${server_status.host} offline`, {type: ActivityType.Custom});
	});
}

module.exports = {
	name: 'ready',
	async execute(client) {
		console.log(`Connecté en tant que ${client.user.username}`);
		setInterval(setPresence,60*1000,client);
		await synchronizeSlashCommands(client,
			client.commands.map((c) => c.data),
			{
				debug: true, // to print number of slash command updated
				guildId: config.guild_id // to restrict sync to one guild. Best practice to avoid sync on all guild on ready.
			}
		)
	}
}