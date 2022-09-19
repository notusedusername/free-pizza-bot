const Discord = require("discord.js")
const util = require("../util/util")

module.exports = {
	sendWinnerMessage: function (winnerSub) {
		winnerSub.channel.send("\n\n\n \:tada:\:tada\:\:tada: \n" + winnerSub.mention + "! \nFree GYROS at Akropolisz Gyros & Pizza with name " + util.getPrettyName(winnerSub.name) + "! \n\n"
		+ "Call 52/789-733 to get it free! \nYou only have time until 21:00! \nMore about the game: \nhttps://akropolisz-gyros.hu/ingyen-gyros-minden-nap/"
		+ "\n\nFuck yeah! Gyros time \:stuffed_flatbread:\:stuffed_flatbread:\:stuffed_flatbread:");
	}
}