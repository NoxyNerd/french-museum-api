class CategoryDto {
    constructor({ id, name, parent, children }) {
        this.id = id
        this.name = name
        this.parent = parent ? parent : null
        this.children = children ? children : []
    }

    export() {
        return {
            id: this.id,
            name: this.name,
            /*parent: this.parent,
            children: this.children,*/
        }
    }
}

module.exports = { CategoryDto }
