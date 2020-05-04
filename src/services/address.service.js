import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

class AddressService {
    static async getProvinces(){
        const url = APP_ROOT_API + '/provinces';
        return axios.get(url);
    }
    static async getDistrictsByProvinceId(provinceId){
        const url = APP_ROOT_API + '/districts/' + provinceId;
        return axios.get(url);
    }

}

export default AddressService;