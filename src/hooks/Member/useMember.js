import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../../utils/axios-utils";

const createMember = (data) => {
  return request({ url: "/member", method: "POST", data });
};

const getMemberByUserId = () => {
  return request({ url: `/member/user` });
};

const updateMember = ({ data, memberId }) => {
  return request({ url: `/member/${memberId}`, method: "PATCH", data });
};

const getMembers = () => {
  return request({ url: "/member", method: "GET" });
};

const getMemberById = ({ queryKey }) => {
  const [, id] = queryKey;
  return request({ url: `/member/${id}`, method: "GET" });
};

const useCreateMember = (data) => {
  const queryClient = useQueryClient();
  return useMutation(createMember, {
    onSuccess: () => {
      queryClient.invalidateQueries("member");
    },
  });
};

const useUpdateMember = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateMember, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries("member");
    },
  });
};

const useGetMembers = (onSuccess, onError) => {
  return useQuery("members", getMembers);
};

const useGetMember = (onSuccess, onError) => {
  return useQuery("member", getMemberByUserId, {
    onSuccess,
    onError,
  });
};

const useGetMemberById = (id, onSuccess, onError) => {
  return useQuery(["member", id], getMemberById);
};

export {
  useCreateMember,
  useGetMember,
  useUpdateMember,
  useGetMembers,
  useGetMemberById,
};
