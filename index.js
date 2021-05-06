const Discord = require("discord.js")
const keepAlive = require("./server")
const schedule = require("node-schedule");

const addNameToChannel = require("./commands/addName");
const checkName = require("./commands/check");
const deleteSub = require("./commands/delete");
const listSubs = require("./commands/list");
const periodocalCheckJob = require("./schedule/job");
const util = require("./util/util");

const client = new Discord.Client()

let botCommand = "fp ";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
	schedule.scheduleJob(process.env.SCHEDULE, periodocalCheckJob);
	console.log("Periodical check was scheduled: " + process.env.SCHEDULE);
});

client.on("message", msg => {
	if(isMyCommand(msg)) {
		console.log("Incoming command...");
		handleCommand(getCommandAndParameters(msg), msg);
	} else if (msg.content === "ping") {
		msg.channel.send("Say my name bitch!");
	}
});

function isMyCommand(message) {
	return message.content.trim().startsWith(botCommand);
}

function getCommandAndParameters(msg) {
	return msg.content.trim().slice(botCommand.length, msg.length).toLowerCase().split(" ");
}

function handleCommand(splitParams, msg) {
	const command = splitParams[0];
	console.log(splitParams);
	if (command === "ping") {
		msg.reply("pong");
	} else if(command === "pong") {
		msg.reply("ping");
	} else if(command === "add") {
		console.log("Adding new name subscription on demand of " + msg.author.id);
		addNameToChannel(getName(splitParams), msg);
	} else if(command === "check") {
		console.log("Checking a specific name on demand of " + msg.author.id);
		checkName(getName(splitParams), msg.channel, util.createMentionFromUserId( msg.author.id));
	} else if(command === "list") {
		listSubs(msg);
	} else if(command === "remove") {
		console.log("Removing a subscription on demand of " + msg.author.id);
		deleteSub(getName(splitParams), msg.channel);
	} else if(command === "check-all") {
		console.log("Checking all subs on channel on demand of " + msg.author.id);
		periodocalCheckJob();
	}
}

function getName(splitParams) {
	splitParams.shift();
	return splitParams.join(" ");
}

client.login(process.env.TOKEN);
console.log(process.env.REPLIT_DB_URL);
keepAlive();