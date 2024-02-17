import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiFetch from '../bundle/axios';
import { CKeys } from '../bundle/constants';

export const useFetchYoutubeMercy = (p, crud = 'r') => {
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: [CKeys.apiQueryKey.mercy, p, crud],
    // get방식일 경우 async인자에 params 인자를 넣어면 안된다.
    queryFn: async () => {
      const response = await apiFetch.get(CKeys.apiFetchUrl.mercy, {
        params: {
          options: p.options,
          keyword: p.keyword,
        },
      });
      return response.data.result;
    },
    keepPreviousData: true,
    enabled: !!p,
  });
  return { data, isLoading, isError, error, refetch };
};

export const useSaveYoutubeMercy = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSaveYoutubeMercy, isLoading: isLoadingYoutubeMercy } =
    useMutation({
      mutationFn: async (params) => {
        const response = await apiFetch.post(CKeys.apiFetchUrl.mercy, params);
        return response.data.result;
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: [CKeys.apiQueryKey.mercy],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { mutateSaveYoutubeMercy, isLoadingYoutubeMercy };
};

export const useDeleteYoutubeMercy = () => {
  const QueryClient = useQueryClient();
  const {
    mutate: mutateDeleteYoutubeMercy,
    isLoading: isLoadingDeleteYoutubeMercy,
  } = useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch.post('/youtube/mercy-delete', params);
      return response.data.result;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: [CKeys.apiQueryKey.mercy],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateDeleteYoutubeMercy, isLoadingDeleteYoutubeMercy };
};
