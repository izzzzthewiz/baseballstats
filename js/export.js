import { checkStats, getStatsList, getStats, MAIN_URL } from "./main.js ";

checkStats()

checkURL()

function checkURL(){
    var id = window.location.href.split('?playerID=')[1]
    if (!id) return displayPlayers()
    displayExport(id)
}

function displayPlayers(){
    var container = document.getElementById('container')
    if (getStatsList().length == 0) {
        container.innerHTML = `
        <div id="noPlayers">
            <h1>No players created</h1>
            <a href="../players/">Add Player <i class="fa-solid fa-circle-plus"></i></a>
        </div>
        `
        return
    }
    var HTML = []
    HTML.push('<h1>Players</h1>')
    getStatsList().map(id => {
        var htmlString = `
        <div class="playerList">
            <div class="player">
                <h2>${getStats(id)[0].firstName} ${getStats(id)[0].lastName}</h2>
                <button data-type-edit data-id-${id}>Export Stats <i class="fa-solid fa-file-export"></i></button>
            </div>
        </div>
        `
        HTML.push(htmlString)
    })
    container.innerHTML = HTML.join('')
    document.querySelectorAll('[data-type-edit]').forEach(button => {
        var id = [...button.attributes].filter(attribute => attribute.name.includes('data-id-'))[0].name.replace('data-id-', '')
        button.addEventListener('click', () => {
            location.href = '../export/?playerID=' + id
        })
    })
}

function displayExport(id) {
    if (!getStats(id)) return location.href = './'
    var container = document.getElementById('container')
    var data = getStats(id)[0]
    container.innerHTML = `
        <div class="export">
            <h1>Export Stats - ${data.firstName} ${data.lastName}</h1>
            <h2>Import Link</h2>
            <div class="linkcontainer">
                <input id="link" type="text" readonly="readonly" value="${getImportLink(id)}">
                <button id="copy-link">Copy <i class="fa-solid fa-copy"></i></button>
            </div>
            <h2>JSON Code</h2>
            <div class="jsoncontainer">
                <button id="copy-json">Copy <i class="fa-solid fa-copy"></i></button>
                <textarea id="json" style="resize: none;" readonly="readonly">
            </div>
        </div>
    `
    document.getElementById('copy-link').addEventListener('click', (copyLink))
    document.getElementById('copy-json').addEventListener('click', (copyJSON))
    document.getElementById('json').value = JSON.stringify(getStats(id), '\n', 2)

}

function getImportLink(id){
    if (!getStats(id)) return
    var data = getStats(id)[0]
    return (
        MAIN_URL+
        `/import/?playerID=${id}`+
        `&firstName=${data.firstName}`+
        `&lastName=${data.lastName}`+
        `&number=${data.number}`+
        `&position=${data.position}`+
        `&height=${data.height}`+
        `&weight=${data.weight}`+
        `&gamesPlayed=${data.gamesPlayed}`+
        `&atBats=${data.atBats}`+
        `&hits=${data.hits}`+
        `&doubles=${data.doubles}`+
        `&triples=${data.triples}`+
        `&homeRuns=${data.homeRuns}`+
        `&walks=${data.walks}`+
        `&sacrifices=${data.sacrifices}`+
        `&runs=${data.runs}`+
        `&runsBattedIn=${data.runsBattedIn}`+
        `&steals=${data.steals}`+
        `&caughtStealing=${data.caughtStealing}`
    )
}

async function copyLink(){
    await navigator.clipboard.writeText(document.getElementById('link').value)
    document.getElementById('copy-link').style.color = '#00cc00'
    document.getElementById('copy-link').innerHTML = 'Copied <i class="fa-solid fa-copy"></i>'
    setTimeout(function(){
        document.getElementById('copy-link').style.color = '#000000'
        document.getElementById('copy-link').innerHTML = 'Copy <i class="fa-solid fa-copy"></i>'
    }, 1500)
}

async function copyJSON(){
    await navigator.clipboard.writeText(document.getElementById('json').value)
    document.getElementById('copy-json').style.color = '#00cc00'
    document.getElementById('copy-json').innerHTML = 'Copied <i class="fa-solid fa-copy"></i>'
    setTimeout(function(){
        document.getElementById('copy-json').style.color = '#000000'
        document.getElementById('copy-json').innerHTML = 'Copy <i class="fa-solid fa-copy"></i>'
    }, 1500)
}