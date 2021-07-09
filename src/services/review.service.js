import axios from "axios";
import { APP_ROOT_API } from "../configs/api";

class ReviewService {
  static async getReviews(page, size, reviewType) {
    const url =
      APP_ROOT_API +
      "/reviews?page=" +
      page +
      "&size=" +
      size +
      "&reviewType=" +
      reviewType;
    return axios.get(url);
  }

  static async getReviewById(id) {
    const url = APP_ROOT_API + "/reviews/id/" + id;
    return axios.get(url);
  }

  static async getReviewBySlug(slug) {
    const url = APP_ROOT_API + "/reviews/slug/" + slug;
    return axios.get(url);
  }

  static async getById(id) {
    const url = APP_ROOT_API + "/reviews/id/" + id;
    return axios.get(url);
  }

  static async insertReview(review) {
    const url = APP_ROOT_API + "/reviews";
    return axios.post(url, review);
  }

  static async updateReview(review) {
    const url = APP_ROOT_API + "/reviews";
    return axios.put(url, review);
  }

  static async saveSortIndexes(reviews) {
    const url = APP_ROOT_API + "/reviews/sortIndexes";
    return axios.put(url, reviews);
  }

  static async getReviewType() {
    const url = APP_ROOT_API + "/reviews/reviewType";
    return axios.get(url);
  }
}

export default ReviewService;
