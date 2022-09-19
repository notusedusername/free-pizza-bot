const corleone = require("../crawlers/corleone");
const donpedro = require("../crawlers/donpedro");
const akropolisz = require("../crawlers/akropolisz");


module.exports = function (records, onlySuccessMessage) {
	Promise.all([corleone.fetch(records), donpedro.fetch(records), akropolisz.fetch(records)])
		.then((values) => {
			if(!values[0] && !values[1] && !values[2] && !onlySuccessMessage && records.length === 1) {
				records[0].channel.send(records[0].mention + ", no free pizza at this time \:confused:");
			}
		});
}