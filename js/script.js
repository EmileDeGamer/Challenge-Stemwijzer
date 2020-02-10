console.log(subjects)
console.log(parties)

let ul = document.getElementById('partiesDisplay')
for (let i = 0; i < parties.length; i++) {
    let li = document.createElement('li')
    li.innerHTML = parties[i]['name']
    li.style.borderRadius = "10px"
    ul.appendChild(li)
}

let startButton = document.getElementById('start')
startButton.onclick = function(){nextStatement()}

let counter = 0
let buttons = ['Eens', 'Geen van beide', 'Oneens', 'Sla deze vraag over ->']
function nextStatement(){
    if(counter == 0){
        let wrapper = document.getElementById('wrapper')
        wrapper.innerHTML = ""
        let display = document.createElement('div')
        let statementTitle = document.createElement('h1')
        let statement = document.createElement('p')
        display.id = "display"
        statementTitle.id = "statementTitle"
        statement.id = "statement"
        wrapper.appendChild(display)
        display.appendChild(statementTitle)
        display.appendChild(statement)
        let buttonsDisplay = document.createElement('div')
        buttonsDisplay.id = "buttonsDisplay"
        for (let i = 0; i < buttons.length; i++) {
            let button = document.createElement('button')
            button.innerHTML = buttons[i]
            button.id = buttons[i].toLowerCase()
            button.onclick = function(){choose(i)}
            buttonsDisplay.appendChild(button)
        }
        display.appendChild(buttonsDisplay)
    }
    counter++
    let display = document.getElementById('display')
    let statementTitle = document.getElementById('statementTitle')
    let statement = document.getElementById('statement')
    statementTitle.innerHTML = counter + ". " + subjects[counter-1]['title']
    statement.innerHTML = subjects[counter-1]['statement']
    console.log(counter)
}

function choose(i){
    console.log(buttons[i])
}