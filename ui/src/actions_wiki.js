var getPageFor = {};
var pageDisplay = {};
var htmlTagIndexCountWiki = 0;
var htmlTagSearchCountWiki = 0;
var htmlTitleWiki = "";
var htmlWebLink = "";
var indexedDisplayWiki="#iPages";
var searchedDisplayWiki = "#sPages";
var searchFirstDisplayWiki = true;

//adding events on buttons upon completion of page load
$(document).ready(function(){

  //Post button event
  $("#saveButton").on("click",function(){
    console.log($("#wikiSave").val());
    var inputString = $("#wikiSave").val();
    console.log("Searching Wiki for " + inputString);
    var pages = queryWikiPages(inputString);

    console.log(pages);
    for(var i=0;i<pages.length;i++){
      var savingPage = {
        title : pages[i].title,
        webLink : pages[i].link
      };
      displayPageWiki(savingPage,indexedDisplayWiki,"indexWiki");
    }

    for(let i=0; i<pages.length;i++){
      let pageS = JSON.stringify(pages[i]);
      send("indexPages",pageS,function(response){
        console.log(response);
        //getPageFor = JSON.parse(JSON.parse(response));
        //console.log("getPageFor : ");
        //console.log(getPageFor);
        //getPageForDisplay();
        //setTimeout(function(){displayPageWiki(pageDisplay,indexedDisplayWiki,"indexWiki")}, 1500);
      });
    }

  });

  //Search button event
  $("#searchWikiButton").on("click",function(){
    var searched = {
      value: $("#searchWikiFavourites").val()
    };
    searched = JSON.stringify(searched);
    send("searchPosts",searched,function(response){

        response = JSON.parse(JSON.parse(response));
        console.log(typeof response);
        for(var i=0;i<response.length;i++){
            if(i==0){
              searchFirstDisplayWiki = true;
            }
            else{
              searchFirstDisplayWiki = false;
            }
            displayPageWiki(response[i],searchedDisplayWiki,"searchWiki");
        }

      });
    });

});

function queryWikiPages(inputString){
  var httpReq = new XMLHttpRequest();
  var api = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+inputString;
  httpReq.open("GET",api,false);
  httpReq.send();
  var relatedObjs = getObjectArray(httpReq.responseText);
  return relatedObjs;
}

function getObjectArray(responseToParse){
  var relatedPages = [];
  var parsedJSON = JSON.parse(responseToParse);
  var totalNumberOfPages = parsedJSON[1].length;
  var apiContent = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles="
  for(var i=0; i < totalNumberOfPages;i++){
    var pageTitle = parsedJSON[1][i];
    var pageLink = parsedJSON[3][i];
    var pageHtml = getHtmlContent(apiContent,pageTitle);
    var pageObj = {
      title : pageTitle,
      link : pageLink,
      htmlContent : pageHtml
    };
    relatedPages.push(pageObj);
  }
  return relatedPages;
}

function getHtmlContent(urlText,titleText){
  var httpReq = new XMLHttpRequest();
  var title = titleText.replace(/\s+/g, '_' );
  console.log("Getting html for : "+urlText+title);
  httpReq.open("GET",urlText+title,false);
  httpReq.send();
  var returned = JSON.parse(httpReq.responseText);
  var page = returned.query.pages;
  var pageID = Object.keys(page)[0];
  var content = page[pageID].revisions[0]['*'];

  var wordContent = content.replace(/[^a-zA-Z0-9 ]/g, " ");

  var stringContent = wordContent.replace(/ +(?= )/g,'');

  return stringContent;
}

//Helper function to retrieve a post for display when you only have the post hash
function getPageForDisplay(){
    send("getPage",getPageFor,function(response){
      pageDisplay=response;
      console.log("pageDisplay : ");
      console.log(pageDisplay);
    });

}

//Function to display a post
function displayPageWiki(pageObj,id,countFor){
  console.log("display Page called on : ");
  console.log(pageObj);
  if(id=="#sPages"){
    var p = pageObj;
  }
  else{
    var p = pageObj;
  }
  htmlTitleWiki = p.title;
  htmlWebLink = p.webLink;
  var htmlDisplay = constructPostHTMLWiki(id,countFor);

  /*if(id=="#iPages"){
    $(id).html(htmlDisplay);
    $('.card').last().hide();
    $('.card').last().show("300",function(){
      //console.log("sliding down : ");
      //console.log($(this));
    });
  }
  else{*/
    $(id).html(htmlDisplay).hide();
    $(id).show('300',function(){

    });
  //}
}

//function for constructing HTMl for display
function constructPostHTMLWiki(id,countFor){
  var containerDiv = $(id).html();
  var count = incrementCountWiki(countFor);
  var headingID = "heading"+count;
  var collapseID = "collapse"+count;
  if(id=="#iPages"){
    var constructHtml = containerDiv+"<div class=\"card\"><div class=\"card-header\" id=\""+headingID+"\"><h5 class=\"mb-0\"><button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#"+collapseID+"\" aria-expanded=\"true\" aria-controls=\""+collapseID+"\">"+htmlTitleWiki+"</button></h5></div><div id=\""+collapseID+"\" class=\"collapse show\" aria-labelledby=\""+headingID+"\" data-parent=\""+id+"\"><div class=\"card-body\">"+htmlWebLink+"</div></div></div>"
  }
  else{
    if(searchFirstDisplayWiki == true){
        var constructHtml = "<div class=\"card\"><div class=\"card-header\" id=\""+headingID+"\"><h5 class=\"mb-0\"><button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#"+collapseID+"\" aria-expanded=\"true\" aria-controls=\""+collapseID+"\">"+htmlTitleWiki+"</button></h5></div><div id=\""+collapseID+"\" class=\"collapse show\" aria-labelledby=\""+headingID+"\" data-parent=\""+id+"\"><div class=\"card-body\">"+htmlWebLink+"</div></div></div>"
        console.log(constructHtml);
    }
    else{
      var constructHtml = containerDiv+"<div class=\"card\"><div class=\"card-header\" id=\""+headingID+"\"><h5 class=\"mb-0\"><button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#"+collapseID+"\" aria-expanded=\"true\" aria-controls=\""+collapseID+"\">"+htmlTitleWiki+"</button></h5></div><div id=\""+collapseID+"\" class=\"collapse show\" aria-labelledby=\""+headingID+"\" data-parent=\""+id+"\"><div class=\"card-body\">"+htmlWebLink+"</div></div></div>"
      console.log(constructHtml);
    }

  }

  return constructHtml;
}

//helper function used for creating HTML posts
function incrementCountWiki(countFor){
  if(countFor == "indexWiki"){
      htmlTagIndexCountWiki = htmlTagIndexCountWiki+1;
  }
  if(countFor == "searchWiki"){
    htmlTagSearchCountWiki = htmlTagSearchCountWiki+1;
  }
}
