const cheerio = require("cheerio")
const fetch = require("node-fetch")
const messages = require("../messages/corleone")
const util = require("../util/util");

module.exports = {
	fetch: function (records) {
		return fetch("https://corleoneristorante.hu/nyertesek/")
			.then( (res) => 
				res.text()
			).then( (text) => {
				return new Promise((resolve, reject) => resolve(this.searchForName(cheerio.load(text), records)))
			}).catch( (error) => util.error("Error while fetching Corleone", error));
	},
	searchForName: function ($, records) {
		let winner = $("div#get_gp_dailyprize_winners > div.winner_row > span.winner_name").first().text();
		let winnerSub = util.getSubDataDef(records, winner.trim(), "Corleone", null);
		if(winnerSub != null) {
			messages.sendWinnerMessage(winnerSub);
			util.log(winner + " won at Corleone!");
			return true;
		} else {
			return false;
		}
	}
}