import axios, { AxiosRequestConfig } from "axios";
import { Todo } from "../hooks/useTodos";

export interface FetchResponse<T> {
  results: T[];
}
export interface newTodo {
  content: string;
  name: string;
  status: boolean;
  deadline: string;
  tags: string[];
}
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig | any) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res);
  };

  // ?_page=2&_limit=7
  get = (id: number | string) => {
    return axiosInstance.get<T>(this.endpoint + "/" + id).then((res) => res);
  };
  delete = (id: number | string) => {
    return axiosInstance.delete<T>(this.endpoint + "/" + id).then((res) => res);
  };
  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
  put = (data: T) => {
    return axiosInstance.put<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default APIClient;
