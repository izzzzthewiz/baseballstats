import { checkStats, getStatsList, getStats, toFeet, toLbs, toDecimal, getAVG, getOBP, getSLG } from "./main.js"

checkStats()

displayPlayers()

function displayPlayers(){
    if (getStatsList().length == 0) {
        document.getElementById('noPlayers').style.display = 'flex'
    } else {
        var htmlList = document.getElementById('list')
        var HTML = []
        getStatsList().map(id => {
            var htmlString = `
                <div class="playerDisplay">
                    <h1>${getStats(id)[0].firstName} ${getStats(id)[0].lastName}</h1>
                    <div class="playerDisplayStats">
                        <p class="main">#${getStats(id)[0].number}</p>
                        <p class="main">${getStats(id)[0].position}</p>
                        <p class="main">${toFeet(getStats(id)[0].height)}</p>
                        <p class="main">${toLbs(getStats(id)[0].weight)}lbs</p>
                    </div>
                    <div class="playerDisplayStats">
                        <p class="title">GP</p>
                        <p class="title">AB</p>
                        <p class="title">H</p>
                        <p class="title">2B</p>
                        <p class="bold">${getStats(id)[0].gamesPlayed}</p>
                        <p class="bold">${getStats(id)[0].atBats}</p>
                        <p class="bold">${getStats(id)[0].hits}</p>
                        <p class="bold">${getStats(id)[0].doubles}</p>
                    </div>
                    <div class="playerDisplayStats">
                        <p class="title">3B</p>
                        <p class="title">HR</p>
                        <p class="title">BB</p>
                        <p class="title">SH</p>
                        <p class="bold">${getStats(id)[0].triples}</p>
                        <p class="bold">${getStats(id)[0].homeRuns}</p>
                        <p class="bold">${getStats(id)[0].walks}</p>
                        <p class="bold">${getStats(id)[0].sacrifices}</p>
                    </div>
                    <div class="playerDisplayStats">
                        <p class="title">R</p>
                        <p class="title">RBI</p>
                        <p class="title">SB</p>
                        <p class="title">CS</p>
                        <p class="bold">${getStats(id)[0].runs}</p>
                        <p class="bold">${getStats(id)[0].runsBattedIn}</p>
                        <p class="bold">${getStats(id)[0].steals}</p>
                        <p class="bold">${getStats(id)[0].caughtStealing}</p>
                    </div>
                    <div class="playerDisplayStats">
                        <p class="title">AVG</p>
                        <p class="title">OBP</p>
                        <p class="title">SLG</p>
                        <p class="title">OPS</p>
                        <p class="bold">${toDecimal(getAVG(id))}</p>
                        <p class="bold">${toDecimal(getOBP(id))}</p>
                        <p class="bold">${toDecimal(getSLG(id))}</p>
                        <p class="bold">${toDecimal(getOBP(id) + getSLG(id))}</p>
                    </div>
                    <div class="playerDisplayButtons">
                        <a href="./edit/?playerID=${id}">Edit Stats <i class="fa-solid fa-pen-to-square"></i></a>
                        <a href="./export/?playerID=${id}">Export Stats <i class="fa-solid fa-file-export"></i></a>
                    </div>
                </div>
            `
            HTML.push(htmlString)
        })
        htmlList.innerHTML = HTML.join('')
    }
}