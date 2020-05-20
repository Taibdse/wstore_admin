import axios from 'axios';
import { APP_ROOT_API } from '../configs/api';


class TipService{
    static async getTips(page, size){
        const url = APP_ROOT_API + '/tips?page=' + page + '&size=' + size;
        return axios.get(url);
    }

    static async getTipById(id){
        const url = APP_ROOT_API + '/tips/id/' + id;
        return axios.get(url);
    }

    static async getTipBySlug(slug){
        const url = APP_ROOT_API + '/tips/slug/' + slug;
        return axios.get(url);
    }

    static async insertTip(tip){
        const url = APP_ROOT_API + '/tips';
        return axios.post(url, tip);
    }

    static async updateTip(tip){
        const url = APP_ROOT_API + '/tips';
        return axios.put(url, tip);
    }
}

export default TipService;