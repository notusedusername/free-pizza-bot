const Discord = require("discord.js")
const util = require("../util/util")

module.exports = {
	sendWinnerMessage: function (winnerSub) {
		winnerSub.channel.send("\n\n\n \:tada:\:tada\:\:tada: \n" + winnerSub.mention + "! \nFree pizza at Don Pedro with name " + util.getPrettyName(winnerSub.name) + "! \n\n"
		+ "Call 52/ 455-355 to get it free! \nYou only have time until 21:00! \nMore about the game: \nhttps://donpedropizza.hu/pizza-ingyen/"
		+ "\n\nFuck yeah! Pizza time \:pizza:\:pizza:\:pizza:");
	}
}