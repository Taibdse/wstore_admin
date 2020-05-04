import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

class CategoryService{
    static async getCategories(isActive){
        const url = APP_ROOT_API + '/categories?isActive=' + isActive;
        return axios.get(url);
    }

    static async getCategoryBySlug(slug){
        const url = APP_ROOT_API + '/categories/slug/' + slug;
        return axios.get(url);
    }

    static async getCategoryById(id){
        const url = APP_ROOT_API + '/categories/id/' + id;
        return axios.get(url);
    }

    static async insertCategory(category){
        const url = APP_ROOT_API + '/categories';
        return axios.post(url, category)
    }

    static async updateCategory(category){
        const url = APP_ROOT_API + '/categories';
        return axios.put(url, category)
    }
}

export default CategoryService;