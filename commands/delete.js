const Database = require("@replit/database");
const util = require("../util/util");
const { MessageAttachment } = require('discord.js');

const db = new Database();

module.exports = function (name, channel) {
	db.getAll().then((result) => {
		let removed = false;
		for(id in result) {
			let data = JSON.parse(result[id]);
			if(data.channel === channel.id && name == data.name) {
				db.delete(id).then(() => {
					channel.send(data.mention + ", I won't watch " + util.getPrettyName(data.name) + " from now.");
				});
				removed = true;
			}
		}
		if (!removed) {
			sendUnknownMessage(channel);
		}
	})
	.catch((error) => {
		util.error("Error while deleting a subscriber", error);
	});
}

function sendUnknownMessage(channel) {
	util.log("Removing non-existing user.");
	try {
		const attachment = new MessageAttachment("https://i.kym-cdn.com/entries/icons/original/000/028/648/loki.jpg");
		channel.send("", attachment);
	} catch (err) {
		util.error("Error while loading meme attachment for unknown name delete attempt", err).
		channel.send("I've never met this person in my life.");
	}
}