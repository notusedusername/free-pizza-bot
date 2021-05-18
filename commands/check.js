const szazszazalek = require("../crawlers/szazszazalek");
const corleone = require("../crawlers/corleone");
const donpedro = require("../crawlers/donpedro");


module.exports = function (records, onlySuccessMessage) {
	Promise.all([szazszazalek.fetch(records), corleone.fetch(records), donpedro.fetch(records)])
		.then((values) => {
			if(!values[0] && !values[1] && !values[2] && !onlySuccessMessage && records.length === 1) {
				records[0].channel.send(records[0].mention + ", sajnos nem nyertél \:confused:");
			}
		});
}