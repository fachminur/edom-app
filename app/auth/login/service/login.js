import { axiosClient } from "@/service/axios";

export function loginService(values) {
  return axiosClient.post('/auth/login', values);
}