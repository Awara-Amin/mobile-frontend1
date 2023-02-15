import { getAllProductsApi } from "../api";
// console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-11000");
// console.log(getAllProductsApi);

export class ProductData {
  data;

  constructor() {
    this.data = new Map();
  }

  setProduct(id, item) {
    this.data.set(id, item);
  }

  updateProduct(id, options) {
    let product = this.data.get(id);
    if (product) {
      this.data.set(id, {
        ...product,
        ...options,
      });
      return this.data.get(id);
    }
  }

  getProduct(id) {
    return this.data?.get(id);
  }

  getAllProducts() {
    return Array.from(this.data.values());
  }

  removeProducts(id) {
    let product = this.data.get(id);
    if (product) {
      this.data.delete(id);
    }
  }

  async fetchProductData(baseURL) {
    if (this.data.size != 0) {
      return new Promise((resolve, rej) => {
        resolve(this.getAllProducts());
      });
    } else {
      this.data.clear();
      return new Promise((resolve, rej) => {
        getAllProductsApi(baseURL).then((res) => {
          res.forEach((product) => {
            this.setProduct(product.id, product);
          });
          resolve(this.getAllProducts());
        });
      });
    }
  }
}
