import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";

const mainApi = axios.create({
  withCredentials: false,
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 1000 * 180,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default {
  install: (app: App): void => {
    app.config.globalProperties.$mainApi = mainApi;
    const handleResponse = (response: AxiosResponse) => {
      return response;
    };

    const handleError = (err: AxiosResponse) => {
      throw err;
    };
    mainApi.interceptors.response.use(handleResponse, handleError);
    axios.interceptors.response.use(handleResponse, handleError);
    // axios
  },
};

export { mainApi, axios };
