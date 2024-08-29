import { useMutation } from "react-query";
import { request } from "./../../utils/axios-utils";

const register = (data) => {
  return request({ url: "/auth/register", method: "post", data });
};

const login = (data) => {
  return request({ url: "/auth/login", method: "post", data });
};

export const useRegister = (onSuccess, onError) => {
  return useMutation(register, {
    onSuccess,
    onError,
  });
};

export const useLogin = (onSuccess, onError) => {
  return useMutation(login, {
    onSuccess,
    onError,
  });
};
