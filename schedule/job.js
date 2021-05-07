const Discord = require("discord.js")
const Database = require("@replit/database");
const util = require("../util/util");

const checkName = require("../commands/check");

const db = new Database();
const client = new Discord.Client();
client.login(process.env.TOKEN);

function job(){
	util.log('Checking winners job is started!');
	db.getAll().then((result) => {
		let records = [];
		for(id in result) {
			let data = JSON.parse(result[id]);
			let channel = client.channels.cache.get(data.channel);
			records.push({
				name: data.name,
				channel: channel,
				mention: data.mention
			});
		}
		checkName(records, true);
	})
	.catch((error) => {
		util.error("Error while getting list of subscribers", error);
	});
}

module.exports = job