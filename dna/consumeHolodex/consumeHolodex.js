function genesis(){
	debug("From side genesis!")
	return true;
}

//BridgeGenesis function for when indexing
function bridgeGenesis(side,dna,appData){
	debug("Working bridgeGenesis on From side :"+ side+" dna: "+dna+" appData: "+appData);
		var lnk = call("holodex","bridgeHolodex","true");

	return true;
}

//Function used for indexing. Called the indexObject function from holodex zome
function indexPost(object){

	postObj = {
		obj : object,
		hashPost : commit("post",object)
	} ;
	debug("post");
	debug(postObj);
	var createIndex = call("holodex","indexObject",postObj);
	var postHash = JSON.parse(JSON.parse(createIndex));
	return createIndex;
}

function getPost(hashOfPost){
	var postData = get(hashOfPost);
	return postData;
}

//Function used for searching. Called the searchContent function from holodex zome
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

//Indexing wiki Pages

function indexPages(object){
	debug("Index pages called");
	pageObjToCommit = {
		title : object.title,
		webLink : object.link
	};
	pageObj = {
		obj : object,
		hashPage : commit("pageObject",pageObjToCommit)
	} ;
	debug("pageObj");
	debug(pageObj);
	var createIndex = call("holodex","indexPages",pageObj);
	var pageHash = JSON.parse(JSON.parse(createIndex));
	return createIndex;
}

function getPage(hashOfPage){
	var pageData = get(hashOfPage);
	return pageData;
}

//Below are some helper and valitate functions
function isErr(result) {
    return ((typeof result === 'object') && result.name == "HolochainError");
}
function validatePut(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}
function validateCommit(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}

function validate(entry_type,entry,header,sources) {
    if (entry_type == "anchor_links"||entry_type == "anchor") {
      return true;
    }
    return true
}

function validateLink(linkingEntryType,baseHash,linkHash,tag,pkg,sources){

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
