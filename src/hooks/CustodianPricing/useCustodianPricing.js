import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "./../../utils/axios-utils";

const createCustodianPricing = (data) => {
  return request({ url: "/pricing", method: "POST", data });
};

const getCustodianPricing = ({ queryKey }) => {
  const [, id] = queryKey;
  return request({ url: `/pricing/${id}`, method: "GET" });
};

const getCustodianPricings = (onSuccess, onError) => {
  const memberId = localStorage.getItem("memberId");
  return request({ url: `/pricing?memberId=${memberId}` });
};

const getAllCustodianPricings = (onSuccess, onError) => {
  return request({ url: `/pricing/getAllPricing` });
};

const updateCustodianPricing = ({ id, data }) => {
  return request({ url: `/pricing/${id}`, method: "PATCH", data });
};

const deleteCustodianPricing = (id) => {
  return request({ url: `/pricing/${id}`, method: "DELETE" });
};

const useGetPricings = (onSuccess, onError) => {
  return useQuery("pricings", getCustodianPricings, {
    onSuccess,
    onError,
  });
};

const useGetAllPricings = (onSuccess, onError) => {
  return useQuery("otherPricings", getAllCustodianPricings, {
    onSuccess,
    onError,
  });
};

const useGetCustodianPricing = (id, onSuccess, onError) => {
  return useQuery(["pricing", id], getCustodianPricing, { onSuccess, onError });
};

const useUpdateCustodianPricing = (onSuccess, onError) => {
  return useMutation(updateCustodianPricing, {
    onSuccess,
    onError,
  });
};

const useCreateCustodianPricing = (onSuccess, onError) => {
  return useMutation(createCustodianPricing, {
    onSuccess,
    onError,
  });
};

const useDeleteCustodianPricing = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteCustodianPricing, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries("pricings");
    },
  });
};

export {
  useCreateCustodianPricing,
  useGetPricings,
  useGetCustodianPricing,
  useUpdateCustodianPricing,
  useDeleteCustodianPricing,
  useGetAllPricings,
};
