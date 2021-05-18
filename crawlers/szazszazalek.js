const cheerio = require("cheerio")
const fetch = require("node-fetch")
const messages = require("../messages/szazszazalek")
const util = require("../util/util");

module.exports = {
	fetch: function (records) {
		return fetch("https://www.100szazalekpizza.hu/menu/nyeremenyjatek")
			.then( (res) => 
				res.text()
			).then( (text) => {
				return new Promise((resolve, reject) => resolve(this.searchForName(cheerio.load(text), records)))
			}).catch( (error) => util.error("Error while fetching 100% pizza", error));
	},
	searchForName: function ($, records) {
		let winnerFound = false;
		$("div#roundedbox-right table tr td").each((index, elem) => {
			let winnerSub = util.getSubDataDef(records, $(elem).text().trim(), "100%", null);
			if(winnerSub !== null) {
				messages.sendWinnerMessage(winnerSub);
				util.log(winnerSub.name + " won at 100%!");
				winnerFound = true;
			}
		});
		return winnerFound;
	}
}