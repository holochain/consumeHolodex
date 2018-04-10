function genesis()
{
  debug("genesis called --- consumeHolodex");
  return true;
}

//function bridgeGenesis(HC.Bridge.To,"QmPYYGapCNLb9BAmV1WDRVmkhXGTzx9WZxaxqAjrdu8Ds5",VolunteerForIndex)                     //Volunteering Ratio to be added
function bridgeHolodex(VolunteerForIndex)
{
  //debug("bridgeGenesis called holodex --- consumeHolodex side ");
  if(VolunteerForIndex == "true")
  {
    //var lnk = bridge(bridgeHash,"indexcontent","addToVolunteerNodes",App.Key.Hash);
    var vol = commit("IndexVolunteerNode",App.Key.Hash);
    commit("IndexVolunteer_links",{Links:[{Base:App.DNA.Hash,Link:vol,Tag:"IndexVolunteer_Node"}]})

    var lnk = get(vol);
    debug("Volunteer node added : "+ lnk);

  }
  else{
    var lnk = "Not volunteering";
  }
  return lnk;
}
function selectIndexNode()
{
  var thisNodeIsVolunteering = false;
  var indexNodes=[];
  debug("App DNA Hash : "+App.DNA.Hash);
  var VolunteerNodeH = getLinks(App.DNA.Hash,"IndexVolunteer_Node",{Load:true});
  debug("All Volunteer Nodes :");
  debug(VolunteerNodeH);

  for(var i=0; i<VolunteerNodeH.length;i++){
    if(VolunteerNodeH[i].Entry == App.Key.Hash){
      thisNodeIsVolunteering = true
    }
  }
  if(thisNodeIsVolunteering == true)
  {
    var key = App.Key.Hash;
  }
  else
  {
    for(var i=0;i<VolunteerNodeH.length;i++){
      indexNodes.push(VolunteerNodeH[i].Entry)
    }

    var numberOfIndexNodes = indexNodes.length;
    debug("Number of index nodes : "+numberOfIndexNodes);
                                                                    //Randomly select a node for indexing
    var selectedNumber = Math.floor(Math.random()*numberOfIndexNodes);

    var key = indexNodes[selectedNumber];
    debug("Key selected :"+key)
    //debug(JSON.parse(key));
  }
  return key;
}

function indexObject(object)
{
  debug("indexObject function called..");
  var indexNode = selectIndexNode();
  debug("Selected index node : "+indexNode);

  var bridges = getBridges()
  if (bridges.length === 0){
    debug('No bridges found')
    return null
  }
  var bridgeHash = bridges[0].ToApp
  debug("bridge hash : "+bridgeHash);

  //var createIndex = send(indexNode,{type:"createIndex",content:object.content,hashOfObject:objHash,language:"English"})
  var createIndex = bridge(bridgeHash,"indexcontent","IndexContent",{content:object.obj.message,hashOfObject:object.hashPost,language:"English"})
  return createIndex;
}

//Index function for wiki posts
function indexPages(object)
{
  debug("indexObject function called..");
  var indexNode = selectIndexNode();
  debug("Selected index node : "+indexNode);

  var bridges = getBridges()
  if (bridges.length === 0){
    debug('No bridges found')
    return null
  }
  var bridgeHash = bridges[0].ToApp
  debug("bridge hash : "+bridgeHash);

  //var createIndex = send(indexNode,{type:"createIndex",content:object.content,hashOfObject:objHash,language:"English"})
  var createIndex = bridge(bridgeHash,"indexcontent","IndexContent",{content:object.obj.htmlContent,hashOfObject:object.hashPost,language:"English"})
  return createIndex;
}


function searchContent(StringOfsearchKeywords)
{
  var indexNode = selectIndexNode();
  debug("Selected index node : "+indexNode);

  var bridges = getBridges()
  if (bridges.length === 0){
    debug('No bridge found')
    return null
  }
  var bridgeHash = bridges[0].ToApp
  debug("bridge hash : "+bridgeHash);

  //var searchResults = send(indexNode,{type:"searchKeywords",searchString:StringOfsearchKeywords});
  var searchResults = bridge(bridgeHash,"indexcontent","searchKeywords",StringOfsearchKeywords);
  return searchResults;
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
