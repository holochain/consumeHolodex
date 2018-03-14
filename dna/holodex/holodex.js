function genesis()
{
  debug("genesis called --- consumeHolodex");
  return true;
}

//function bridgeGenesis(HC.Bridge.To,"QmPYYGapCNLb9BAmV1WDRVmkhXGTzx9WZxaxqAjrdu8Ds5",VolunteerForIndex)                     //Volunteering Ratio to be added
function bridgeHolodex(VolunteerForIndex)
{
  debug("bridgeGenesis called holodex --- consumeHolodex side ");
  //VolunteerForIndex = appData;
  if(VolunteerForIndex == "true")
  {
    //var lnk = bridge(bridgeHash,"indexcontent","addToVolunteerNodes",App.Key.Hash);
    var vol = commit("VolunteerNode",App.Key.Hash);
    commit("volunteer_links",{Links:[{Base:App.DNA.Hash,Link:vol,Tag:"Volunteer_Node"}]})

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
  var VolunteerNodeH = getLinks(App.DNA.Hash,"Volunteer_Node",{Load:true});
  debug("Volunteer node value :"+VolunteerNodeH[0]["Entry"])

  if(VolunteerNodeH[0]["Entry"] == App.Key.Hash)
  {
    var key = App.Key.Hash;
  }
  else
  {
    var l = getLinks(App.DNA.Hash,"Volunteer_Node",{Load:true});
    var indexNodes=[];
    for(var i=0;i<l.length;i++){
      indexNodes.push(l[i].Entry)
    }

    var numberOfIndexNodes = IndexNodesjs.length;
    debug("Number of index nodes : "+numberOfIndexNodes);
                                                                    //Randomly select a node for indexing
    var selectedNumber = Math.floor(Math.random()*numberOfIndexNodes);

    var key = IndexNodesjs[selectedNumber].Anchor_Text;
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
    debug('Expecting bridged app holodex, run: hcdev --bridgeTo=../holodex test')
    return null
  }
  var bridgeHash = bridges[0].ToApp
  debug("bridge hash : "+bridgeHash);

  //var createIndex = send(indexNode,{type:"createIndex",content:object.content,hashOfObject:objHash,language:"English"})
  var createIndex = bridge(bridgeHash,"indexcontent","IndexContent",{content:object.obj.message,hashOfObject:object.hashPost,language:"English"})
  return createIndex;
}


function searchContent(StringOfsearchKeywords)
{
  var indexNode = selectIndexNode();
  debug("Selected index node : "+indexNode);

  var bridges = getBridges()
  if (bridges.length === 0){
    debug('Expecting bridged app holodex, run: hcdev --bridgeTo=../holodex test')
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
// Local validate an entry before committing ???
function validate(entry_type,entry,header,sources) {
//debug("entry_type::"+entry_type+"entry"+entry+"header"+header+"sources"+sources);
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
