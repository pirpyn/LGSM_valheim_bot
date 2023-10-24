/**
	@document    app.js
	@author      Pierre Payen
	@version     1.0.0
	@copyright   2023, Pierre Payen
	@license     GNU General Public License v3.0
	@repository  
	@description Un robot Discord gérant et aidant les utilisateurs pour un serveur Valheim.
*/

const {Client, Collection, GatewayIntentBits, Options} = require('discord.js')
const fs = require('fs')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		// GatewayIntentBits.MessageContent,
		// GatewayIntentBits.DirectMessages,
	],
});

client.commands = new Collection();

process.chdir(__dirname);

const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command)
}

const eventFiles = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'))
;

for (const file of eventFiles) {
	const event = require(`./events/${file}`)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client))
	} else {
		client.on(event.name, (...args) => event.execute(...args, client))
	}
}

const config = require('./config.json');
client.login(config.token);
