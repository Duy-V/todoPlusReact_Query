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

  getAll = ({ params, source }: { params: any; source: string }) => {
    let queryString = "";

    if (params.page && params.limit) {
      queryString += `?_limit=${params.limit}&_page=${params.page}&_sort=id&_order=desc`;
    }

    if (params.searchText) {
      if (source === "tagsList") {
        queryString += `?_q=${params.searchText}`;
      } else {
        queryString += `&_q=${params.searchText}`;
      }
    }
    if (params.sortOrder) {
      queryString += `&_sort=${params.sortOrder}`;
    }

    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint + queryString)
      .then((res) => res);
  };

  get = (id: number | string) => {
    console.log(id);
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };
  delete = (id: number | string) => {
    console.log(id);
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
