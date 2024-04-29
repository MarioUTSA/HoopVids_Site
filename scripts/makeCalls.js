function getAllTeams( callBack = null )
{

    let params = "";

    endpointCall("getTeams", params, function(data)
    {
        if(data["status"] == "success")
        {
            return callBack(data)
        }
        else if(data["status"] == "failed")
        {
            return callBack(data)
        }
    });
}

function getTeamData( teamName, callBack = null )
{
    let params = `?teamName=${teamName}`

    endpointCall("getTeamData", params, function(data)
    {
        if(data["status"] == "success")
        {
            return callBack(data)
        }
        else if(data["status"] == "failed")
        {
            return callBack(data)
        }
    });
}