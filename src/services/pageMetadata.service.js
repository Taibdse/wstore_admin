import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

const baseUrl = `${APP_ROOT_API}/page-metadata`;

class PageMetadataService {
    static async getByProductId(productId){
        const url = `${baseUrl}/productId/${productId}`;
        return axios.get(url);
    }

    static async getByPageType(pageType){
        const url = `${baseUrl}/pageType/${pageType}`;
        return axios.get(url);
    }

    static async save(pageMetadata){
        const url = `${baseUrl}`;
        return axios.put(url, pageMetadata);
    }
}

export default PageMetadataService;