"use client";
import { axiosClient } from "@/service/axios";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";


const useAxiosAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestIntercept = axiosClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user?.staraToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );


    const responseIntercept = axiosClient.interceptors.response.use(
      async (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (401 === error?.response?.status && !prevRequest?.sent) {
          prevRequest.sent = true;
          signOut();
          window.location.replace("/auth/login");
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosClient.interceptors.request.eject(requestIntercept);
      axiosClient.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  return axiosClient;
};

export default useAxiosAuth;