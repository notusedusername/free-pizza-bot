const Database = require("@replit/database");
const utils = require("../util/util");

const db = new Database();

module.exports = function (name, channel) {
	db.getAll().then((result) => {
		let mention;
		for(id in result) {
			let data = JSON.parse(result[id]);
			if(data.channel === channel.id && name == data.name) {
				mention = data.mention;
				db.delete(id).then(() => {
					channel.send(mention + ", I won't watch " + util.getPrettyName(data.name) + " from now.");
				});
			}
		}
	})
	.catch((error) => {
		console.error("Error while deleting a subscriber", error);
	});
}