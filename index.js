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
let job;

let botCommand = "fp ";

client.on("ready", () => {
  util.log(`Logged in as ${client.user.tag}!`);
	job = schedule.scheduleJob(process.env.SCHEDULE_UTC, periodocalCheckJob);
	util.log("Periodical check was scheduled: " + process.env.SCHEDULE_UTC);
	util.log("Next run: " + job.nextInvocation());
});

client.on("message", msg => {
	if(isMyCommand(msg)) {
		util.log("Incoming command...");
		handleCommand(getCommandAndParameters(msg), msg);
	} else if (msg.content.toLowerCase() === "ping") {
		msg.react("🖕");
		msg.channel.send("Say my name bitch!");
	}
});

function isMyCommand(message) {
	return message.content.trim().toLowerCase().startsWith(botCommand);
}

function getCommandAndParameters(msg) {
	return msg.content.trim().slice(botCommand.length, msg.length).toLowerCase().split(" ");
}

function handleCommand(splitParams, msg) {
	const command = splitParams[0];
	util.log(splitParams);
	if (command === "ping") {
		msg.react("🏓");
		msg.reply("pong");
	} else if(command === "pong") {
		msg.react("🏓");		
		msg.reply("ping");
	} else if(command === "add") {
		msg.react("🤌");
		msg.react("🇮🇹");		
		msg.react("🍕");
		util.log("Adding new name subscription on demand of " + msg.author.id);
		addNameToChannel(getName(splitParams), msg);
	} else if(command === "check") {
		msg.react("📋");		
		util.log("Checking a specific name on demand of " + msg.author.id);
		checkName([{
			name: getName(splitParams),
			channel: msg.channel,
			mention: util.createMentionFromUserID(msg.author.id)
		}]);
	} else if(command === "list") {
		msg.react("📜");
		util.log("Listing subs on demand of " + msg.author.id);
		listSubs(msg);
	} else if(command === "remove") {
		msg.react("♻️");
		util.log("Removing a subscription on demand of " + msg.author.id);
		deleteSub(getName(splitParams), msg.channel);
	} else if(command === "check-all" && msg.author.id === process.env.ADMIN) {
		msg.react("🧑‍💻");
		util.log("Checking all subs on channel on demand of the admin");
		periodocalCheckJob();
	}
}

function getName(splitParams) {
	splitParams.shift();
	return splitParams.join(" ");
}

client.login(process.env.TOKEN);
util.log(process.env.REPLIT_DB_URL);
keepAlive();