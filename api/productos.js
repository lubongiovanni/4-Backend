const fs = require('fs');

const productos = require ('../express.json')

class ProductosApi {
    constructor() {
        this.productos = []
        this.id = 0
    }

    //MÉTODO: Escribe/sobreescribe
    async write() { 
        await fs.promises.writeFile(productos, JSON.stringify(this.productos,null,2)) // null y 2 son parámetros para que en el archivo txt se vean bien ordenados según sandría, espacios, saltos de línea, etc.
    }

    listar(id) {
        let result
        if (this.productos !== []) {
            result = this.productos.find(x => x.id === id)
            if (result === undefined) {
                result = 'Producto no encontrado'
            }
        } else {
            result = 'El archivo está vacío'
        }
        return result
    }

    listarAll() {
        if (this.productos.length<1){
            return false;
        }
        return this.productos;
    }

    guardar(prod) {
        this.id++ //Va guardando cada elemento con un ID nuevo
        prod["id"] = this.id //Agrego la propiedad ID al objeto pasado como parámetro
        this.productos.push(prod) //Agrego el objeto al contenido(array)
        this.write() //Agrego el objeto al archivo 
    }

    actualizar(prod, id) { //Prod: Producto nuevo y id: Producto a reemplazar
        prodReemp = this.productos.find(x => x.id === id)
        if (prodReemp.id === id){
            prodReemp.title = prod.title,
            prodReemp.price = prod.price,
            prodReemp.thumbnail = prod.thumbnail
        }
        return prodReemp;
    }

    borrar(id) {
        let result
        if (this.productos.length >= 1) {
            let newproducto = this.productos.filter(x => x.id !== id)
            this.productos = newproducto
            this.write() //Sobreescribo el archivo
            result = 'Producto borrado'
        } else {
            result = `El archivo está vacío`
        }
        return result
    }
}

module.exports = ProductosApi;