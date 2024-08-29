import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { request } from "../../utils/axios-utils";

const createSpeciality = (data) => {
  return request({ url: "/speciality", method: "POST", data });
};

const getSpeciality = ({ queryKey }) => {
  const [, id] = queryKey;
  return request({ url: `/speciality/${id}` });
};

const getSpecialities = () => {
  return request({ url: `/speciality` });
};

const deleteSpeciality = (id) => {
  return request({ url: `/speciality/${id}`, method: "DELETE" });
};

const updateSpeciality = ({ data, specialityId }) => {
  return request({
    url: `/speciality/${specialityId}`,
    method: "PATCH",
    data,
  });
};

const useCreateSpeciality = (onSuccess, onError) => {
  return useMutation(createSpeciality, {
    onSuccess,
    onError,
  });
};

const useDeleteSpeciality = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteSpeciality, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries("specialities");
    },
  });
};

const useUpdateSpeciality = (onSuccess, onError) => {
  return useMutation(updateSpeciality, {
    onSuccess,
    onError,
  });
};

const useGetSpecialities = () => {
  return useQuery("specialities", getSpecialities, {
    refetchOnWindowFocus: false,
  });
};

const useGetSpeciality = (id, onSuccess, onError) => {
  return useQuery(["speciality", id], getSpeciality, {
    onSuccess,
    onError,
  });
};

export {
  useCreateSpeciality,
  useGetSpeciality,
  useUpdateSpeciality,
  useGetSpecialities,
  useDeleteSpeciality,
};
