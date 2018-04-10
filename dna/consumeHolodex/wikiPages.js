function genesis(){
  return true;
}

function bridgeGenesis(side,dna,appData){
	debug("Working bridgeGenesis on From side :"+ side+" dna: "+dna+" appData: "+appData);
		var lnk = call("holodex","bridgeHolodex","true");

	return true;
}

function indexPages(object){

	pageObj = {
		obj : object,
		hashPost : commit("pageObject",object),
    typeObj : "wikiPages";
	} ;
	debug("pageObj");
	debug(postObj);
	var createIndex = call("holodex","indexObject",postObj,"wikiPages");
	var postHash = JSON.parse(JSON.parse(createIndex));
	return createIndex;
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
