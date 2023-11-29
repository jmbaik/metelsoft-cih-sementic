import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiFetch from '../bundle/axios';

export const useFetchYoutubePastor = (p) => {
  console.log('pastor param', p);
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['youtube/pastor', p],
    // get방식일 경우 async인자에 params 인자를 넣어면 안된다.
    queryFn: async () => {
      const response = await apiFetch.get('/youtube/pastor', {
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

export const useSaveYoutubePastor = () => {
  const QueryClient = useQueryClient();
  const {
    mutate: mutateSaveYoutubePastor,
    isLoading: saveYoutubePastorLoading,
  } = useMutation({
    mutationFn: async (params) => {
      console.log('youtube pastor useSaveYoutubePastor', params);
      let response = {};
      if (params.ie === 'e') {
        response = await apiFetch.put('/youtube/pastor', params);
        return response.data.result;
      } else {
        response = await apiFetch.post('/youtube/pastor', params);
        return response.data.result;
      }
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
  return { mutateSaveYoutubePastor, saveYoutubePastorLoading };
};

export const useFetchOriginVid = (params) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['youtube/origin-vid', params],
    queryFn: async (params) => {
      const response = await apiFetch.get('/youtube/origin-vid', params);
      console.log(response);
      return response.data.result;
    },
    keepPreviousData: true,
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export const useSaveOriginVid = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSaveOriginVid, isLoading: saveOriginVidLoading } =
    useMutation({
      mutationFn: async (params) => {
        console.log('OriginVid useSaveOriginVid');
        let response = {};
        if (params.ie === 'e') {
          response = await apiFetch.put('/youtube/origin-vid', params);
          return response.data.result;
        } else {
          response = await apiFetch.post('/youtube/origin-vid', params);
          return response.data.result;
        }
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: ['youtube/origin-vid'],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { mutateSaveOriginVid, saveOriginVidLoading };
};
