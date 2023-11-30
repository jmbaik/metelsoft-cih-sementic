import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiFetch from '../bundle/axios';

export const useFetchYoutubeSermon = (p) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['youtube/sermon', p],
    // get방식일 경우 async인자에 params 인자를 넣어면 안된다.
    queryFn: async () => {
      const response = await apiFetch.get('/youtube/sermon', {
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

export const useSaveYoutubeSermon = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSaveYoutubeSermon, isLoading: isLoadingYoutubeSermon } =
    useMutation({
      mutationFn: async (params) => {
        const response = await apiFetch.post('/youtube/sermon', params);
        return response.data.result;
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: ['youtube/sermon'],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { mutateSaveYoutubeSermon, isLoadingYoutubeSermon };
};

export const useDeleteYoutubeSermon = () => {
  const QueryClient = useQueryClient();
  const {
    mutate: mutateDeleteYoutubeSermon,
    isLoading: isLoadingDeleteYoutubeSermon,
  } = useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch.post('/youtube/sermon-delete', params);
      return response.data.result;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ['youtube/sermon'],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateDeleteYoutubeSermon, isLoadingDeleteYoutubeSermon };
};
