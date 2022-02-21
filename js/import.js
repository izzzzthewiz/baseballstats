import { checkStats, createPlayer, saveStats, getID } from "./main.js"

checkStats()

checkURL()

function checkURL(){
    var code = window.location.href.split('/import/?')[1]
    
    if (!code) return displayImport()
    
    var values = JSON.stringify(code.split('&'))
    values = values.replaceAll('[', '')
    values = values.replaceAll(']', '')
    values = values.replaceAll('=', '":"')
    values = `[{${values}}]`
    values = JSON.parse(values)

    var data = checkValues(values)
    if (data == false) return location.href = './'
    
    displayImport()
    document.getElementById('link').value = window.location.href
}

function checkValues(data){
    var check = data[0]
    if (!check.playerID) return false
    if (!check.firstName) return false
    if (!check.lastName) return false
    if (parseInt(check.number) !== 0 && !parseInt(check.number)) return false
    if (parseInt(check.height) !== 0 && !parseInt(check.height)) return false
    if (parseInt(check.weight) !== 0 && !parseInt(check.weight)) return false
    if (!check.position) return false
    if (parseInt(check.gamesPlayed) !== 0 && !parseInt(check.gamesPlayed)) return false
    if (parseInt(check.atBats) !== 0 && !parseInt(check.atBats)) return false
    if (parseInt(check.hits) !== 0 && !parseInt(check.hits)) return false
    if (parseInt(check.doubles) !== 0 && !parseInt(check.doubles)) return false
    if (parseInt(check.triples) !== 0 && !parseInt(check.triples)) return false
    if (parseInt(check.homeRuns) !== 0 && !parseInt(check.homeRuns)) return false
    if (parseInt(check.walks) !== 0 && !parseInt(check.walks)) return false
    if (parseInt(check.sacrifices) !== 0 && !parseInt(check.sacrifices)) return false
    if (parseInt(check.runs) !== 0 && !parseInt(check.runs)) return false
    if (parseInt(check.runsBattedIn) !== 0 && !parseInt(check.runsBattedIn)) return false
    if (parseInt(check.steals) !== 0 && !parseInt(check.steals)) return false
    if (parseInt(check.caughtStealing) !== 0 && !parseInt(check.caughtStealing)) return false
    data[0].number = parseInt(data[0].number)
    data[0].height = parseInt(data[0].height)
    data[0].weight = parseInt(data[0].weight)
    data[0].gamesPlayed = parseInt(data[0].gamesPlayed)
    data[0].atBats = parseInt(data[0].atBats)
    data[0].hits = parseInt(data[0].hits)
    data[0].doubles = parseInt(data[0].doubles)
    data[0].triples = parseInt(data[0].triples)
    data[0].homeRuns = parseInt(data[0].homeRuns)
    data[0].walks = parseInt(data[0].walks)
    data[0].sacrifices = parseInt(data[0].sacrifices)
    data[0].runs = parseInt(data[0].runs)
    data[0].runsBattedIn = parseInt(data[0].runsBattedIn)
    data[0].steals = parseInt(data[0].steals)
    data[0].caughtStealing = parseInt(data[0].caughtStealing)
    return data
}

function displayImport(){
    var container = document.getElementById('container')
    container.innerHTML = `
    <div class="import">
        <h1>Import Player</h1>
        <h2>Import By Link</h2>
        <div class="linkcontainer">
            <input id="link" type="text" autocomplete="off" placeholder="Import URL">
            <button id="import-link">Import <i class="fa-solid fa-file-import"></i></button>
        </div>
        <h2>Import By JSON</h2>
        <div class="jsoncontainer">
            <button id="import-json">Import <i class="fa-solid fa-file-import"></i></button>
            <textarea id="json" style="resize: none;" placeholder="JSON code">
        </div>
    </div>
    `
    document.getElementById('json').value = ''
    document.getElementById('import-link').addEventListener('click', (importByLink))
    document.getElementById('import-json').addEventListener('click', (importByJSON))
}

function importByLink(){
    var code = document.getElementById('link').value.split('/import/?')[1]
    
    if (!code) return linkError()
    
    var values = JSON.stringify(code.split('&'))
    values = values.replaceAll('[', '')
    values = values.replaceAll(']', '')
    values = values.replaceAll('=', '":"')
    values = `[{${values}}]`
    values = JSON.parse(values)

    var data = checkValues(values)
    if (data == false) return linkError()
    data[0].playerID = getID(5)
    createPlayer(data[0].firstName, data[0].lastName, data[0].playerID)
    saveStats(data[0].playerID, data)
    location.href = '../players'
}

function linkError(){
    document.getElementById('import-link').style.color = '#dc143c'
    document.getElementById('import-link').innerHTML = 'Invalid <i class="fa-solid fa-circle-xmark"></i>'
    setTimeout(function() {
        document.getElementById('import-link').style.color = '#000000'
        document.getElementById('import-link').innerHTML = 'Import <i class="fa-solid fa-file-import"></i>'
    }, 1500)
}

async function importByJSON(){
    var code = document.getElementById('json').value
    try {
        code = JSON.parse(code)
    } catch {
        return jsonError()
    }
    var data = checkValues(code)
    if (data == false) return jsonError()
    data[0].playerID = getID(5)
    createPlayer(data[0].firstName, data[0].lastName, data[0].playerID)
    saveStats(data[0].playerID, data)
    location.href = '../players'
}

function jsonError(){
    document.getElementById('import-json').style.color = '#dc143c'
    document.getElementById('import-json').innerHTML = 'Invalid <i class="fa-solid fa-circle-xmark"></i>'
    setTimeout(function() {
        document.getElementById('import-json').style.color = '#000000'
        document.getElementById('import-json').innerHTML = 'Import <i class="fa-solid fa-file-import"></i>'
    }, 1500)
}