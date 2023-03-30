import ProductManager from "./manager/productManager.js";

const productManager = new ProductManager("./files/products.json");

async function sendProducts() {
  const product1 = {
    title: "producto prueba 01",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: "25",
  };
  const product2 = {
    title: "producto prueba 02",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "abc124",
    stock: "12",
  };
  const product3 = {
    title: "producto prueba 03",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "abc125",
    stock: "38",
  };
  await productManager.deleteAll();
  await productManager.addProduct(product1);
  await productManager.addProduct(product2);
  await productManager.addProduct(product3);

  console.log("------------------------- Trayendo todos los products -------------------------------");
  await productManager.getProducts()
  .then(allProducts => console.log(allProducts));

  console.log('--------------- Eliminamos el producto elegido con "deleteById" ---------------------');

  await productManager.deleteById(3)
  .then(productsByID => console.log(productsByID));

  console.log('-------------------- Utilizando el método "getProductById" --------------------------');

  await productManager.getProductById(2)
  .then(productsByID => console.log(productsByID));

  console.log('------------- Actualizamos el producto elegido con "updateProduct" ------------------');

  await productManager.updateProduct(2)
  .then(updateByID => console.log(updateByID));
  

  console.log("------------------------- Trayendo todos los products -------------------------------");
  await productManager.getProducts()
  .then(allProducts => console.log(allProducts));
  
};

sendProducts();
