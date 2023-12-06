import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiFetch from '../bundle/axios';
import { CKeys } from '../bundle/constants';

export const useFetchYoutubeFaith = (p, crud = 'r') => {
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['youtube/faith', p, crud],
    // get방식일 경우 async인자에 params 인자를 넣어면 안된다.
    queryFn: async () => {
      const response = await apiFetch.get(CKeys.apiFetchUrl.faith, {
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

export const useSaveYoutubeFaith = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSaveYoutubeFaith, isLoading: isLoadingYoutubeFaith } =
    useMutation({
      mutationFn: async (params) => {
        const response = await apiFetch.post(CKeys.apiFetchUrl.faith, params);
        return response.data.result;
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: [CKeys.apiQueryKey.faith],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { mutateSaveYoutubeFaith, isLoadingYoutubeFaith };
};

export const useDeleteYoutubeFaith = () => {
  const QueryClient = useQueryClient();
  const {
    mutate: mutateDeleteYoutubeFaith,
    isLoading: isLoadingDeleteYoutubeFaith,
  } = useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch.post('/youtube/faith-delete', params);
      return response.data.result;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: [CKeys.apiQueryKey.faith],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateDeleteYoutubeFaith, isLoadingDeleteYoutubeFaith };
};
