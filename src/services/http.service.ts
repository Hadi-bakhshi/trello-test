import axios from 'axios';
import { API_BASE_URL } from 'configs';

class HttpService {
  constructor() {
    axios.defaults.baseURL = API_BASE_URL;
  }

  get(url: string, config?: any) {
    return axios.get(url, config);
  }

  post(url: string, data?: any, config?: any) {
    return axios.post(url, data, config);
  }

  put(url: string, data?: any, config?: any) {
    return axios.put(url, data, config);
  }

  patch(url: string, data?: any, config?: any) {
    return axios.patch(url, data, config);
  }

  delete(url: string, config?: any) {
    return axios.delete(url, config);
  }
}

export default new HttpService();