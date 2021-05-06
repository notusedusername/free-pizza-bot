const cheerio = require("cheerio")
const fetch = require("node-fetch")
const messages = require("../messages/szazszazalek")

module.exports = {
	fetch: function (name, channel, mention) {
		return fetch("https://www.100szazalekpizza.hu/menu/nyeremenyjatek")
			.then( (res) => 
				res.text()
			).then( (text) => {
				return new Promise((resolve, reject) => resolve(this.searchForName(cheerio.load(text), name, channel, mention)))
			}).catch( (error) => console.error("Error while fetching 100% pizza", error));
	},
	searchForName: function ($, name, channel, mention) {
		let foundWinner = false;
		$("div#roundedbox-right table tr td").each((index, elem) => {
			if($(elem).text().trim().toLowerCase() === name.toLowerCase()) {
				messages.sendWinnerMessage(channel, mention);
				foundWinner = true;
			}
		});
		if(foundWinner) {
			console.log(new Date().toISOString() + ": " + name + " won at 100%!");
			return true;
		} else {
			console.log(new Date().toISOString() + ": " + name + " was checked, but did not win at 100%.");
			return false;
		}
	}
}