const fs = require('fs')

class CartConstructor {
    constructor(name) {
        this.name = name;
    }
    async fileInJSON() {
        try {
            const data = await fs.promises.readFile(this.name, "utf-8");
            if (data) {
                return JSON.parse(data);
            } else {
                return []
            }
        }
        catch (error) {
            console.log(error);
            return []
        }
    }
    async fileSaving(item) {
        let dataJSON = JSON.stringify(item);
        await fs.promises.writeFile(this.name, dataJSON);
    }
    async save(item) {
        try {
            let data = await this.getAll()
            if (data.length) {
                let lastIndex = data.length - 1
                let lastId = data[lastIndex].id
                item.id = lastId + 1
                let id = item.id
                data.push(item)
                this.fileSaving(data)
                return id
            } else {
                let newProduct = item;
                this.fileSaving([newProduct])
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAll() {
        try {
            let data = await this.fileInJSON()
            if (data.length) {
                return data
            } else {
                return data = []
            }
        }
        catch (error) {
            console.log(error);
            return []
        }
    }
    async getById(id) {
        try {
            let data = await this.fileInJSON()
            let containerArray
            data.map(el => { el.id === +id && (containerArray = el) })
            return containerArray
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteById(id) {
        try {
            let data = await this.fileInJSON()
            const productIndex = data.findIndex(product => product.id === +id);
            data.splice(productIndex, 1);
            this.fileSaving(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    async getCartProducts(cartId) {
        try {
            const cart = await this.getById(cartId)
            if (cart === undefined) return -1
            const products = cart.products
            return products
        } catch (error) {
            console.log(error.message)
            return []
        }
    }
    async saveProduct(cartId, product) {
        try {
            const carts = await this.getAll()
            const cartIndex = carts.findIndex(cart => cart.id === +(cartId))
            console.log(cartIndex);
            if (cartIndex < 0) {
                return -1
            }
            carts[cartIndex].products.push(product)
            await this.fileSaving(carts)
        } catch (error) {
            console.log(error.message)
        }
    }
    async deleteProduct(cartId, productId) {
        try {
            const carts = await this.getAll();
            const cartIndex = carts.findIndex(cart => cart.id === +(cartId));
            if (cartIndex < 0) return -1;
            if (!carts[cartIndex].products.find(prod => prod.id === +(productId))) return -2;
            const newCarts = carts[cartIndex].products.filter(prod => prod.id !== +(productId));
            carts[cartIndex].products = newCarts;
            await this.fileSaving(carts);
        }
        catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = CartConstructor;