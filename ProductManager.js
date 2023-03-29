import fs from "fs";

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }
  //"./files/products.json"
  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log(`Todos los campos son obligatorios.`);
    }
    let codeExists = this.products.some((producto) => producto.code === code);

    if (codeExists) {
      console.log(
        '--------------------- Filtrando al producto que repite el campo "code" -------------------------'
      );
      return console.log(`El código “${code}” ya está en uso.`);
    } else {
      let id_product = this.getProducts().length;
      let product = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        id: ++id_product,
      };
      this.products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    }

    return this.products;
  }

  getProductById(id_product) {
    let productById = this.products.find(
      (product) => product.id === id_product
    );

    if (productById) {
      return productById;
    } else {
      return console.log("No existe producto con ese número de ID");
    }
  }

  updateProduct(id_product) {
    let updateById = this.products.find((product) => product.id === id_product);
    // Actualizamos el stock
    updateById.stock = "5";

    if (updateById) {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      return updateById;
    } else {
      return console.log("No existe producto con ese número de ID");
    }
  }

  deleteById(id_product) {
    let deleteById = this.products.find((product) => product.id === id_product);
    // Buscamos el index de ese objeto y lo eliminamos
    const index = this.products.indexOf(deleteById);
    this.products.splice(index);

    if (deleteById) {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      return "Procuto eliminado";
    } else {
      return console.log("No existe producto con ese número de ID");
    }
  }
}

const productManager = new ProductManager("./files/products.json");

productManager.addProduct(
  "producto prueba 01",
  "Este es un producto prueba",
  "200",
  "Sin imagen",
  "abc123",
  "25"
);
productManager.addProduct(
  "producto prueba 02",
  "Este es un producto prueba",
  "350",
  "Sin imagen",
  "abc124",
  "40"
);
productManager.addProduct(
  "producto prueba 03",
  "Este es un producto prueba",
  "350",
  "Sin imagen",
  "abc125",
  "80"
);
console.log(
  "--------------------- Trayendo todos los products que aprueban todas las condiciones -------------------------"
);

console.log(productManager);

console.log(
  '----------------------------------- Utilizando el método "getProductById" ------------------------------------'
);

console.log(productManager.getProductById(2));

console.log('--------------------------------- Actualizamos el stock con "updateProduct" ----------------------------------');

console.log(productManager.updateProduct(2));

console.log('---------------------- Volvemos a traer todos los productos para confirmar el cambio -------------------------');

console.log(productManager);

console.log('------------------------------- Eliminamos el producto elegido con "deleteById" ------------------------------');

console.log(productManager.deleteById(3));

console.log('---------------------- Volvemos a traer todos los productos para confirmar el cambio -------------------------');

console.log(productManager);
