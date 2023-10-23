import axios from "axios";
import { useState, useCallback, useRef } from "react";

const axiosInstance = axios.create({
  baseURL: "https://6533e401e1b6f4c590465b63.mockapi.io/api/v1/todolist/",
});

export const useApiHandler = (
  axiosConfig:
    | {
        method: string;
        endpoint: string;
      }
    | ((param: string | number) => {
        method: string;
        endpoint: string;
      })
): any[] => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const controller = useRef<AbortController>();

  const cancelCall = () => {
    controller.current?.abort();
  };
  const apiCall = useCallback(
    async (payload: any) => {
      controller.current?.abort();
      controller.current = new AbortController();
      setLoading(true);
      let axiosSetup;
      if (typeof axiosConfig === "function") {
        const { method, endpoint } = axiosConfig(payload?.params);
        axiosSetup = {
          method: method,
          url: endpoint,
          signal: controller.current.signal,
          data: payload?.data,
        };
      } else {
        axiosSetup = {
          method: axiosConfig.method,
          url: axiosConfig.endpoint,
          signal: controller.current.signal,
          data: payload?.data,
        };
      }

      return axiosInstance(axiosSetup)
        .then((res) => {
          setData(res.data);
          return res;
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.error("Operation canceled");
          } else {
            console.log(error.message);
          }
        })
        .finally(() => setLoading(false));
    },
    [axiosConfig]
  );

  return [apiCall, cancelCall, { data, loading }];
};
