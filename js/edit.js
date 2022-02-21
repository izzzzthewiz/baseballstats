import { checkStats, getStatsList, getStats, saveStats, resetStats } from "./main.js";

checkStats()

checkURL()

function checkURL(){
    var id = window.location.href.split('?playerID=')[1]
    if (!id) return displayPlayers()
    displayEditor(id)
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
                <button data-type-edit data-id-${id}>Edit Stats <i class="fa-solid fa-pen-to-square"></i></button>
            </div>
        </div>
        `
        HTML.push(htmlString)
    })
    container.innerHTML = HTML.join('')
    document.querySelectorAll('[data-type-edit]').forEach(button => {
        var id = [...button.attributes].filter(attribute => attribute.name.includes('data-id-'))[0].name.replace('data-id-', '')
        button.addEventListener('click', () => {
            location.href = '../edit/?playerID=' + id
        })
    })
}

function displayEditor(id){
    var container = document.getElementById('container')
    container.innerHTML = `
    <div class="editor">
        <h2>Edit Stats - ${getStats(id)[0].firstName} ${getStats(id)[0].lastName}</h2>
        <div class="grid">

            <div class="gridItem">
                <p>Number:</p><input type="number" id="number" placeholder="Num" value="${getStats(id)[0].number}">
            </div>
            <div class="gridItem">
                <p>Position:</p>
                <select id="position">
                    <option>P</option>
                    <option>C</option>
                    <option>1B</option>
                    <option>2B</option>
                    <option>3B</option>
                    <option>SS</option>
                    <option>LF</option>
                    <option>CF</option>
                    <option>RF</option>
                </select>
            </div>
            <div class="gridItem">
                <p>Height (cm):</p><input type="number" id="height" placeholder="Num" value="${getStats(id)[0].height}">
            </div>
            <div class="gridItem">
                <p>Weight (kg):</p><input type="number" id="weight" placeholder="Num" value="${getStats(id)[0].weight}">
            </div>

            <div class="gridItem">
                <p>Games Played (GP):</p><input type="number" id="gamesPlayed" placeholder="Num" value="${getStats(id)[0].gamesPlayed}">
            </div>
            <div class="gridItem">
                <p>At Bats (AB):</p><input type="number" id="atBats" placeholder="Num" value="${getStats(id)[0].atBats}">
            </div>
            <div class="gridItem">
                <p>Hits (H):</p><input type="number" id="hits" placeholder="Num" value="${getStats(id)[0].hits}">
            </div>
            <div class="gridItem">
                <p>Doubles (2B):</p><input type="number" id="doubles" placeholder="Num" value="${getStats(id)[0].doubles}">
            </div>

            <div class="gridItem">
                <p>Triples (3B):</p><input type="number" id="triples" placeholder="Num" value="${getStats(id)[0].triples}">
            </div>
            <div class="gridItem">
                <p>Home Runs (HR):</p><input type="number" id="homeRuns" placeholder="Num" value="${getStats(id)[0].homeRuns}">
            </div>
            <div class="gridItem">
                <p>Walks (BB):</p><input type="number" id="walks" placeholder="Num" value="${getStats(id)[0].walks}">
            </div>
            <div class="gridItem">
                <p>Sacrifices (SH):</p><input type="number" id="sacrifices" placeholder="Num" value="${getStats(id)[0].sacrifices}">
            </div>

            <div class="gridItem">
                <p>Runs (R):</p><input type="number" id="runs" placeholder="Num" value="${getStats(id)[0].runs}">
            </div>
            <div class="gridItem">
                <p>Runs Batted In (RBI):</p><input type="number" id="runsBattedIn" placeholder="Num" value="${getStats(id)[0].runsBattedIn}">
            </div>
            <div class="gridItem">
                <p>Steals (SB):</p><input type="number" id="steals" placeholder="Num" value="${getStats(id)[0].steals}">
            </div>
            <div class="gridItem">
                <p>Caught Stealing (CS):</p><input type="number" id="caughtStealing" placeholder="Num" value="${getStats(id)[0].caughtStealing}">
            </div>
            
        </div>
        <button id="save">Save <i class="fa-solid fa-floppy-disk"></i></button>
        <button id="reset">Reset Stats <i class="fa-solid fa-arrows-rotate"></i></button>
    </div>
    `
    document.getElementById('position').value = getStats(id)[0].position

    document.getElementById('save').addEventListener('click', () => {
        let invalid = []

        if (checkValue('number', true) == false) invalid.push('Number')
        if (checkValue('height', false) == false) invalid.push('Height')
        if (checkValue('weight', false) == false) invalid.push('Weight')
        if (checkValue('gamesPlayed', false) == false) invalid.push('Games Played')
        if (checkValue('atBats', false) == false) invalid.push('At Bats')
        if (checkValue('hits', false) == false) invalid.push('Hits')
        if (checkValue('doubles', false) == false) invalid.push('Doubles')
        if (checkValue('triples', false) == false) invalid.push('Triples')
        if (checkValue('homeRuns', false) == false) invalid.push('Home Runs')
        if (checkValue('walks', false) == false) invalid.push('Walks')
        if (checkValue('sacrifices', false) == false) invalid.push('Sacrifices')
        if (checkValue('runs', false) == false) invalid.push('Runs')
        if (checkValue('runsBattedIn', false) == false) invalid.push('Runs Batted In')
        if (checkValue('steals', false) == false) invalid.push('Steals')
        if (checkValue('caughtStealing', false) == false) invalid.push('Caught Stealing')
        
        if (invalid.length > 0) {
            document.getElementById('error').style.display = 'flex'
            document.getElementById('invalid').innerText = invalid.join(', ')
            return
        }

        var data = getStats(id)
        data[0].number = getValue('number')
        data[0].position = document.getElementById('position').value
        data[0].height = getValue('height')
        data[0].weight = getValue('weight')
        data[0].gamesPlayed = getValue('gamesPlayed')
        data[0].atBats = getValue('atBats')
        data[0].hits = getValue('hits')
        data[0].doubles = getValue('doubles')
        data[0].triples = getValue('triples')
        data[0].homeRuns = getValue('homeRuns')
        data[0].walks = getValue('walks')
        data[0].sacrifices = getValue('sacrifices')
        data[0].runs = getValue('runs')
        data[0].runsBattedIn = getValue('runsBattedIn')
        data[0].steals = getValue('steals')
        data[0].caughtStealing = getValue('caughtStealing')
        saveStats(id, data)
        location.href = './?playerID=' + id

    })

    document.getElementById('reset').addEventListener('click', () => {
        resetStats(id)
        location.href = './?playerID=' + id
    })

}

function checkValue(i, max){
    var value = parseInt(document.getElementById(i).value)
    if (value !== 0 && !value) return false
    if (value < 0) return false
    if (max == true && value > 99) return false
    return true
}
function getValue(i){
    return parseInt(document.getElementById(i).value)
}