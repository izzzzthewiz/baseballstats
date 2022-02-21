const LIST_KEY = 'baseballstats.playerlist'
const KEY_PREFIX = 'baseballstats.'
export const MAIN_URL = 'https://baseballstats.izzdevs.me'

export function getID(int){
    var code = []
    for (let i = 1; i <= int; i++) {
        if (randomInt(3) == 1) {
            code.push(randomInt(10)-1)
        } else {
            code.push(randomLetter(true))
        }
    }
    return code.join('')
}

function randomInt(max) {
    return Math.floor(Math.random() * max)+1
}
function randomLetter(c){
    const lower = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    if (c == true) return lower[randomInt(26)-1]
    return upper[randomInt(26)-1]
}

export function checkStats() {
    if (!localStorage.getItem(LIST_KEY)){
        var ls = []
        localStorage.setItem(LIST_KEY, JSON.stringify(ls))
    }
}

export function getStatsList(){
    if (!localStorage.getItem(LIST_KEY)) return null
    return JSON.parse(localStorage.getItem(LIST_KEY))
}

export function getStats(playerID) {
    if (!localStorage.getItem(KEY_PREFIX + playerID)) return null
    return JSON.parse(localStorage.getItem(KEY_PREFIX + playerID))
}

export function createPlayer(firstName, lastName, id) {
    if (!id) id = getID(5)
    if (!firstName) firstName = 'Player'
    if (!lastName) lastName = 'Name'
    var obj = [
        {
            playerID: id,
            firstName: firstName,
            lastName: lastName,
            number: 0,
            position: 'P',
            height: 0,
            weight: 0,

            gamesPlayed: 0,
            atBats: 0,
            hits: 0,
            doubles: 0,

            triples: 0,
            homeRuns: 0,
            walks: 0,
            sacrifices: 0,

            runs: 0,
            runsBattedIn: 0,
            steals: 0,
            caughtStealing: 0
        }
    ]
    localStorage.setItem(KEY_PREFIX + id, JSON.stringify(obj))
    var list = JSON.parse(localStorage.getItem(LIST_KEY))
    list.push(id)
    localStorage.setItem(LIST_KEY, JSON.stringify(list))
}

export function saveStats(playerID, data) {
    var stats = getStats(playerID)
    if (stats == null) return console.log(`%cError saving stats for ${playerID}`, 'color: #c00;')
    localStorage.setItem(KEY_PREFIX + playerID, JSON.stringify(data))
}

export function deletePlayer(playerID) {
    if (getStats(playerID) == null) return console.log('none')
    var list = getStatsList().filter(e => e !== playerID)
    localStorage.setItem(LIST_KEY, JSON.stringify(list))
    localStorage.removeItem(KEY_PREFIX + playerID)
}

export function resetStats(playerID) {
    if (getStats(playerID) == null) return
    var data = getStats(playerID)
    data[0].gamesPlayed = 0
    data[0].atBats = 0
    data[0].hits = 0
    data[0].doubles = 0
    data[0].triples = 0
    data[0].homeRuns = 0
    data[0].walks = 0
    data[0].sacrifices = 0
    data[0].runs = 0
    data[0].runsBattedIn = 0
    data[0].steals = 0
    data[0].caughtStealing = 0
    saveStats(playerID, data)
}


export function toFeet(n) {
    var realFeet = ((n*0.393700) / 12);
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + "&prime;" + inches + '&Prime;';
}

export function toLbs(n) {
    return Math.floor(n * 2.20462)
}

export function toDecimal(num) {
    if (`${num}` === 'NaN') return '.000'
    var newNum = num.toFixed(3)
    if (num < 1) {
        var split = newNum.split('.')
        newNum = `.${split[1]}`
    }
    return newNum
}

export function getAVG(id) {
    return ((getStats(id)[0].hits) / (getStats(id)[0].atBats))
}

export function getOBP(id) {
    return (
        (
            (getStats(id)[0].hits)+
            (getStats(id)[0].walks)
        )/
        (
            (getStats(id)[0].atBats)+
            (getStats(id)[0].walks)+
            (getStats(id)[0].sacrifices)
        )
    )
}

export function getSLG(id) {
    return (
        (
            (
                (getStats(id)[0].hits)-
                (getStats(id)[0].doubles)-
                (getStats(id)[0].triples)-
                (getStats(id)[0].homeRuns)
            )+
            (getStats(id)[0].doubles)*2+
            (getStats(id)[0].triples)*3+
            (getStats(id)[0].homeRuns)*4
        )/
        (getStats(id)[0].atBats)
    )
}

export function clearStats() {
    var keys = Object.keys(localStorage).filter(key => key.includes(KEY_PREFIX))
    keys.map(key => {
        localStorage.removeItem(key)
    })
    checkStats()
}