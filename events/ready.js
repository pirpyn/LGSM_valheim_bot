const synchronizeSlashCommands = require('../modules/sync_commands')
const {ActivityType} = require('discord.js')
const config = require('../config.json');

module.exports = {
	name: 'ready',
	async execute(client) {
		console.log(`Connecté en tant que ${client.user.username}`)
		client.user.setActivity(`/bord`, {type: ActivityType.Watching})
		// C'est à ce moment-là que la synchronisation des Slash Commands se lance
		await synchronizeSlashCommands(client,
			client.commands.map((c) => c.data),
			{
				// Les paramètres à modifier pour la synchronisation
				debug: true,
				// Si vous définissez un ID de serveur, alors ça ne sera QUE pour le serveur ciblé.
				// Si dans le cas contraire vous ne mettez pas guildID, ça sera en GLOBAL,
				// Donc sur tout les serveurs.
				guildId: config.guild_id
			}
		)
	}
}