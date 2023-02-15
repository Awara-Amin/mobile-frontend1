import { getAllCategoriesApi } from "../api";

export class CategoryData {
  data;

  constructor() {
    this.data = new Map();
  }

  setCategory(id, item) {
    this.data.set(id, item);
  }
  updateCategory(id, options) {
    let category = this.data.get(id);

    if (category) {
      this.data.set(id, {
        ...category,
        ...options,
      });
      return this.data.get(id);
    }
  }
  getCategory(id) {
    return this.data?.get(id);
  }

  getAllCategories() {
    return Array.from(this.data.values());
  }

  async fetchCategoryData(baseURL) {
    // if (this.data.size != 0) {
    //   return new Promise((resolve, rej) => {
    //     resolve(this.getAllProducts());
    //   });
    // } else {
    //   this.data.clear();
    return new Promise((resolve, rej) => {
      //   console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-4000");
      //   console.log(getAllCategoriesApi);
      getAllCategoriesApi(baseURL).then((res) => {
        res.forEach((category) => {
          this.setCategory(category.id, category);
        });
        resolve(this.getAllCategories());
      });
    });
    // }
  }
}
