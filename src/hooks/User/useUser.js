import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "./../../utils/axios-utils";

const getUsers = () => {
  return request({ url: "/users?limit=500", method: "GET" });
};

const createUser = (data) => {
  return request({ url: "/users", method: "POST", data });
};

const updateUser = ({ id, data }) => {
  return request({ url: `/users/${id}`, method: "PATCH", data });
};

const getUser = ({ queryKey }) => {
  const [, id] = queryKey;
  return request({ url: `/users/${id}` });
};

const useGetUsers = (onSuccess, onError) => {
  //   const queryClient = useQueryClient();
  return useQuery("users", getUsers, {
    onSuccess,
    onError,
    // onSettled: () => queryClient.invalidateQueries("users"),
  });
};

const useCreateUser = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation("user", createUser, {
    onSuccess,
    onError,
    onSettled: () => queryClient.invalidateQueries("users"),
  });
};

const useUpdateUser = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation("user", updateUser, {
    onSuccess,
    onError,
    onSettled: () => queryClient.invalidateQueries("users"),
  });
};

const useGetUser = (id, onSuccess, onError) => {
  return useQuery(["user", id], getUser, { onSuccess, onError });
};

export { useGetUsers, useCreateUser, useGetUser, useUpdateUser };
