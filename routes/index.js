const express = require('express')
// getting router portion of our express variable
const router = express.Router()

// creating route
router.get('/',(req, res) => {
    res.render('index')
})

// to use this router, we need to import this router into our server

// exporting our router
module.exports = router