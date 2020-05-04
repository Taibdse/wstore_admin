import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';


class ShippingService{
    static async getShippings(){
        const url = APP_ROOT_API + '/shipping';
        return axios.get(url);
    }

    static async getShippingByType(type){
        const url = APP_ROOT_API + '/shipping/' + type;
        return axios.get(url);   
    }

    static async updateShipping(shipping){
        const url = APP_ROOT_API + '/shipping';
        return axios.put(url, shipping);   
    }
}

export default ShippingService;