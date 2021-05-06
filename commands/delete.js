const Database = require("@replit/database");
const util = require("../util/util");

const db = new Database();

module.exports = function (name, channel) {
	db.getAll().then((result) => {
		for(id in result) {
			let data = JSON.parse(result[id]);
			if(data.channel === channel.id && name == data.name) {
				db.delete(id).then(() => {
					channel.send(data.mention + ", I won't watch " + util.getPrettyName(data.name) + " from now.");
				});
			}
		}
	})
	.catch((error) => {
		console.error("Error while deleting a subscriber", error);
	});
}