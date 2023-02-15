import axios from "axios";

//
export class OrderData {
  data;

  constructor() {
    this.data = new Map();
  }

  setOrder(id, item) {
    this.data.set(id, item);
  }

  updateOrder(id, options) {
    let order = this.data.get(id);

    if (order) {
      this.data.set(id, {
        ...order,
        ...options,
      });
    }
  }
  getOrder(id) {
    this.data.get(id);
  }
  getAllOrders() {
    return Array.from(this.data.values());
  }

  //   see why async is here!
  async postOrderData(url, order, discountToBackend) {
    return new Promise((resolve, rej) => {
      //   console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-9000");
      axios.post(url, { order, discountToBackend }).then((res) => {
        // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-10000");
        // console.log(res);
        resolve(res.data);
      });
    });
  }
}
