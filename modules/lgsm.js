const execSync = require('child_process').execSync;
const os = require('os');
const {lgsm_user,lgsm_bin,lgsm_config} = require('../config.json');

async function lgsmSendCommand(lgsm_args){
	const shell_command = `${lgsm_bin} ${lgsm_args}`;
	console.log(`LGSM command is ${shell_command}`);
	let lgsm_output = "";
	try {
		lgsm_output = execSync(shell_command).toString();
	} catch (error) {
		console.error(error);
		lgsm_output = "Error";
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

module.exports = {
	lgsmSendCommand,
	lgsmGetDetails
}
