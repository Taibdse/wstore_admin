import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

const baseUrl = `${APP_ROOT_API}/configuration`;

class ConfigurationService{
    static async getMinPriceForFreeship(){
        const url = `${baseUrl}/minPriceForFreeship`;
        return axios.get(url);
    }
}

export default ConfigurationService;