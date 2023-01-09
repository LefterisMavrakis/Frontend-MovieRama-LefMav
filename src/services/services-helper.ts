import { mainApi } from "@/plugins/axios";
import { AxiosError, AxiosResponse } from "axios";

const mainApiGetRequest = (endpoint: string) => {
    return <T>(params: T): Promise<AxiosResponse>  => {
      return new Promise((resolve, reject) => {
        mainApi
          .get(endpoint, {
            params: params
          })
          .then((response: AxiosResponse) => resolve(response))
          .catch((error: AxiosError) => reject(error));
      });
    }
  }

  export {
    mainApiGetRequest
  }