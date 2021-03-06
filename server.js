const express = require("express")
const util = require("./util/util");

const server = express()

server.all("/", (req, res) => {
  util.log("Monitoring ping recieved.");
	res.send("Bot is running!")
})

function keepAlive() {
  server.listen(3000, () => {
    util.log("Server is ready.")
  })
}

module.exports = keepAlive