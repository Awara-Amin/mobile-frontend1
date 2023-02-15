import { getAllCouponsApi } from "../api";

export class CouponData {
  data;

  constructor() {
    this.data = new Map();
  }
  setCoupon(id, item) {
    this.data.set(id, item);
  }
  updateCoupon(id, options) {
    let coupon = this.data.get(id);
    if (coupon) {
      this.data.set(id, {
        ...coupon,
        ...options,
      });
      return this.data.get(id);
    }
  }

  getCoupon(id) {
    return this.data.get(id);
  }

  getAllCoupons() {
    return Array.from(this.data.values());
  }

  async fetchCouponData(baseURL) {
    return new Promise((resolve, rej) => {
      getAllCouponsApi(baseURL).then((res) => {
        // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk-5000");
        // console.log(res);
        res.forEach((coupon) => {
          this.setCoupon(coupon.id, coupon);
        });
        resolve(this.getAllCoupons());
      });
    });
  }
}
