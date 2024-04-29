function renderTeamBoxOptions()
{

        getAllTeams(function(data)
        {
            let optionsHtml = ``;

            Object.keys(data).forEach(key => {

                if(key != "status")
                {
                    optionsHtml += ` <div class="teamBox">
                                        <img src="./images/${key}_logo.png" class="teamLogoImg"></img>
                                        <p>${key}</p>
                                        <button class="watchTeamButton" onclick="renderTeamPage('${key}')">Watch</button>
                                    </div>`;
                }
            });

            document.getElementById("teamOptionsContainer").innerHTML = optionsHtml;

        });

}

function populateTitle(teamName)
{
    let titleHtml = `
                        <div class="sectionTitle">
                            <p class="title">${teamName} - Game</p>
                        </div>
    `;

    return titleHtml;
}

function populateVideo(teamVideo)
{   

    let videoHtml = ``;

    if(teamVideo)
    {
        videoHtml  = `
        <div class="videoContainer">
            <iframe class="videoSectionContainer" width="560" height="315" src="${teamVideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>`;
    }else
    {
        videoHtml  = `
        <div class="videoContainer">
            <img src="./images/notPlaying.png" />
        </div>
        <br>
        <br>`;
    }


    return videoHtml;
}

function populateStatsSection(liveScore, stats)
{
    let statsHtml = `
    <div class="statsContainer">
        <div class="statsContainerTextBox">
            <p class="statsTextTitle">Live Score</p>
            <p class="statsText">${liveScore}</p>
        </div>
    
        <div class="statsContainerTextBox">
            <p class="statsTextTitle">Wins/Losses</p>
            <p class="statsText">${stats["win_loss_ratio"]}</p>
        </div>

        <div class="statsContainerTextBox">
            <p class="statsTextTitle">Points per Game</p>
            <p class="statsText">${stats["points_per_game"]}</p>
        </div>
    </div>
    `;

    return statsHtml;
}

function populateGameSection(teamGames)
{
    let gameSection = `
    
    <div class="sectionTitle">
        <p class="title">Past/Future Games</p>
    </div>


    <div class="gamesContainer">
    `;

    for(let index = 0 ; index < teamGames.length; index += 1)
    {
        gameScore = teamGames[index]["GameScore"]

        if(teamGames[index]["GameScore"] == -1)
        {
            gameScore = "N/A"
        }

        gameSection += `
        
        <div class="gamesSectionContainer">
            <div class="gamesContainerTextBox">
                <p class="statsTextTitle">Teams</p>
                <p class="statsText">${teamGames[index]["Teams"]}</p>
            </div>  

            <div class="gamesContainerTextBox">
                <p class="statsTextTitle">Score</p>
                <p class="statsText">${gameScore}</p>
            </div>  

            <div class="gamesContainerTextBox">
                <p class="statsTextTitle">Date</p>
                <p class="statsText">${teamGames[index]["GameDate"]}</p>
            </div>  
        </div>
        `;
    }

    gameSection += `</div>`;



    return gameSection;
}

function renderTeamPage(teamName)
{

    getTeamData(teamName, function(data)
    {
        let teamPageHtml = ``;

        teamPageHtml += populateTitle(teamName);
        teamPageHtml +=  populateVideo(data["TeamVideo"]);
        teamPageHtml += populateStatsSection(data["LiveScore"], data["Statistics"])
        teamPageHtml += populateGameSection(data["Games"])

        console.log(teamPageHtml);
        document.getElementById("mainContainer").innerHTML = teamPageHtml;

    });


}