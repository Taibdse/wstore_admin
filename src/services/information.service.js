import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

class InformationService{
    static async getLatestInformation(){
        const url = APP_ROOT_API + '/information/latest';
        return axios.get(url);
    }


    static async updateInformation(data){
      const url = APP_ROOT_API + '/information';
      return axios.put(url, data);
    }
}

export default InformationService;