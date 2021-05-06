const szazszazalek = require("../crawlers/szazszazalek");
const corleone = require("../crawlers/corleone");

module.exports = function (name, channel, mention, onlySuccessMessage) {
	Promise.all([szazszazalek.fetch(name, channel, mention), corleone.fetch(name, channel, mention)])
		.then((values) => {
			if(!values[0] && !values[1] && !onlySuccessMessage) {
				channel.send(mention + ", sajnos nem nyertél \:confused:");
			}
		});
}