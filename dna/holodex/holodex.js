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
    var bridges = getBridges()
  if (bridges.length === 0){
    debug('Expecting bridged app holodex, run: hcdev --bridgeTo=../holodex test')
    return null
  }
  var bridgeHash = bridges[0].ToApp
  debug("bridge hash : "+bridgeHash);
    var lnk = bridge(bridgeHash,"indexcontent","addToVolunteerNodes",VolunteerForIndex);
    //var ret = JSON.parse(lnk);
    //debug(ret[0]);

  }
  else{
    var lnk = "Not volunteering";
  }
  return lnk;
  /*else
  {
    var VolunteerNode = commit("VolunteerNode",VolunteerForIndex);
    commit("volunteer_link",{Links:[{Base:App.Key.Hash,Link:VolunteerNode,Tag:"VolunteerNode"}]});
    return false;
  }*/
}
function selectIndexNode()
{

  var VolunteerNodeH = getLinks(App.Key.Hash,"VolunteerNode",{Load:true});
  debug("Volunteer node value :"+VolunteerNodeH[0]["Entry"])

  if(VolunteerNodeH[0]["Entry"] == "true")
  {
    var key = App.Key.Hash;
  }
  else
  {
    var indexNodes = call("anchor","anchor_list","IndexNodes");
    var IndexNodesjs = JSON.parse(indexNodes);

    var numberOfIndexNodes = IndexNodesjs.length;
    debug("Number of index nodes : "+numberOfIndexNodes);

    var selectedNumber = Math.floor(Math.random()*numberOfIndexNodes);

    var key = IndexNodesjs[selectedNumber].Anchor_Text;
  }
  return key;
}

function indexObject(object)
{
  var indexNode = selectIndexNode();
  debug("Selected index node : "+indexNode);
  var objHash = makeHash("anchor",object);
  debug("Hash of object : "+objHash);

  //var createIndex = send(indexNode,{type:"createIndex",content:object.content,hashOfObject:objHash,language:"English"})
  var createIndex = bridge("QmPYYGapCNLb9BAmV1WDRVmkhXGTzx9WZxaxqAjrdu8Ds5","indexcontent","indexcontent",object)
  return createIndex;
}


function searchContent(StringOfsearchKeywords)
{
  var indexNode = selectIndexNode();
  debug("Selected index node : "+indexNode);
  //var searchResults = send(indexNode,{type:"searchKeywords",searchString:StringOfsearchKeywords});
  var searchResults = bridge("QmPYYGapCNLb9BAmV1WDRVmkhXGTzx9WZxaxqAjrdu8Ds5","indexcontent","searchKeywords",StringOfsearchKeywords);
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
