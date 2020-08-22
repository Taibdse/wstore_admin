import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

const baseUrl = APP_ROOT_API + '/customer';

class CustomerService{
    static async getCustomerInfoList({ email, phone, size, page }){
        const url = `${baseUrl}?email=${email}&phone=${phone}&size=${size}&page=${page}`;
        return axios.get(url);
    }

    static async exportCustomerInfoListToExcel({ email, phone }){
        const url = `${baseUrl}/export/excel?email=${email}&phone=${phone}`;
        return axios.get(url, { responseType: 'blob' });
    }
}

export default CustomerService;