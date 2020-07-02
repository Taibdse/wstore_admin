import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

class LanguageService {
    static async getAll(){
        const url = APP_ROOT_API + '/language';
        return axios.get(url);
    }
    static async update(language){
        const url = APP_ROOT_API + '/language';
        return axios.put(url, language);
    }

    static async getPaging({ size, page, keyword}){
        const url = APP_ROOT_API + '/language/admin-search?size=' + size + '&page=' + page + '&keyword=' + keyword;
        return axios.get(url);
    }

}

export default LanguageService;