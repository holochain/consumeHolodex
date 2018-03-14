function send(fn,data,resultFn) {
    console.log("calling: " + fn+" with "+data);
    $.post(
        "/fn/consumeHolodex/"+fn,
        data,
        function(response) {
            console.log("response: " + response);
            resultFn(response);
        }
    ).error(function(response) {
        console.log("response failed: " + response.responseText);
    })
    ;
};
