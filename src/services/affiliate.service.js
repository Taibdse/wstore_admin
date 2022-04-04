import axios from "axios";
import { APP_ROOT_API } from "@/configs/api.js";

class AffiliateService {
  static async getAffiliates(isActive) {
    const url = APP_ROOT_API + "/affiliates?isActive=" + isActive;
    return axios.get(url);
  }

  static async getAffiliateById(id) {
    const url = APP_ROOT_API + "/affiliates/id/" + id;
    return axios.get(url);
  }

  static async insertAffiliate(affiliate) {
    const url = APP_ROOT_API + "/affiliates";
    return axios.post(url, affiliate);
  }

  static async updateAffiliate(affiliate) {
    const url = APP_ROOT_API + "/affiliates";
    return axios.put(url, affiliate);
  }
}

export default AffiliateService;
