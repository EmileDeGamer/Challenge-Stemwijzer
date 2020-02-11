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
let chooseHistory = []
function nextStatement(){
    if(counter == 0){
        let wrapper = document.getElementById('wrapper')
        wrapper.innerHTML = ""
        let display = document.createElement('div')
        let statementTitle = document.createElement('h1')
        let statement = document.createElement('p')
        let backButton = document.createElement('button')
        backButton.innerHTML = "<-"
        backButton.id = "backButton"
        backButton.onclick = function(){previousStatement()}
        display.appendChild(backButton)
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
        counter++
        statementTitle.innerHTML = counter + ". " + subjects[counter-1]['title']
        statement.innerHTML = subjects[counter-1]['statement']
    }
}

function choose(i){
    if(counter !== subjects.length)
    {
        chooseHistory[counter-1] = buttons[i]
        counter++
        if(typeof chooseHistory[counter-1] !== 'undefined'){
            for (let i = 0; i < buttonsDisplay.childNodes.length-1; i++) {
                if(buttonsDisplay.childNodes[i].id == chooseHistory[counter-1].toLowerCase()){
                    buttonsDisplay.childNodes[i].style.background = "blue"
                }
                else{
                    buttonsDisplay.childNodes[i].style.background = "black"
                }
            }
        }
        else{
            for (let i = 0; i < buttonsDisplay.childNodes.length-1; i++) {
                buttonsDisplay.childNodes[i].style.background = "black"
            }
        }
        statementTitle.innerHTML = counter + ". " + subjects[counter-1]['title']
        statement.innerHTML = subjects[counter-1]['statement']
    }
    else{
        chooseHistory[counter-1] = buttons[i]
        if(typeof chooseHistory[counter-1] !== 'undefined'){
            for (let i = 0; i < buttonsDisplay.childNodes.length-1; i++) {
                if(buttonsDisplay.childNodes[i].id == chooseHistory[counter-1].toLowerCase()){
                    buttonsDisplay.childNodes[i].style.background = "blue"
                }
                else{
                    buttonsDisplay.childNodes[i].style.background = "black"
                }
            }
        }
        else{
            for (let i = 0; i < buttonsDisplay.childNodes.length-1; i++) {
                buttonsDisplay.childNodes[i].style.background = "black"
            }
        }
        //display.innerHTML = ""
        console.log(chooseHistory)
    }
}

function previousStatement(){
    if(counter !== 1){
        counter--
        statementTitle.innerHTML = counter + ". " + subjects[counter-1]['title']
        statement.innerHTML = subjects[counter-1]['statement']
        for (let i = 0; i < buttonsDisplay.childNodes.length-1; i++) {
            if(buttonsDisplay.childNodes[i].id == chooseHistory[counter-1].toLowerCase()){
                buttonsDisplay.childNodes[i].style.background = "blue"
            }
            else{
                buttonsDisplay.childNodes[i].style.background = "black"
            }
        }
    }
}    