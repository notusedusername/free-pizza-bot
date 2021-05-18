const cheerio = require("cheerio")
const fetch = require("node-fetch")
const messages = require("../messages/donpedro")
const util = require("../util/util");

module.exports = {
	fetch: function (records) {
		return fetch("https://donpedropizza.hu/nyertesek/")
			.then( (res) => 
				res.text()
			).then( (text) => {
				return new Promise((resolve, reject) => resolve(this.searchForName(cheerio.load(text), records)))
			}).catch( (error) => util.error("Error while fetching Don Pedro", error));
	},
	searchForName: function ($, records) {
		let winners = $("div#get_gp_dailyprize_winners > div.winner_row");
		let winnerFound = false;
		winners.each((index, elem) => {
			let name = $(elem).find("span.winner_name").text().trim();
			let date = $(elem).find("span.winner_date").text().trim();
			if(util.isAtToday(date, 'YYYY-MM-DD hh:mm:ss')) {
				let winnerSub = util.getSubDataDef(records, name, "Don Pedro", null);
				if(winnerSub != null) {
					messages.sendWinnerMessage(winnerSub);
					util.log(name + " won at Don Pedro!");
					winnerFound = true;
				}
			} else {
				return false;
			}
		})
		return winnerFound;
	}
}