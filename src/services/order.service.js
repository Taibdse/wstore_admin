import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';


class OrderService{
    static async getOrders(params){
        const url = APP_ROOT_API + '/order?from=' + params.from + '&to=' + params.to + '&status=' + params.status + '&orderByTime=' + params.orderByTime;
        return axios.get(url);
    }

    static async getOrderDetails(orderId){
      const url = APP_ROOT_API + '/order/details/' + orderId;
      return axios.get(url);
    }

    static async getOrderStatus(){
      const url = APP_ROOT_API + '/order/status/';
      return axios.get(url);
    }

    static async updateOrder(data){
      const url = APP_ROOT_API + '/order/';
      return axios.put(url, data);
    }
}

export default OrderService;