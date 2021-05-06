const Discord = require("discord.js")
const util = require("../util/util")

module.exports = {
	sendWinnerMessage: function (winnerSub) {
		winnerSub.channel.send("\n\n\n \:tada:\:tada\:\:tada: \n" + winnerSub.mention + "! \nFree pizza at Corleone with name " + util.getPrettyName(winnerSub.name) + "! \n\n"
		+ "Call 52/890-988 to get it free! \nMore about the game: \nhttps://corleoneristorante.hu/pizza-ingyen/"
		+ "\n\n Fuck yeah! Pizza time \:pizza:\:pizza:\:pizza:");
	}
}