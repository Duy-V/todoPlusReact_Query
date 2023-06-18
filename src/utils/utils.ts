import axios, { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

export const useQueryString = () => {
  const [searchParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries([...searchParams]);
  console.log(searchParamsObject);
  return searchParamsObject;
};

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}
