import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

const baseUrl = APP_ROOT_API + '/promotion-code';

class PromotionCodeService {

    static async search(data) {
        const { searchValue, page, size } = data;
        const url = `${baseUrl}/search?searchValue=${searchValue}&page=${page}&size=${size}`;
        return axios.get(url);
    }

    static async getById(id) {
        const url = `${baseUrl}/id/${id}`;
        return axios.get(url);
    }

    static async getByCode(code) {
        const url = `${baseUrl}/code/${code}`;
        return axios.get(url);
    }

    static async create(promotionCode) {
        const url = `${baseUrl}`;
        return axios.post(url, promotionCode);
    }

    static async update(promotionCode) {
        const url = `${baseUrl}`;
        return axios.put(url, promotionCode);
    }

}

export default PromotionCodeService;