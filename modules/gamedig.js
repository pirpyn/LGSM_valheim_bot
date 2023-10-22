const Gamedig = require('gamedig');
const config = require('../config.json');

module.exports = async (type = 'protocol-valve', port = config.server_port, host = config.server_host) => {
	let server_status = {};
	await Gamedig.query({
		type: type,
		port: port,
		host: host
	}).then((state) => {
		// console.log(state);
		server_status = {
			online: true,
			host: host,
			map: state.name,
			players: state.raw.numplayers,
		}
	}).catch((error) => {
		console.log(error);
		server_status = {
			online: false,
			host: host,
		}
	});
	return server_status;
}