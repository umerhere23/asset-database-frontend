import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { request } from "../../utils/axios-utils";

const createCustodianBank = (data) => {
  return request({ url: "/custodian", method: "POST", data });
};

const getCustodianBank = ({ queryKey }) => {
  const [, id] = queryKey;
  return request({ url: `/custodian/${id}` });
};

const getCustodianBanks = () => {
  return request({ url: `/custodian` });
};

const deleteCustodianBank = (id) => {
  return request({ url: `/custodian/${id}`, method: "DELETE" });
};

const updateCustodianBank = ({ data, custodianBankId }) => {
  return request({
    url: `/custodian/${custodianBankId}`,
    method: "PATCH",
    data,
  });
};

const useCreateCustodianBank = (onSuccess, onError) => {
  return useMutation(createCustodianBank, {
    onSuccess,
    onError,
  });
};

const useDeleteCustodianBank = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteCustodianBank, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries("custodianBanks");
    },
  });
};

const useUpdateCustodianBank = (onSuccess, onError) => {
  return useMutation(updateCustodianBank, {
    onSuccess,
    onError,
  });
};

const useGetCustodianBanks = () => {
  return useQuery("custodianBanks", getCustodianBanks, {
    refetchOnWindowFocus: false,
  });
};

const useGetCustodianBank = (id, onSuccess, onError) => {
  return useQuery(["custodianBank", id], getCustodianBank, {
    onSuccess,
    onError,
  });
};

export {
  useCreateCustodianBank,
  useGetCustodianBank,
  useUpdateCustodianBank,
  useGetCustodianBanks,
  useDeleteCustodianBank,
};
