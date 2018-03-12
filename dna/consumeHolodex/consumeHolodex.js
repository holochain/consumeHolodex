function genesis(){
	debug("From side genesis!")
	return true;
}

function bridgeGenesis(side,dna,appData){
	debug("Wroking bridgeGenesis on From side :"+ side+" dna: "+dna+" appData: "+appData);
		var lnk = call("holodex","bridgeHolodex","true");
		debug(lnk);
	return true;
}

function indexPost(object){
	var createIndex = call("holodex","indexObject",object);
	return createIndex;
}
function searchPosts(searchString){
	var returedPostHashes = call("holodex","searchContent",searchString);
	return returedPostHashes;
}
