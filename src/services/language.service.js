import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

const baseUrl = APP_ROOT_API + '/language';

class LanguageService {

    static async getAll(){
        const url = baseUrl
        return axios.get(url);
    }

    static async update(language){
        const url = baseUrl
        return axios.put(url, language);
    }

    static async getPaging({ size, page, keyword}){
        const url = baseUrl + '/admin-search?size=' + size + '&page=' + page + '&keyword=' + keyword;
        return axios.get(url);
    }

}

export default LanguageService;