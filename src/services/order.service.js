import axios from 'axios';
import { APP_ROOT_API } from '@/configs/api.js';

const baseUrl = `${APP_ROOT_API}/order`;

class OrderService {
  static async getOrders(params) {
    const { from, to, status, orderByTime, keyword, size, page } = params;
    // const url = APP_ROOT_API + '/order?from=' + params.from + '&to=' + params.to + '&status=' + params.status + '&orderByTime=' + params.orderByTime + '&keyword=' + params.keyword;
    const url = `${baseUrl}?from=${from}&to=${to}&status=${status}&orderByTime=${orderByTime}&keyword=${keyword}&page=${page}&size=${size}`;
    return axios.get(url);
  }

  static async getOrderDetails(orderId) {
    const url = baseUrl + '/details/' + orderId;
    return axios.get(url);
  }

  static async getOrderStatus() {
    const url = baseUrl + '/status/';
    return axios.get(url);
  }

  static async updateOrder(data) {
    const url = baseUrl;
    return axios.put(url, data);
  }
}

export default OrderService;