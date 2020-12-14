const fetch = require('node-fetch')
const fs = require('fs')
async function catHell() {
    let resp = await fetch(`http://shibe.online/api/cats?count=$100&urls=false&httpsUrls=true`) // do a request
    let FileNames = await resp.json()
    let downloads = FileNames.map(async function (FileName) {
        let response2 = await fetch('https://cdn.shibe.online/cats/' + FileName + '.jpg')
        let writestream = fs.createWriteStream('./folder/' + FileName + '.jpg')
        response2.body.pipe(writestream)
    })
    await Promise.all(downloads)
    catHell()
}
// cat hell
catHell()