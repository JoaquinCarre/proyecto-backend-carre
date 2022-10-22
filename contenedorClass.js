const fs = require('fs');

class Contenedor {
    constructor(fileJSON) {
        this.fileJSON = fileJSON;
    }

    async getAll() {
        try {
            const products = await fs.promises.readFile(this.fileJSON, 'utf-8')
            return await JSON.parse(products)
        } catch (error) {
            console.log('No es posible obtener los productos de la base de datos', error);
        }
    }

    async getByID(id) {
        try {
            const products = await this.getAll();
            const oneProduct = await products.filter((el) => el.id == id)
            return oneProduct
        } catch (error) {
            console.log('No se puede obtener el producto solicitado', error);
        }
    }

    async addProduct(product) {
        try {
            const products = await this.getAll();
            const { title, description, price, thumbnail, stock } = product
            if (title && description && price && thumbnail && stock) {
                const code = Math.random().toString(36).slice(1, 7)
                const id = products.length + 1
                const date = new Date();
                const newProduct = { ...product, code, id, timestamp: date }
                await products.push(newProduct)
                await fs.promises.writeFile(this.fileJSON,JSON.stringify(products))
                const productsTemplate = await products
                const data = {
                    productsTemplate,
                    isEmpty: false,
                    isAdmin: true,
                    status: 200
                }
                return data
            } else {
                const data = {
                    isEmpty: true,
                    message: "No es posible subir el producto, faltan datos",
                    status: 500
                }
                return data
            }
        } catch (error) {
            console.log('No es posible guardar el articulo', error);
        }
    }
    /*    
    async updateById(numId,newProd){
        try{
            const data = await this.getAll();
            const prod = data.find((x) => x.id == numId);
            const index = data.indexOf(prod);
            if (prod){
                let [id,timestamp,codigo] = [parseInt(numId),data[index].timestamp,data[index].codigo]
                data[index] = {...newProd,timestamp:timestamp,codigo:codigo,id:id}
                await fs.promises.writeFile(this.fileJSON,JSON.stringify(data))
                return data[index]
      fileJSON      }else{
                return null
            }
        } catch (error){
            console.log('Hubo un error al actualizar el producto seleccionado',error);
        }
    }
    async deleteById(numId){
        try {
            const data = await this.getAll();
            let res = data.find(x => x.id == numId);
            if(res === undefined){
                return null
            }else{
                let newData = data.filter((item) => item.id != numId);
                const dataJsonFinal=JSON.stringify(newData);
                await fs.promises.writeFile(this.fileJSON,dataJsonFinal)
                return newData
            }
        } catch (error) {
            console.log('Hubo un error al borrar el articulo seleccionado',error);
        }
    }
    async createCart(newCart){
        try{
            const data = await this.getAll();
            let id;
            data.length === 0
            ? id = 1
            : id = data[data.length-1].id+1
            data.push({...newCart,id,productos:[]})
            await fs.promises.writeFile(this.fileJSON,JSON.stringify(data))
            return id
        }catch(error){
            console.log('Hubo un error al crear el carrito',error);
        }
    }
    async deleteCart(numId){
        try {
            const data = await this.getAll();
            let res = data.find(x => x.id == numId);
            if(res === undefined){
                return null
            }else{
                let newData = data.filter((item) => item.id != numId);
                const dataJsonFinal=JSON.stringify(newData);
                await fs.promises.writeFile(this.fileJSON,dataJsonFinal)
                return newData
            }
        } catch (error) {
            console.log('Hubo un error al borrar el carrito seleccionado',error);
        }
    }
    async addCart(numId,prod){
        try {
            let idt = parseInt(numId);
            const data = await this.getAll();
            let cart = data.find((x) => x.id == idt);
            let index = data.indexOf(cart);
            if (cart !== undefined){
                let locate = data[index].productos.find(i => i.id == prod.id);
                let idx = data[index].productos.indexOf(locate);
                if (locate){
                    data[index].productos[idx].qty++;
                    await fs.promises.writeFile(this.fileJSON,JSON.stringify(data));
                    return data
                }else{
                    prod.qty = 1;
                    data[index].productos.push(prod)
                    await fs.promises.writeFile(this.fileJSON,JSON.stringify(data));
                    return data
                }
            }else{
                return null
            }
        } catch (error) {
            console.log('Hubo un error al añadir el articulo al carrito',error);
        }
    }
    async delProdById(numId,prodId){
        try {
            let idt = parseInt(numId);
            let idp = parseInt(prodId);
            const data = await this.getAll();
            let cart = data.find((x) => x.id == idt);
            let index = data.indexOf(cart);
            if (cart !== undefined){
                let locate = data[index].productos.find(i => i.id == idp);
                let idx = data[index].productos.indexOf(locate);
                if (locate){
                    if (data[index].productos[idx].qty > 1){
                            data[index].productos[idx].qty--;
                            await fs.promises.writeFile(this.fileJSON,JSON.stringify(data));
                            return data
                } else if(data[index].productos[idx].qty == 1){
                            let newData = data.map(i => (i.productos = i.productos.filter(({ id }) => id != idp), i))
                            await fs.promises.writeFile(this.fileJSON,JSON.stringify(newData));
                            return newData
                } else if(data[index].productos[idx].qty){
                            return 3
                }
                } else {
                    return 2
                }
            }else{
                return 1
            }
        } catch (error) {
            console.log('Hubo un error al borrar el articulo del carrito',error);
        }
    } */
}

module.exports = Contenedor;