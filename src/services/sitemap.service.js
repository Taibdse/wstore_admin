import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

class SitemapService{
    static async update(){
        const url = APP_ROOT_API + '/sitemap';
        return axios.put(url);
    }
}

export default SitemapService;