import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

class PolicyService{
    static async getPolicyByType(type){
        const url = APP_ROOT_API + '/policies?type=' + type;
        return axios.get(url);
    }


    static async updatePolicy(data){
      const url = APP_ROOT_API + '/policies';
      return axios.put(url, data);
    }
}

export default PolicyService;