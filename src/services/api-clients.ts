import axios from "axios";

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

  getAll = (currentPage: number) => {
    // getAll = () => {
    return (
      axiosInstance
        .get<FetchResponse<T>>(this.endpoint + `?_limit=4&_page=${currentPage}`)
        // .get<FetchResponse<T>>(this.endpoint)
        .then((res) => res)
    );
  };

  get = (id: number | string) => {
    console.log(id);
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
  delete = (id: number | string) => {
    return axiosInstance.delete<T>(this.endpoint + "/" + id).then((res) => res);
  };
  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
  put = (data: T) => {
    return axiosInstance
      .put<T>(this.endpoint + "/" + `${data?.id}`, data)
      .then((res) => res.data);
  };
}

export default APIClient;
