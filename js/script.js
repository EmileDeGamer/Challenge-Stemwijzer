console.log(subjects)
console.log(parties)

const minimumPartySize = 15

//get the opinions
for (let i = 0; i < subjects.length; i++) {
    for (let x = 0; x < subjects[i].parties.length; x++) {
        console.log(subjects[i].parties[x].position)
        
    }
}

let secularParties = []
for (let i = 0; i < parties.length; i++) {
    if(parties[i]['secular']){
        secularParties.push(parties[i])
    }
}
console.log(secularParties)

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
let matchCounter = []
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
        
        for (let i = 1; i < display.childNodes.length; i++) {
            display.childNodes[i].style.display = "none"
        }
        let endButtons = ['Alle', 'Grote', 'Seculiere']
        let endList = document.createElement('div')
        endList.id = "endList"
        for (let i = 0; i < endButtons.length; i++) {
            let button = document.createElement('button')
            button.innerHTML = 'Geef ' + endButtons[i] + ' partijen weer'
            button.onclick = function(){showTypeParty(i)}
            display.appendChild(button)
        }
        display.appendChild(endList)
        //display.innerHTML = ""
        console.log(chooseHistory)
    }
}

function previousStatement(){
    for (let i = 1; i < display.childNodes.length; i++) {
        if (display.childNodes[i].style.display == "none"){
            display.childNodes[i].style.display = "block"
            counter = chooseHistory.length+1
        }
    }
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

function showTypeParty(x){
    endList.innerHTML = ""
    let ul = document.createElement('ul')
    if(x == 0){
        ul.innerHTML = ""
        for (let i = 0; i < parties.length; i++) {
            let li = document.createElement('li')
            li.innerHTML = parties[i]['name']
            ul.appendChild(li)
        }        
    }
    else if (x == 1){
        ul.innerHTML = ""
        //add user changeable amount of lower than show parties amount
        for (let i = 0; i < parties.length; i++) {
            if(parties[i].size <= minimumPartySize){
                let li = document.createElement('li')
                li.innerHTML = parties[i]['name']
                ul.appendChild(li)
            }
        }
    }
    else if (x == 2){
        ul.innerHTML = ""
        for (let i = 0; i < secularParties.length; i++) {
            let li = document.createElement('li')
            li.innerHTML = secularParties[i]['name']
            ul.appendChild(li)
        }  
    }
    endList.appendChild(ul)
    let matchList = document.createElement('ul')
    for (let i = 0; i < chooseHistory.length; i++) {
        if(chooseHistory[i] == buttons[0]){
            chooseHistory[i] = "pro"
        }
        else if (chooseHistory[i] == buttons[1]){
            chooseHistory[i] = "none"
        }
        else if (chooseHistory[i] == buttons[2]){
            chooseHistory[i] = "contra"
        }
    }
    for (let i = 0; i < subjects.length; i++) {
        matchCounter.push(0)
        for (let x = 0; x < subjects[i].parties.length; x++) {
            if(chooseHistory[x] == subjects[i].parties[x].position){
                matchCounter[i]++
            } 
        }
    }
}