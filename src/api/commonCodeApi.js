import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import apiFetch from '../bundle/axios';

export const useFetchAreaCode = () => {
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['common-code/area-code-list'],
    queryFn: async () => {
      const response = await apiFetch.get('/common-code/area-code');
      return response.data.result;
    },
    keepPreviousData: true,
  });
  return { data, isLoading, isError, error, refetch };
};

export const useFetchChurchCode = () => {
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['common-code/church-code-list'],
    queryFn: async () => {
      const response = await apiFetch.get('/common-code/church-code');
      return response.data.result;
    },
    keepPreviousData: true,
  });
  return { data, isLoading, isError, error, refetch };
};

export const useSaveChurchCode = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSaveChurch, isLoading: saveChurchLoading } =
    useMutation({
      mutationFn: async (params) => {
        console.log('churchcode useSaveChurchCode', params);
        let response = {};
        if (params?.churchCode) {
          response = await apiFetch.put('/common-code/church-code', params);
          return response.data.result;
        } else {
          response = await apiFetch.post('/common-code/church-code', params);
          return response.data.result;
        }
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: ['common-code/church-code-list'],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { mutateSaveChurch, saveChurchLoading };
};

export const useFetchPastor = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['common-code/pastor'],
    queryFn: async () => {
      const response = await apiFetch.get('/common-code/pastor');
      return response.data.result;
    },
    keepPreviousData: true,
  });
  return { data, isLoading, isError, error };
};

export const useSavePastor = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSavePastor, isLoading: savePastorLoading } =
    useMutation({
      mutationFn: async (params) => {
        console.log('pastor useSavePastor', params);
        let response = {};
        if (params?.pastorCode) {
          response = await apiFetch.put('/common-code/pastor', params);
          return response.data.result;
        } else {
          response = await apiFetch.post('/common-code/pastor', params);
          return response.data.result;
        }
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: ['common-code/pastor'],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { mutateSavePastor, savePastorLoading };
};
