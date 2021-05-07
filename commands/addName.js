const hash = require('object-hash');
const util = require("../util/util");
const Database = require("@replit/database");

const db = new Database();

function addNameToChannel(name, message) {
	if(isThereAName(name)) {
		addNameToDb(name, message);
	} else {
		message.reply("You did not said the name to watch. It should look like this: *fp add Ilove Pizza*");
		util.log("Add command without name.");
	}
}

function isThereAName(name) {
	return name.length > 0;
}

function addNameToDb(name, message) {
	let data = { 
		name: name, 
		channel: message.channel.id,
		mention: message.author.toString()
	};
	db.set(getDbKey(data), JSON.stringify(data)).then(() => {
		util.log("New name successfully added!");
		message.reply("I will @mention you here, if you won a free pizza! Type *fp list* to check the watched names on this channel.");
	})
	.catch( (error) => util.error("Error while inserting new sub", error));
}


function getDbKey(data) {
	return hash(data);
}

module.exports = addNameToChannel