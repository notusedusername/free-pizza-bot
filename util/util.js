
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

module.exports = {
	getPrettyName: getPrettyName,
	createMentionFromUserID: createMentionFromUserID
}