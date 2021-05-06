const Discord = require("discord.js")

const client = new Discord.Client()

module.exports = {
	sendWinnerMessage: function (channel, mention) {
		channel.send(mention + "!\n Ingyen pizza a 100%-nál!");
	}
}