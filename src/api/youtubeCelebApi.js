import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiFetch from '../bundle/axios';

export const useFetchYoutubeCeleb = (p) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['youtube/celeb', p],
    // get방식일 경우 async인자에 params 인자를 넣어면 안된다.
    queryFn: async () => {
      const response = await apiFetch.get('/youtube/celeb', {
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

export const useSaveYoutubeCeleb = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSaveYoutubeCeleb, isLoading: isLoadingYoutubeCeleb } =
    useMutation({
      mutationFn: async (params) => {
        const response = await apiFetch.post('/youtube/celeb', params);
        return response.data.result;
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: ['youtube/celeb'],
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
        queryKey: ['youtube/celeb'],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateDeleteYoutubeCeleb, isLoadingDeleteYoutubeCeleb };
};
