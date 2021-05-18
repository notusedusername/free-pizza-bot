const Discord = require("discord.js")
const util = require("../util/util")

module.exports = {
	sendWinnerMessage: function (winnerSub) {
		winnerSub.channel.send("\n\n\n \:tada:\:tada\:\:tada: \n" + winnerSub.mention + "!\n YOU WON A (not so free) PIZZA AT 100% PIZZA!\n\nThe winner name is " + util.getPrettyName(winnerSub.name) + ".\n"
		+ "To get a pizza for free, log in today to their website, and get the coupon code and buy one, to get the other one free!\nThe code is valid only until 22:00!\n"
		+ "https://www.100szazalekpizza.hu/menu/nyeremenyjatek"
		+ "\n\nFuck yeah! Pizza time \:pizza:\:pizza:\:pizza:" );
	}
}