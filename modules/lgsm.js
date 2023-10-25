const execSync = require('child_process').execSync;
const os = require('os');
const {lgsm_user,lgsm_bin,lgsm_config} = require('../config.json');
const {EmbedBuilder} = require('discord.js')

function getOptions(options){
	if (options === undefined){
		options = {interaction: undefined};
	}
	else {
		if (!('interaction' in options)) options['interaction'] = undefined;
	}
	return options;
}

async function lgsmSendCommand(lgsm_args, options = undefined){
	const shell_command = `${lgsm_bin} ${lgsm_args}`;
	console.log(`LGSM command is ${shell_command}`);
	let lgsm_output = "";
	try {
		lgsm_output = execSync(shell_command).toString();
	} catch (error) {
		console.error(error);
		lgsm_output = "Error";
	}
	options = getOptions(options);
	if (options.interaction !== undefined)
	{
		const Embed = new EmbedBuilder();
		Embed.addFields(
			{
				name: `LGSM ${lgsm_args} output`,
				value: "```"+os.EOL+lgsm_output+os.EOL+"```",
			}
		);
		await options.interaction.editReply({
			embeds: [Embed],
			ephemeral: true
		});
	}
	return lgsm_output;
}

async function lgsmGetDetails(){
	const lgsm_output = await lgsmSendCommand('details');
	const commandOutputStrings = lgsm_output.split(os.EOL);
	let detailsDict = {};
	let idx = 0;
	let block_names = [
		"-", // dummy because block names precedes block data
		"Distro Details",
		"Server Resource",
		"Game Server Resource Usage",
		"Valheim Server Details",
		lgsm_user+" Script Details",
		"Backups",
		"Command-line Parameters",
		"Ports"
	];
	let block_data = "";
	for (const line of commandOutputStrings){
		if (line.length == 0){
			continue;
		}
		if (block_names.includes(line)){
			if (idx > 0 && block_data.length > 0){
				detailsDict[block_names[idx]] = block_data;
			}
			block_data = "";
			++idx;
		}
		else{
			// Removing section sepator (===...) and sensitive information
			if ( line[0]=== '='
				|| line.includes("password")
				|| line.includes("User")
				|| line.includes("Location")
				|| line.includes("Internet IP")
				|| line.includes("Hostname")
				|| line.includes("Storage")
				|| line.includes(lgsm_user)

			){
				continue;
			}
			else {
				block_data += line + os.EOL;
			}
		}
	}
	if (block_data.length > 0){
		detailsDict[block_names[idx]]=block_data;
	}
	return detailsDict;
}

function CheckInstall(){
	try {
		if (! (fs.statSync(lgsm_config).isDirectory()))
			throw new Error;
	} catch (err) {
		throw new Error(`From config.json: lgsm_config ${lgsm_config} is not a dir`);
	}
	try {
		if (! (fs.statSync(lgsm_bin).mode & fs.constants.S_IXUSR))
			throw new Error;
	} catch (err) {
		throw new Error(`From config.json: lgsm_bin ${lgsm_bin} is not an executable file`);
	}
	const LGSM_instance_config = path.join(lgsm_config,lgsm_user)+'.cfg';
	try {
		if (! (fs.lstatSync(LGSM_instance_config).isSymbolicLink()))
			throw new Error;
	} catch (err) {
		throw new Error(`From config.json: lgsm_user ${lgsm_user} already have an instance config file ${LGSM_instance_config} and its not a link`);
	}
	console.info('LGSM installation valid')
}

CheckInstall();

module.exports = {
	lgsmSendCommand,
	lgsmGetDetails
}
