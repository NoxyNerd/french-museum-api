class MuseumController {
    constructor(museumService) {
        this.museumService = museumService
    }

    getMuseums(req, res) {
        try {
            let props = {}
            const q = req.query?.q
            const page = req.query?.page
            const category = req.query?.category
            const lat = req.query?.location?.lat || req.query?.lat
            const lon = req.query?.location?.lon || req.query?.lon

            if (q) props.q = q
            if (page) props.page = page
            if (category) props.category = category

            if (lat != undefined && lon != undefined)
                props.location = {
                    lat: lat,
                    lon: lon,
                }

            const museums = this.museumService.listMuseums(props)

            res.status(200).send({
                museums: museums.map((m) => m?.export()),
            })
        } catch (e) {
            console.log(e)
            res.status(500).send({ error: 'server_error' })
        }
    }

    getMuseum(req, res) {
        try {
            const museumId = req.params.museumId
            console.log(museumId)
            const museum = this.museumService.getMuseum(museumId)

            res.status(200).send({
                museum: museum?.export(),
            })
        } catch (e) {
            console.log(e)
            res.status(500).send({ error: 'server_error' })
        }
    }

    getCategories(req, res) {
        try {
            let props = {}
            const q = req.query?.q

            if (q) props.q = q

            const categories = this.museumService.listCategories(props)

            res.status(200).send({
                categories: categories.map((c) => c.export()),
            })
        } catch (e) {
            console.log(e)
            res.status(500).send({ error: 'server_error' })
        }
    }

    getCategory(req, res) {
        try {
            const categoryId = req.params.categoryId
            const category = this.museumService.getCategory(categoryId)

            res.status(200).send({
                category: category?.export(),
            })
        } catch (e) {
            console.log(e)
            res.status(500).send({ error: 'server_error' })
        }
    }
}

module.exports = { MuseumController }
