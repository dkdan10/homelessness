const express = require("express")
const router = express.Router()

const handleGetHomelessShelterCensus = require("./data/getHomelessShelterCensus")

router.get('/homelessShelterCensus', handleGetHomelessShelterCensus)

module.exports = router;
