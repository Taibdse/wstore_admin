import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

class WebsiteService{
    static async getLatestWebsiteInfo(){
        const url = APP_ROOT_API + '/website';
        return axios.get(url);
    }


    static async updateWebsiteInfo(data){
      const url = APP_ROOT_API + '/website';
      return axios.put(url, data);
    }
}

export default WebsiteService;