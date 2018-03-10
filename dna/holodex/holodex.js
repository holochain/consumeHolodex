function genesis()
{
  debug("genesis called --- consumeHolodex");
  return true;
}

function bridgeGenesis(HC.Bridge.From,"QmTKXahA2Pb27z6efciJqH5g57rqH5Le3wD3XWhnJiEC9j",VolunteerForIndex)                     //Volunteering Ratio to be added
{
  debug("bridgeGenesis called holodex --- consumeHolodex");
  if(VolunteerForIndex == "true")
  {
    var VolunteerNode = commit("VolunteerNode",VolunteerForIndex);
    commit("volunteer_link",{Links:[{Base:App.Key.Hash,Link:VolunteerNode,Tag:"VolunteerNode"}]});
    debug("VolunteerNode :"+ VolunteerNode);
    var addSelfAsAnchor = {Anchor_Type:"IndexNodes",Anchor_Text:App.Key.Hash};

                                                                    //Checking if the Index Node anchor tyoe is created
    var anchorMainIndex = {Anchor_Type:"IndexNodes",Anchor_Text:""};
    var amhash = makeHash("anchor",anchorMainIndex);
    var checkexist = get(amhash,{GetMask:HC.GetMask.Sources});

    if(checkexist != JSON.stringify(anchorMainIndex)){           //If there are no index nodes(anhor type), create Index node tyoe
    //if(checkexist == HC.HashNotFound){                         //and add self as IndexNodes

      debug("Creating anchor type IndexNodes");

      var indN = call("anchor","anchor_type_create","IndexNodes");
      debug("Index node type added successfully with hash : "+indN);
      debug("Adding self to index nodes ... "+App.Key.Hash);
       var lnk = call("anchor","anchor_create",addSelfAsAnchor);

    }
    else {                                                      //Else just add self as IndexNodes anchor
      debug("Adding self to index nodes ... "+App.Key.Hash);
        var lnk = call("anchor","anchor_create",addSelfAsAnchor);
    }

    //var ret = JSON.parse(lnk);
    //debug(ret[0]);

  }
  return true;
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
  var createIndex = bridge("QmTKXahA2Pb27z6efciJqH5g57rqH5Le3wD3XWhnJiEC9j","indexcontent","indexcontent",object)
  return createIndex;
}


function searchContent(StringOfsearchKeywords)
{
  var indexNode = selectIndexNode();
  debug("Selected index node : "+indexNode);
  //var searchResults = send(indexNode,{type:"searchKeywords",searchString:StringOfsearchKeywords});
  var searchResults = bridge("QmTKXahA2Pb27z6efciJqH5g57rqH5Le3wD3XWhnJiEC9j","indexcontent","searchKeywords",StringOfsearchKeywords);
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
