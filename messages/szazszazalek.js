const Discord = require("discord.js")
const util = require("../util/util")

module.exports = {
	sendWinnerMessage: function (winnerSub) {
		winnerSub.channel.send("\n\n\n \:tada:\:tada\:\:tada: \n" + winnerSub.mention + "!\n YOU WON A PIZZA AT 100% PIZZA!\n\n The winner name is " + util.getPrettyName(winnerSub.name) + ".\n"
		+ "To get the pizza for free, log in today to their website, and get the coupon code.\n"
		+ "https://www.100szazalekpizza.hu/menu/nyeremenyjatek"
		+ "\n\n Fuck yeah! Pizza time \:pizza:\:pizza:\:pizza:" );
	}
}