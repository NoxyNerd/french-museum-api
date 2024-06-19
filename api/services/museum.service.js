const { MuseumDto } = require('../dto/museum.dto')
const { CategoryDto } = require('../dto/category.dto')
const museumData = require('./../../data/musees-de-france-base-museofile.json')
const { LocationService } = require('./location.service')

class MuseumService {
    constructor() {
        this.data = this.loadData()
        this.locationService = new LocationService()
    }

    loadData() {
        const categories = []
        const museums = []
        let categoryId = 1
        for (let i = 0; i < museumData.length; i++) {
            const museumCategories = museumData[i].themes
            const foundCategories = []
            if (museumCategories != null) {
                const t = museumCategories.split(';')
                for (let j = 0; j < t?.length; j++) {
                    const trimmedCategory = t[j].trim().trim(':').trim()
                    let mainCategory = ''
                    let subCategories = []

                    if (trimmedCategory.indexOf(':') != -1) {
                        mainCategory = trimmedCategory.substr(0, trimmedCategory.indexOf(':')).trim()
                        subCategories = trimmedCategory.substr(trimmedCategory.indexOf(':') + 1).trim()
                    } else {
                        mainCategory = trimmedCategory
                    }

                    const foundCategory = categories.find((elt) => elt.name === mainCategory)
                    if (foundCategory == null) {
                        const category = new CategoryDto({ id: categoryId, name: mainCategory })
                        categories.push(category)
                        categoryId++
                        foundCategories.push(category)
                    } else {
                        foundCategories.push(foundCategory)
                    }
                }
            }
            museums.push(new MuseumDto({ ...museumData[i], categories: foundCategories }))
        }

        return { museums: museums, categories: categories }
    }

    listMuseums(props) {
        let nbOfItemsPerPage = 10
        let firstItem = 0
        let result = this.data.museums

        // Search for museums containing a specific name
        if (props.q) result = result.filter((m) => m.name.toLowerCase().indexOf(props.q.toLowerCase()) != -1)

        // Search for museums within a specific category
        if (props.category) {
            const category = this.getCategory(props.category)
            if (category) result = result.filter((m) => m.categories.indexOf(category) != -1)
        }

        // Sort museums by distance from a point
        if (props.location && props.location.lat != undefined && props.location.lon != undefined) {
            const myLocation = {
                lat: props.location.lat,
                lon: props.location.lon,
            }
            result = result.map((museum) => {
                museum.distance = this.locationService.distance(myLocation, museum.coordinates)
                return museum
            })
            result = result.sort((m1, m2) => m1.distance - m2.distance)
        }

        if (props.page) firstItem = nbOfItemsPerPage * (props.page - 1)

        return result.slice(firstItem, firstItem + nbOfItemsPerPage)
    }

    getMuseum(museumId) {
        return this.data.museums.find((m) => m.id.toString() === museumId.toString())
    }

    listCategories(props) {
        let nbOfItemsPerPage = 10
        let firstItem = 0
        let result = this.data.categories

        if (props.q) result = result.filter((c) => c.name.toLowerCase().indexOf(props.q.toLowerCase()) != -1)

        if (props.page) firstItem = nbOfItemsPerPage * (props.page - 1)

        return result.slice(firstItem, firstItem + nbOfItemsPerPage)
    }

    getCategory(categoryId) {
        return this.data.categories.find((c) => c.id.toString() === categoryId.toString())
    }
}

module.exports = { MuseumService }
