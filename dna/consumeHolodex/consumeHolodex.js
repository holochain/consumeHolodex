function genesis(){
	debug("From side genesis!")
	return true;
}

function bridgeGenesis(side,dna,appData){
	debug("Wroking bridgeGenesis on From side :"+ side+" dna: "+dna+" appData: "+appData);
		var lnk = call("holodex","bridgeHolodex","true");

	return true;
}

function indexPost(object){

	postObj = {
		obj : object,
		hashPost : commit("post",object)
	} ;
	debug("postObj");
	debug(postObj);
	var createIndex = call("holodex","indexObject",postObj);
	var postHash = JSON.parse(JSON.parse(createIndex));
	return createIndex;
}
function getPost(hashOfPost){
	var postData = get(hashOfPost);
	return postData;
}
function searchPosts(searchString){
	searchString = searchString.value;
	debug("Searching for words : "+searchString);
	var returedPostHashes = call("holodex","searchContent",searchString);
	returedPostHashes = returedPostHashes.split(",");

	var postsSearched=[];
	for(var i=0; i<returedPostHashes.length; i++){
		debug(returedPostHashes[i]);
		var temp = get(returedPostHashes[i]);
		postsSearched.push(temp);
	}
	debug("Returning object : ");
	debug(postsSearched);
	return JSON.stringify(postsSearched);
}

function isErr(result) {
    return ((typeof result === 'object') && result.name == "HolochainError");
}
function validatePut(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}
function validateCommit(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}
// Local validate an entry before committing ???
function validate(entry_type,entry,header,sources) {
//debug("entry_type::"+entry_type+"entry"+entry+"header"+header+"sources"+sources);
    if (entry_type == "anchor_links"||entry_type == "anchor") {
      return true;
    }
    return true
}

function validateLink(linkingEntryType,baseHash,linkHash,tag,pkg,sources){
    // this can only be "room_message_link" type which is linking from room to message
//debug("LinkingEntry_type:"+linkingEntryType+" baseHash:"+baseHash+" linkHash:"+linkHash+" tag:"+tag+" pkg:"+pkg+" sources:"+sources);
if(linkingEntryType=="anchor_links")
return true;


return true;
}
function validateMod(entry_type,hash,newHash,pkg,sources) {return false;}
function validateDel(entry_type,hash,pkg,sources) {return false;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
