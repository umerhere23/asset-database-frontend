import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "./../../utils/axios-utils";

const getCustodians = () => {
  return request({ url: "/custodian", method: "GET" });
};

const createCustodian = (data) => {
  return request({ url: "/custodian", method: "POST", data });
};

const useGetCustodians = (onSuccess, onError) => {
  return useQuery("custodians", getCustodians, {
    onSuccess,
    onError,
  });
};

const useCreateCustodian = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(createCustodian, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries("custodians");
    },
  });
};

export { useGetCustodians, useCreateCustodian };
