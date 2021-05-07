
function getPrettyName(name) {
	let nameArray = name.split(" ");
	for(let i = 0; i < nameArray.length; i++) {
		nameArray[i] = nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1);
	}
	return nameArray.join(" ");
}

function createMentionFromUserID(id) {
	return "<@" + id + ">"
}

function getSubDataDef(records, name, restaurant, def) {
	for(record of records) {
		console.log(new Date().toISOString() + ": " + "Checking " + record.name + " at " + restaurant+ "...");
		if(record.name.toLowerCase() === name.toLowerCase()) {
			returnValue = record;
			return record;
		}
	}
	return def;
}

function error(message, error){
	console.error(getFormattedMessage(message), error);
}

function log(message) {
	console.log(getFormattedMessage(message));
}

function getFormattedMessage(message) {
	return "[" + getDate() + "] - <" + message + ">";
}

function getDate(){
	return new Date().toISOString().replace("T", " ").replace("Z", "");
}

module.exports = {
	getPrettyName: getPrettyName,
	createMentionFromUserID: createMentionFromUserID,
	getSubDataDef: getSubDataDef,
	log: log,
	error: error
}