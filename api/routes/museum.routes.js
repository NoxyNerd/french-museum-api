const express = require('express')
const { MuseumController } = require('../controllers/museum.controller')
const { MuseumService } = require('../services/museum.service')
const router = express.Router()

const museumService = new MuseumService()
const museumController = new MuseumController(museumService)

router.get('/museums', museumController.getMuseums.bind(museumController))
router.get('/museums/:museumId', museumController.getMuseum.bind(museumController))
router.get('/categories', museumController.getCategories.bind(museumController))
router.get('/categories/:categoryId', museumController.getCategory.bind(museumController))

module.exports = router
