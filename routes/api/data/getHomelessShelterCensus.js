const fetch = require("node-fetch");



let homelessShelterCensusData = []
const getData = async () => {
    const response = await fetch('https://data.cityofnewyork.us/resource/3pjg-ncn9.json')
    homelessShelterCensusData = await response.json()
}

// GET DATA
getData()
// INTERVAL TO REFRESH DATA DAILY
const dayInMilliseconds = 1000 * 60 * 60 * 24;
setInterval(() => { 
    getData()
}, dayInMilliseconds)

module.exports =  (req, res) => {
    res.json({
        homelessShelterCensusData
    })

}