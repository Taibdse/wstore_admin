import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

class AuthService{
    static async loginAdmin(user){
        const url = APP_ROOT_API + '/auth/login';
        return axios.post(url, user);
    }

    static async changePasswordAdmin(user){
        const url = APP_ROOT_API + '/auth/change-password';
        return axios.post(url, user);
    }

    static async logoutAdmin(user){
        const url = APP_ROOT_API + '/auth/logout';
        return axios.post(url, user);
    }

    static async getCurrentUser(){
        const url = APP_ROOT_API + '/auth/current';
        return axios.get(url);
    }

    static async testAuthorization(){
        const url = APP_ROOT_API + '/auth/test-authorization'; 
        return axios.get(url);
    }
  
}

export default AuthService;