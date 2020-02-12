const minimumPartySize = 15

let ul = document.getElementById('partiesDisplay')
for (let i = 0; i < parties.length; i++) {
    let li = document.createElement('li')
    li.innerHTML = parties[i]['name']
    ul.appendChild(li)
}

let startButton = document.getElementById('start')
startButton.onclick = function(){nextStatement()}

let counter = 0
let buttons = ['Eens', 'Geen van beide', 'Oneens', 'Sla deze vraag over ->']
let chooseHistory = []
let convertedChooseHistory = []
let matchCounter = []
let extraWeightCounter = []
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

        let extraWeightQuestionsList = document.createElement('ul')
        extraWeightQuestionsList.id = "extraWeightQuestionsList"
        for (let i = 0; i < subjects.length; i++) {
            let li = document.createElement('li')
            li.innerHTML = subjects[i]['title']
            li.onclick = function(){setExtraWeight(i)}
            extraWeightQuestionsList.appendChild(li)
        }
        display.appendChild(extraWeightQuestionsList)
            
        let nextButton = document.createElement('button')
        nextButton.innerHTML = "Calculate Match"
        nextButton.id = "calculateMatchButton"
        nextButton.onclick = function(){
            for (let i = 0; i < chooseHistory.length; i++) {
                if(chooseHistory[i] == buttons[0]){
                    convertedChooseHistory.push("pro")
                }
                else if (chooseHistory[i] == buttons[1]){
                    convertedChooseHistory.push("none")
                }
                else if (chooseHistory[i] == buttons[2]){
                    convertedChooseHistory.push("contra")
                }
            }

            let endButtons = ['Alle', 'Grote', 'Seculiere']
            let endList = document.createElement('div')
            endList.id = "endList"
            let endButtonsDisplay = document.createElement('div')
            endButtonsDisplay.id = "endButtonsDisplay"
            for (let i = 0; i < endButtons.length; i++) {
                let button = document.createElement('button')
                button.innerHTML = 'Geef ' + endButtons[i] + ' partijen weer'
                button.onclick = function(){showTypeParty(i)}
                endButtonsDisplay.appendChild(button)
            }
            display.appendChild(endButtonsDisplay)
            display.appendChild(endList)

            nextButton.style.display = "none"
            extraWeightQuestionsList.style.display = "none"
            showMatchedParties(parties)
        }
        display.appendChild(nextButton)
        }
}

function previousStatement(){
    if(document.getElementById('extraWeightQuestionsList') !== null){
        if(document.getElementById('extraWeightQuestionsList').style.display !== "none"){
            for (let i = 1; i < display.childNodes.length; i++) {
                if (display.childNodes[i].style.display !== "none"){
                    display.childNodes[i].style.display = "none"
                }
                if(display.childNodes[i].id == "statementTitle" || display.childNodes[i].id == "statement" || display.childNodes[i].id == "buttonsDisplay"){
                    display.childNodes[i].style.display = "block"
                }
            }
            let tExtraWeightQuestionsList = document.getElementById('extraWeightQuestionsList')
            if(tExtraWeightQuestionsList !== null){
                tExtraWeightQuestionsList.remove()
            }
            let tEndButtonsDisplay = document.getElementById('endButtonsDisplay')
            if(tEndButtonsDisplay !== null){
                tEndButtonsDisplay.remove()
            }
            let tCalculateMatchButton = document.getElementById('calculateMatchButton')
            if(tCalculateMatchButton !== null){
                tCalculateMatchButton.remove()
            }
            counter = chooseHistory.length+1
        }
        else{
            for (let i = 1; i < display.childNodes.length; i++) {
                if (display.childNodes[i].style.display !== "none"){
                    display.childNodes[i].style.display = "none"
                }
            }
            let tEndList = document.getElementById('endList')
            if(tEndList !== null){
                tEndList.remove()
            }
            document.getElementById('calculateMatchButton').style.display = "block"
            extraWeightQuestionsList.style.display = "block"
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
    else{
        location.reload()
    }
}    

function showTypeParty(x){
    endList.innerHTML = ""
    let ul = document.createElement('ul')
    if(x == 0){
        showMatchedParties(parties)
    }
    else if (x == 1){
        let bigParties = []
        for (let i = 0; i < parties.length; i++) {
            if(parties[i].size <= minimumPartySize){
                bigParties.push(parties[i])
            }
        }
        showMatchedParties(bigParties)
    }
    else if (x == 2){
        let secularParties = []
        for (let i = 0; i < parties.length; i++) {
            if(parties[i]['secular']){
                secularParties.push(parties[i])
            }
        }
        showMatchedParties(secularParties)
    }
    endList.appendChild(ul)
}

function showMatchedParties(tParties){
    let matchCounter = []
        
    for (let i = 0; i < tParties.length; i++) {
        matchCounter.push({name: tParties[i]['name'], value: 0, extraWeight: false})
    }

    for (let i = 0; i < subjects.length; i++) {
        for (let x = 0; x < subjects[i].parties.length; x++) {
            for (let y = 0; y < tParties.length; y++) {
                if(tParties[y]['name'] == subjects[i].parties[x]['name']){
                    if(convertedChooseHistory[x] == subjects[i].parties[x].position){
                        for (let z = 0; z < extraWeightCounter.length; z++) {
                            if(extraWeightCounter[z]['title'] == subjects[i]['title']){
                                if(extraWeightCounter[z]['extraWeight']){
                                    matchCounter[y]['value']++
                                }
                            }
                        }
                        matchCounter[y]['value']++
                    }
                }
            }
        }
    }

    function sort(valuePath, array){
        let path = valuePath.split('.')  
      
        return array.sort((a, b) => {
           return getValue(b,path) - getValue(a,path)    
        })
      
        function getValue(obj, path){
          path.forEach(path => obj = obj[path])
          return obj
        }
    }
    
    matchCounter = sort('value', matchCounter)

    let sortedMatchList = document.createElement('ul')
    for (let i = 0; i < matchCounter.length; i++) {
        let li = document.createElement('li')
        li.innerHTML = matchCounter[i]['name']
        sortedMatchList.appendChild(li)
    }
    endList.appendChild(sortedMatchList)
}

function setExtraWeight(x){
    for (let i = 0; i < subjects.length; i++) {
        extraWeightCounter.push({title: subjects[i]['title'], extraWeight: false})
    }

    for (let i = 0; i < extraWeightCounter.length; i++) {
        if(x == i){
            if(extraWeightCounter[i]['extraWeight']){
                extraWeightCounter[i]['extraWeight'] = false
            }
            else{
                extraWeightCounter[i]['extraWeight'] = true
            }
        }
    }
}