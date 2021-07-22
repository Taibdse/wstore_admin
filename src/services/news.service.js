import axios from 'axios';
import { APP_ROOT_API } from '../configs/api';

class NewsService {
    static async getNews(page, size) {
        const url = APP_ROOT_API + '/news?page=' + page + '&size=' + size;
        return axios.get(url);
    }

    static async getNewsById(id) {
        const url = APP_ROOT_API + '/news/id/' + id;
        return axios.get(url);
    }

    static async getNewsBySlug(slug) {
        const url = APP_ROOT_API + '/news/slug/' + slug;
        return axios.get(url);
    }

    static async inserNews(review) {
        const url = APP_ROOT_API + '/news';
        return axios.post(url, review);
    }

    static async updateNews(review) {
        const url = APP_ROOT_API + '/news';
        return axios.put(url, review);
    }

    static async saveSortIndexes(data) {
        const url = APP_ROOT_API + "/news/sortIndexes";
        return axios.put(url, data);
    }

}

export default NewsService;