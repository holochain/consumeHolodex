var getPostFor = {};
var postDisplay = {};
var htmlTagIndexCount = 0;
var htmlTagSearchCount = 0;
var htmlTitle = "";
var htmlMsg = "";
var indexedDisplay="#iPosts";
var searchedDisplay = "#sPosts";
var responseReceived = false;
$(document).ready(function(){
  $("#postButton").on("click",function(){
    console.log($("#content").val());
    post = {
      message: $("#content").val(),
      title: $("#title").val()
    };
    console.log(post);
    postS = JSON.stringify(post);

    send("indexPost",postS,function(response){
      getPostFor = JSON.parse(JSON.parse(response));
      getPostForDisplay();
      setTimeout(function(){displayPost(postDisplay,indexedDisplay,"index")}, 1500);
    });
  });

  $("#searchButton").on("click",function(){
    var searched = {
      value: $("#search").val()
    };
    searched = JSON.stringify(searched);
    send("searchPosts",searched,function(response){
        response = JSON.parse(JSON.parse(response));
        console.log(typeof response);
        for(var i=0;i<response.length;i++){
            displayPost(response[i],searchedDisplay,"search");
        }

      });
    });

});

function getPostForDisplay(){
    send("getPost",getPostFor,function(response){
      postDisplay=response;
      //console.log("PostDisplay value : "+postDisplay);
    });

}

function displayPost(postObj,id,countFor){
  console.log("display Post called on : ");
  console.log(postObj);
  if(id=="#iPosts"){
    var p = JSON.parse(JSON.parse(postObj));
  }
  else{
    var p = JSON.parse(postObj);
  }
  htmlTitle = p.title;
  htmlMsg = p.message;
  var htmlDisplay = constructPostHTML(id,countFor);
  $(id).html(htmlDisplay);

}

function constructPostHTML(id,countFor){
  var containerDiv = $(id).html();
  var count = incrementCount(countFor);
  var headingID = "heading"+count;
  var collapseID = "collapse"+count;
  var constructHtml = containerDiv+"<div class=\"card\"><div class=\"card-header\" id=\""+headingID+"\"><h5 class=\"mb-0\"><button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#"+collapseID+"\" aria-expanded=\"true\" aria-controls=\""+collapseID+"\">"+htmlTitle+"</button></h5></div><div id=\""+collapseID+"\" class=\"collapse show\" aria-labelledby=\""+headingID+"\" data-parent=\""+id+"\"><div class=\"card-body\">"+htmlMsg+"</div></div></div>"
  return constructHtml;
}

function incrementCount(countFor){
  if(countFor == "index"){
      htmlTagIndexCount = htmlTagIndexCount+1;
  }
  if(countFor == "search"){
    htmlTagSearchCount = htmlTagSearchCount+1;
  }

}
