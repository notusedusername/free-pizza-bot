const Discord = require("discord.js")
const util = require("../util/util")

module.exports = {
	sendWinnerMessage: function (winnerSub) {
		winnerSub.channel.send("\n\n\n \:tada:\:tada\:\:tada: \n" + winnerSub.mention + "! \nFree pizza at Corleone with name " + util.getPrettyName(winnerSub.name) + "! \n\n"
		+ "Call 52/890-988 to get it free! \nYou only have time for the call until 20:00!\n \nMore about the game: \nhttps://corleoneristorante.hu/pizza-ingyen/"
		+ "\n\nFuck yeah! Pizza time \:pizza:\:pizza:\:pizza:");
	}
}