const express = require('express')
const router = express.Router()

const docsRoutes = require('./docs.routes')
const museumRoutes = require('./museum.routes')

router.get('/', (req, res) => {
    var pjson = require('./../../package.json')
    res.send({
        name: pjson.displayName,
        description: pjson.description,
        author: pjson.author,
        version: pjson.version,
    })
})

router.use('/', docsRoutes)
router.use('/', museumRoutes)

module.exports = router
