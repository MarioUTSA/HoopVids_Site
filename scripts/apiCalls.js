
var ERROR_FLAG = "ERROR";

var getTeamsEndPoint = "http://ec2-3-128-18-187.us-east-2.compute.amazonaws.com/teams";
var getTeamDataEndPoint = "http://ec2-3-128-18-187.us-east-2.compute.amazonaws.com/getTeamData"

function endpointCall(endpoint=null, params="", callBack=null)
{
    let endpointLink = identifyEndPoint(endpoint);
    const Http = new XMLHttpRequest();
    endpointLink = endpointLink + params
    Http.open( "GET", endpointLink );
    Http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    Http.send(endpointLink);
    Http.onreadystatechange = ( e ) => 
    {
        //If the request was successful then populate everything
        if (Http.readyState == 4 && Http.status == 200) 
        {
            //parse the response from power automate to make it readable for the functions
            callBack(JSON.parse( Http.responseText ));
            
        }else
        {
            callBack(ERROR_FLAG);
        }
    }
}

function identifyEndPoint(endpoint=null)
{
    switch(endpoint)
    {
        case "getTeams":
            return getTeamsEndPoint;
        case "getTeamData":
            return getTeamDataEndPoint;
    }
}