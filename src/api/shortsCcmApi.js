import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiFetch from '../bundle/axios';
import { CKeys } from '../bundle/constants';

export const useFetchYoutubeCcm = (p, crud = 'r') => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['youtube/ccm', p, crud],
    // get방식일 경우 async인자에 params 인자를 넣어면 안된다.
    queryFn: async () => {
      const response = await apiFetch.get(CKeys.apiFetchUrl.ccm, {
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
  return { data, isLoading, isError, error };
};

export const useSaveYoutubeCcm = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSaveYoutubeCcm, isLoading: isLoadingYoutubeCcm } =
    useMutation({
      mutationFn: async (params) => {
        const response = await apiFetch.post(CKeys.apiFetchUrl.ccm, params);
        return response.data.result;
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: [CKeys.apiQueryKey.ccm],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { mutateSaveYoutubeCcm, isLoadingYoutubeCcm };
};

export const useDeleteYoutubeCcm = () => {
  const QueryClient = useQueryClient();
  const {
    mutate: mutateDeleteYoutubeCcm,
    isLoading: isLoadingDeleteYoutubeCcm,
  } = useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch.post('/youtube/ccm-delete', params);
      return response.data.result;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: [CKeys.apiQueryKey.ccm],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateDeleteYoutubeCcm, isLoadingDeleteYoutubeCcm };
};
