import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiFetch from '../bundle/axios';
import { CKeys } from '../bundle/constants';

export const useFetchYoutubeCeleb = (p, crud = 'r') => {
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: [CKeys.apiQueryKey.celeb, p, crud],
    // get방식일 경우 async인자에 params 인자를 넣어면 안된다.
    queryFn: async () => {
      const response = await apiFetch.get(CKeys.apiFetchUrl.celeb, {
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

export const useSaveYoutubeCeleb = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSaveYoutubeCeleb, isLoading: isLoadingYoutubeCeleb } =
    useMutation({
      mutationFn: async (params) => {
        const response = await apiFetch.post(CKeys.apiFetchUrl.celeb, params);
        return response.data.result;
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: [CKeys.apiQueryKey.celeb],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { mutateSaveYoutubeCeleb, isLoadingYoutubeCeleb };
};

export const useDeleteYoutubeCeleb = () => {
  const QueryClient = useQueryClient();
  const {
    mutate: mutateDeleteYoutubeCeleb,
    isLoading: isLoadingDeleteYoutubeCeleb,
  } = useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch.post('/youtube/celeb-delete', params);
      return response.data.result;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: [CKeys.apiQueryKey.celeb],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateDeleteYoutubeCeleb, isLoadingDeleteYoutubeCeleb };
};
