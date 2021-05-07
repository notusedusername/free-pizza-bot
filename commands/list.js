const Database = require("@replit/database");
const util = require("../util/util");

const db = new Database();

module.exports = function (message) {
	db.getAll().then((result) => {
		let list = "Watched name\t @mention\n"
		let match = 0;
		for(id in result) {
			let data = JSON.parse(result[id]);
			if(data.channel === message.channel.id) {
				match++;
				list += util.getPrettyName(data.name) + "\t" + data.mention + "\n";
			}
		}
		if(match === 0) {
			list = "I do not watch any name on this channel. \nTo watch your name and notify you here: *fp add <your name>*.";
		}
		message.channel.send(list);
	})
	.catch((error) => {
		util.error("Error while getting list of subscribers", error);
	});
}
