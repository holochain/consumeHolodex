genesis(){
	return true;
}

function bridgeGenesis(){
	debug("Wroking bridgeGenesis on To side");
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
