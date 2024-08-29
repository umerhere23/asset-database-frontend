import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { request } from "../../utils/axios-utils";

const createProduct = (data) => {
  return request({ url: "/product", method: "POST", data });
};

const getProduct = ({ queryKey }) => {
  const [, id] = queryKey;
  return request({ url: `/product/${id}` });
};
const getProducts = () => {
  const memberId = localStorage.getItem("memberId");
  return request({ url: `/product?memberId=${memberId}` });
};

const getOtherProducts = () => {
  return request({ url: `/product/getAllProducts` });
};

const deleteProduct = (id) => {
  return request({ url: `/product/${id}`, method: "DELETE" });
};

const updateProduct = ({ data, productId }) => {
  return request({ url: `/product/${productId}`, method: "PATCH", data });
};

const useCreateProduct = (onSuccess, onError) => {
  return useMutation(createProduct, {
    onSuccess,
    onError,
  });
};

const useDeleteProduct = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries("products");
    },
  });
};

const useUpdateProduct = (onSuccess, onError) => {
  return useMutation(updateProduct, {
    onSuccess,
    onError,
  });
};

const useGetProducts = () => {
  return useQuery("products", getProducts, {
    refetchOnWindowFocus: false,
  });
};

const useGetOtherProducts = () => {
  return useQuery("Otherproducts", getOtherProducts, {
    refetchOnWindowFocus: false,
  });
};

const useGetProduct = (id, onSuccess) => {
  return useQuery(["product", id], getProduct, { onSuccess });
};

export {
  useCreateProduct,
  useGetProduct,
  useUpdateProduct,
  useGetProducts,
  useDeleteProduct,
  useGetOtherProducts,
};
