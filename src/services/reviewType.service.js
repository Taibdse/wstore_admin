import axios from "axios";
import { APP_ROOT_API } from "../configs/api";

class ReviewTypeService {
  static async getReviewTypes(isActive) {
    const url = APP_ROOT_API + "/review-type?isActive=" + isActive;
    return axios.get(url);
  }

  static async getReviewTypeById(id) {
    const url = APP_ROOT_API + "/review-type/id/" + id;
    return axios.get(url);
  }

  static async insertReviewType(reviewType) {
    const url = APP_ROOT_API + "/review-type";
    return axios.post(url, reviewType);
  }

  static async updateReviewType(reviewType) {
    const url = APP_ROOT_API + "/review-type";
    return axios.put(url, reviewType);
  }

  static async saveSortIndexes(reviewTypes) {
    const url = APP_ROOT_API + "/review-type/sortIndexes";
    return axios.put(url, reviewTypes);
  }
}

export default ReviewTypeService;
