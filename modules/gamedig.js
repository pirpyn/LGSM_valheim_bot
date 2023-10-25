const Gamedig = require('gamedig');
const config = require('../config.json');

async function GetStatus(type = 'protocol-valve', port = config.server_port, host = config.server_host){
	let server_status = {
		online: false,
		host: host,
		map: undefined,
		players: undefined
	};
	await Gamedig.query({
		type: type,
		port: port,
		host: host
	}).then((state) => {
		server_status = {
			online: true,
			host: host,
			map: state.name,
			players: state.raw.numplayers,
		};
	});
	return server_status;
}

module.exports = {
	GetStatus
}