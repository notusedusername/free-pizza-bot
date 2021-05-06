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
			}).catch( (error) => console.error("Error while fetching 100% pizza", error));
	},
	searchForName: function ($, records) {
		let foundWinner = false;
		$("div#roundedbox-right table tr td").each((index, elem) => {
			let winnerSub = util.getSubDataDef(records, $(elem).text().trim(), "100%", null);
			if(winnerSub !== null) {
				messages.sendWinnerMessage(winnerSub);
				console.log(new Date().toISOString() + ": " + winnerSub.name + " won at 100%!");
				foundWinner = true;
			}
		});
		if(foundWinner) {
			return true;
		} else {
			return false;
		}
	}
}