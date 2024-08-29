import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../../utils/axios-utils";

const createPerson = (data) => {
  return request({ url: "/person", method: "POST", data });
};

const getPerson = ({ queryKey }) => {
  const [, id] = queryKey;
  return request({ url: `/person/${id}` });
};

const getPersons = () => {
  const memberId = localStorage.getItem("memberId");
  return request({ url: `/person?memberId=${memberId}` });
};

const getAllPersons = () => {
  return request({ url: `/person/getAllPersons` });
};

const deletePerson = (id) => {
  return request({ url: `/person/${id}`, method: "DELETE" });
};

const updatePerson = ({ data, personId }) => {
  return request({ url: `/person/${personId}`, method: "PATCH", data });
};

const useCreatePerson = (onSuccess, onError) => {
  return useMutation(createPerson, {
    onSuccess,
    onError,
  });
};

const useDeletePerson = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deletePerson, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries("persons");
    },
  });
};

const useUpdatePerson = (onSuccess, onError) => {
  return useMutation(updatePerson, {
    onSuccess,
    onError,
  });
};

const useGetPersons = () => {
  return useQuery("persons", getPersons, {
    refetchOnWindowFocus: false,
  });
};

const useGetAllPersons = () => {
  return useQuery("Otherpersons", getAllPersons, {
    refetchOnWindowFocus: false,
  });
};

const useGetPerson = (id, onSuccess) => {
  return useQuery(["person", id], getPerson, { onSuccess });
};

export {
  useCreatePerson,
  useGetPerson,
  useUpdatePerson,
  useGetPersons,
  useDeletePerson,
  useGetAllPersons,
};
