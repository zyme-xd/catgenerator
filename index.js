// this is example code for interacting with shibe.online's api. i will use this to help me create this bot without it being garbage! thank you :)
const fetch = require('node-fetch')
const readline = require('readline-promise').default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs')
ShibeTime()

async function ShibeTime() {
    let amount = parseInt(await readline.questionAsync('how many cats do u want? (max is 100)  '))
    if (isNaN(amount)){
        console.log("You can't input a string")
        ShibeTime()
        return
    }
    if (amount <= 0){
        console.log('Cannot generate anti-matter cats. (Why did you expect this to work? You fucking dumbass)')
        ShibeTime()
        return
    }
    if (amount > 100) {
        console.log("You've requested too many cats.") // if over 100 doesnt even touch the api
        ShibeTime()
        return
    }
    console.log("ok, getting " + amount, )
    let resp = await fetch(`http://shibe.online/api/cats?count=${amount}&urls=false&httpsUrls=true`) // do a request
    let FileNames = await resp.json()
    let downloads = FileNames.map(async function(FileName){
        let response2 = await fetch('https://cdn.shibe.online/cats/' + FileName + '.jpg')
        let writestream = fs.createWriteStream('./folder/' + FileName + '.jpg')
        response2.body.pipe(writestream)
    
    
    })
    await Promise.all(downloads)
    PromptAgain()
}

function PromptAgain() { // basically checks if user wants to get more dogs
    readline.question('do you want to get more cats? y/n : ', answer => {
        if (answer == "y") { // this may not the best way to do booleans, cuz this is a fake boolean sorta
            ShibeTime()
            return
        }
        else if (answer == "n") {
            readline.close()
            return
        }
    })
}