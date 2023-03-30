import { default as fsWithCallbacks } from "fs";
const fs = fsWithCallbacks.promises;

export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  // Recibo todos los productos
  async getProducts() {
    const read = await fs.readFile(this.path, "utf-8");
    return (this.products = JSON.parse(read));
  }

  // Agrego productos
  async addProduct(product) {
    try {
      let id;
      this.products.length === 0
        ? (id = 1)
        : (id = this.products[this.products.length - 1].id + 1);
      const newProduct = { ...product, id };
      this.products.push(newProduct);
      await fs.writeFile(this.path,JSON.stringify(this.products, null, 2),"utf-8");
      return newProduct.id;
    } catch (error) {
      console.log(error);
    }
  }

  // Recibo un producto en base a su ID
  async getProductById(id_product) {
    try {
      let productById = this.products.find((product) => product.id === id_product);

      if (productById) {
        return productById;
      } else {
        return console.log("No existe producto con ese número de ID");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Elimino un producto en base a su ID
  async deleteById(id_product) {
    try {
      let deleteById = this.products.find((product) => product.id === id_product);
      
      // Buscamos el index de ese objeto y lo eliminamos
      const id = this.products.indexOf(deleteById);
      this.products.splice(id);

      if (deleteById) {
        await fs.writeFile(this.path,JSON.stringify(this.products, null, 2),"utf-8");
        return "Producto eliminado";
      } else {
        return console.log("No existe producto con ese número de ID");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Actualizo un producto en base a su ID
  async updateProduct(id_product) {
    try {
    let updateById = this.products.find((product) => product.id === id_product);
  // Actualizamos el stock
    updateById.stock = "5";
      if (updateById) {
        await fs.writeFile(this.path,JSON.stringify(this.products, null, 2),"utf-8");
        return updateById;
      } else {
        return console.log("No existe producto con ese número de ID");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Borro todos los productos
  async deleteAll() {
    try {
      await fs.writeFile(this.path, JSON.stringify([], null, 2), "utf-8");
    } catch (error) {
      console.log(error);
    }
  }

}