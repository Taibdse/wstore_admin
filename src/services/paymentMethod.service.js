import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

const baseUrl = APP_ROOT_API + '/payment-methods';

class PaymentMethodService {

    static async getAll(){
        const url = baseUrl;
        return axios.get(url);
    }

    static async update(paymentMethod){
        const url = baseUrl;
        return axios.put(url, paymentMethod);
    }

    static async create(paymentMethod){
        const url = baseUrl;
        return axios.post(url, paymentMethod);
    }

    static async getById(id){
        const url = baseUrl + '/' + id;
        return axios.get(url);
    }

}

export default PaymentMethodService;