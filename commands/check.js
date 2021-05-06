const szazszazalek = require("../crawlers/szazszazalek");
const corleone = require("../crawlers/corleone");

module.exports = function (records, onlySuccessMessage) {
	Promise.all([szazszazalek.fetch(records), corleone.fetch(records)])
		.then((values) => {
			if(!values[0] && !values[1] && !onlySuccessMessage && records.length === 1) {
				records[0].channel.send(records[0].mention + ", sajnos nem nyertél \:confused:");
			}
		});
}