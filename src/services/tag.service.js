import axios from "axios";
import { APP_ROOT_API } from "@/configs/api.js";

const baseUrl = APP_ROOT_API + "/tags";

class TagService {
  static async getFullTags({ keyword, page, size }) {
    const url =
      APP_ROOT_API +
      "/tags/?keyword=" +
      keyword +
      "&page=" +
      page +
      "&size=" +
      size;
    return axios.get(url);
  }

  static async getAllTagsActive() {
    const url = APP_ROOT_API + "/tags/active";
    return axios.get(url);
  }

  static async getTagById(id) {
    const url = APP_ROOT_API + "/tags/id/" + id;
    return axios.get(url);
  }

  static async updateTag(tag) {
    const url = APP_ROOT_API + "/tags";
    return axios.put(url, tag);
  }

  static async insertTag(tag) {
    const url = APP_ROOT_API + "/tags";
    return axios.post(url, tag);
  }
}

export default TagService;
