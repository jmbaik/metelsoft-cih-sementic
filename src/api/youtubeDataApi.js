import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { CKeys } from '../bundle/constants';
import apiFetch from '../bundle/axios';

export const useFetchYoutubeSearchByVid = (youtubeId) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: [CKeys.youtubeDataQueryKey.search, youtubeId],
    queryFn: async () => {
      const response = await axios.get(CKeys.youtubeDataApiUrl.search, {
        params: {
          key: CKeys.YOUTUBE_API_KEY,
          part: 'snippet,contentDetails,statistics',
          id: youtubeId,
        },
      });
      return response?.data?.items ?? [];
    },
    keepPreviousData: true,
    enabled: !!youtubeId,
  });
  return { data, isLoading, isError, error };
};

export const useSaveYoutubeSearchByVid = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSaveYoutubeSearch, isLoading: isLoadingYoutubeSearch } =
    useMutation({
      mutationFn: async (params) => {
        console.log('Youtube pastor save useSaveYoutubeSearchByVid');
        const response = await apiFetch.post(
          CKeys.apiFetchUrl.youtubePastor,
          params
        );
        return response.data.result;
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: ['youtube/pastor'],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { mutateSaveYoutubeSearch, isLoadingYoutubeSearch };
};

export const useDeleteYoutubePastor = () => {
  const QueryClient = useQueryClient();
  const {
    mutate: mutateDeleteYoutubePastor,
    isLoading: isLoadingDeleteYoutubePastor,
  } = useMutation({
    mutationFn: async (params) => {
      console.log('Youtube pastor delete useDeleteYoutubePastor');
      const response = await apiFetch.post('/youtube/pastor-delete', params);
      return response.data.result;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ['youtube/pastor'],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateDeleteYoutubePastor, isLoadingDeleteYoutubePastor };
};
