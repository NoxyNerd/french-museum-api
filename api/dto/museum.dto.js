class MuseumDto {
    constructor({
        identifiant,
        nom_officiel,
        coordonnees,
        url,
        adresse,
        code_postal,
        ville,
        departement,
        telephone,
        histoire,
        atout,
        interet,
        categories,
        distance,
    }) {
        this.id = identifiant
        this.name = nom_officiel ? nom_officiel : ''
        this.address = {
            line1: adresse ? adresse : '',
            line2: '',
            postal_code: code_postal ? code_postal : '',
            city: ville ? ville : '',
            state: departement ? departement : '',
            country: 'France',
        }
        this.phoneNumber = telephone ? telephone : ''
        this.website = url ? url : ''
        this.coordinates = coordonnees ? coordonnees : null
        this.history = histoire ? histoire : null
        this.is_remarkable_for = atout ? atout : null
        this.interest = interet ? interet : null
        this.categories = categories ? categories : []
        this.distance = distance ? distance : null
    }

    export() {
        return {
            id: this.id,
            name: this.name,
            history: this.history,
            is_remarkable_for: this.is_remarkable_for,
            interest: this.interest,
            address: this.address,
            phoneNumber: this.phoneNumber,
            website: this.website,
            coordinates: this.coordinates,
            categories: this.categories?.map((c) => c.export()),
            distance: this.distance,
        }
    }
}

module.exports = { MuseumDto }
