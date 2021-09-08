import axios from "axios";
import { APP_ROOT_API } from "@/configs/api.js";

class ProductService {
  static async getProducts(categorySlug, page, size) {
    const url =
      APP_ROOT_API +
      "/products?categorySlug=" +
      categorySlug +
      "&page=" +
      page +
      "&size=" +
      size;
    return axios.get(url);
  }

  static async getProductDetails(productSlug) {
    const url = APP_ROOT_API + "/products/details/" + productSlug;
    return axios.get(url);
  }

  static async getAllProductActive() {
    const url = APP_ROOT_API + "/products/active/";
    return axios.get(url);
  }

  static async getById(id) {
    const url = APP_ROOT_API + "/products/id/" + id;
    return axios.get(url);
  }

  static async updateProduct(product) {
    const url = APP_ROOT_API + "/products";
    return axios.put(url, product);
  }

  static async insertProduct(product) {
    const url = APP_ROOT_API + "/products";
    return axios.post(url, product);
  }

  static async saveSortIndexes(products) {
    const url = APP_ROOT_API + "/products/sortIndexes";
    return axios.put(url, products);
  }
}

export default ProductService;
