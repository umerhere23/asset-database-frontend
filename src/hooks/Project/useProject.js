import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { request } from "../../utils/axios-utils";

const createProject = (data) => {
  return request({ url: "/project", method: "POST", data });
};

const getProject = ({ queryKey }) => {
  const [, id] = queryKey;
  return request({ url: `/project/${id}` });
};

const getProjects = () => {
  const memberId = localStorage.getItem("memberId");
  return request({ url: `/project?memberId=${memberId}` });
};

const getAllProjects = () => {
  return request({ url: `/project/getAllProjects` });
};

const deleteProject = (id) => {
  return request({ url: `/project/${id}`, method: "DELETE" });
};

const updateProject = ({ data, projectId }) => {
  return request({ url: `/project/${projectId}`, method: "PATCH", data });
};

const useCreateProject = (onSuccess, onError) => {
  return useMutation(createProject, {
    onSuccess,
    onError,
  });
};

const useDeleteProject = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteProject, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries("projects");
    },
  });
};

const useUpdateProject = (onSuccess, onError) => {
  return useMutation(updateProject, {
    onSuccess,
    onError,
  });
};

const useGetProjects = () => {
  return useQuery("projects", getProjects, {
    refetchOnWindowFocus: false,
  });
};

const useGetAllProjects = () => {
  return useQuery("otherProjects", getAllProjects, {
    refetchOnWindowFocus: false,
  });
};

const useGetProject = (id, onSuccess, onError) => {
  return useQuery(["project", id], getProject, { onSuccess, onError });
};

export {
  useCreateProject,
  useGetProject,
  useUpdateProject,
  useGetProjects,
  useDeleteProject,
  useGetAllProjects,
};
