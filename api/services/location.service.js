class LocationService {
    constructor() {}

    // See: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
    distance(point1, point2) {
        if (point1.lat == point2.lat && point1.lon == point2.lon) {
            return 0
        } else {
            var radlat1 = (Math.PI * point1.lat) / 180
            var radlat2 = (Math.PI * point2.lat) / 180
            var theta = point1.lon - point2.lon
            var radtheta = (Math.PI * theta) / 180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
            if (dist > 1) {
                dist = 1
            }
            dist = Math.acos(dist)
            dist = (dist * 180) / Math.PI

            // Dist in miles
            dist = dist * 60 * 1.1515

            // Convert in kilometers
            dist = dist * 1.609344
            return dist
        }
    }
}

module.exports = { LocationService }
