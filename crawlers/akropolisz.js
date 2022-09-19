const cheerio = require("cheerio")
const fetch = require("node-fetch")
const messages = require("../messages/akropolisz")
const util = require("../util/util");

module.exports = {
	fetch: function (records) {
		return fetch("https://akropolisz-gyros.hu/nyertesek/")
			.then( (res) => 
				res.text()
			).then( (text) => {
				return new Promise((resolve, reject) => resolve(this.searchForName(cheerio.load(text), records)))
			}).catch( (error) => util.error("Error while fetching Akropolisz", error));
	},
	searchForName: function ($, records) {
		let winners = $("div#get_gp_dailyprize_winners > div.winner_row");
		let winnerFound = false;
		winners.each((index, elem) => {
			let name = $(elem).find("span.winner_name").text().trim();
			let date = $(elem).find("span.winner_date").text().trim();
			if(util.isAtToday(date, 'YYYY-MM-DD hh:mm:ss')) {
				let winnerSub = util.getSubDataDef(records, name, "Akropolisz", null);
				if(winnerSub != null) {
					messages.sendWinnerMessage(winnerSub);
					util.log(name + " won at Akropolisz!");
					winnerFound = true;
				}
			} else {
				return false;
			}
		})
		return winnerFound;
	}
}