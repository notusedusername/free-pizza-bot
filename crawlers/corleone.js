const cheerio = require("cheerio")
const fetch = require("node-fetch")
const messages = require("../messages/corleone")

module.exports = {
	fetch: function (name, channel, mention) {
		return fetch("https://corleoneristorante.hu/nyertesek/")
			.then( (res) => 
				res.text()
			).then( (text) => {
				return new Promise((resolve, reject) => resolve(this.searchForName(cheerio.load(text), name, channel, mention)))
			}).catch( (error) => console.error("Error while fetching Corleone", error));
	},
	searchForName: function ($, name, channel, mention) {
		let winner = $("div#get_gp_dailyprize_winners > div.winner_row > span.winner_name").first().text();
		if(winner.trim().toLowerCase() === name.toLowerCase()) {
			messages.sendWinnerMessage(channel, mention);
			console.log(new Date().toISOString() + ": " + name + " won at Corleone!");
			return true;
		} else {
			console.log(new Date().toISOString() + ": " + name + " was checked, but did not win at Corleone.");
			return false;
		}
	}
}