import { checkStats, createPlayer, deletePlayer, getStats, getStatsList } from "./main.js";

checkStats()

//createPlayer()

displayPlayers()

addClickEvents()

function displayPlayers() {
    var htmlList = document.getElementById('list')
    let HTML = []
    HTML.push('<h1>Players</h1>')
    getStatsList().map(id => {
        var htmlString = `
        <div class="playerList">
            <div class="gridItem">
                <p>Name: ${getStats(id)[0].firstName} ${getStats(id)[0].lastName}</p>
            </div>
            <div class="gridItem">
                <button data-type-edit data-id-${id}>Edit Stats <i class="fa-solid fa-pen-to-square"></i></button>
            </div>
            <div class="gridItem">
                <button data-type-export data-id-${id}>Export <i class="fa-solid fa-file-export"></i></button>
            </div>
            <div class="gridItem">
                <button data-type-delete data-id-${id}>Delete <i class="fa-solid fa-circle-xmark"></i></button>
            </div>
        </div>
        `
        HTML.push(htmlString)
    })
    HTML.push(`
        <div class="newPlayer">
            <div class="gridItem">
                <input type="text" id="firstName" placeholder="First Name" autocomplete="off">
            </div>
            <div class="gridItem">
                <input type="text" id="lastName" placeholder="Last Name" autocomplete="off">
            </div>
            <div class="gridItem">
                <button id="create">Create <i class="fa-solid fa-circle-plus"></i></button>
            </div>
        </div>
    `)
    htmlList.innerHTML = HTML.join('')
}

function addClickEvents() {
    document.querySelectorAll('[data-type-export]').forEach(button => {
        var id = [...button.attributes].filter(attribute => attribute.name.includes('data-id-'))[0].name.replace('data-id-', '')
        button.addEventListener('click', () => {
            location.href = '../export/?playerID=' + id
        })
    })
    document.querySelectorAll('[data-type-edit]').forEach(button => {
        var id = [...button.attributes].filter(attribute => attribute.name.includes('data-id-'))[0].name.replace('data-id-', '')
        button.addEventListener('click', () => {
            location.href = '../edit/?playerID=' + id
        })
    })
    document.querySelectorAll('[data-type-delete]').forEach(button => {
        var id = [...button.attributes].filter(attribute => attribute.name.includes('data-id-'))[0].name.replace('data-id-', '')
        button.addEventListener('click', () => {
            deletePlayer(id)
            location.href = './'
        })
    })
    document.getElementById('create').addEventListener('click', () => {
        var firstName = ''
        var lastName = ''
        if (document.getElementById('firstName').value.replace(' ', '') !== '') {
            firstName = document.getElementById('firstName').value
        }
        if (document.getElementById('lastName').value.replace(' ', '') !== '') {
            lastName = document.getElementById('lastName').value
        }
        createPlayer(firstName, lastName)
        location.href = './'
    })
}