import axios from 'axios';
import { CKeys } from '../../bundle/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiFetch from '../../bundle/axios';

async function getItemsByPlayListId(playListId) {
  //https://youtube.googleapis.com/youtube/v3/playlistItems
  // ?part=snippet
  // &pageToken=EAAaI1BUOkNBVWlFREV5UlVaQ00wSXhRelUzUkVVMFJURW9BVkFC
  // &playlistId=UUgfBbj_ZXEabRbZOaqXTrZA
  // &key=[YOUR_API_KEY]'
  // &maxResults=50
  const response = await axios.get(CKeys.youtubeDataApiUrl.playListItems, {
    params: {
      part: 'snippet',
      playlistId: playListId,
      key: CKeys.YOUTUBE_API_KEY,
      maxResults: '50',
    },
  });
  return response.data;
}

export const YoutubeChannelSaveItems = async (params) => {
  let response = [];
  const channelId = params.channelId;
  try {
    const _channel_url = `${CKeys.youtubeDataApiUrl.channel}?part=contentDetails&id=${channelId}&key=${CKeys.YOUTUBE_API_KEY}`;
    response = await axios.get(_channel_url);
    const playListItems = response.data.items;
    const playListIds = playListItems.map((v) => {
      return v.contentDetails.relatedPlaylists.uploads;
    });
    const items = await Promise.all(
      playListIds.map(async (val) => {
        return await getItemsByPlayListId(val);
      })
    );
    return items;
  } catch (e) {
    alert(e.message);
  }
};

export const useSaveYoutubeDataByChannel = () => {
  const {
    mutate: mutateSaveYoutubeDataByChannel,
    isLoading: isLoadingYoutubeDataByChannel,
  } = useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch.post(
        CKeys.apiQueryKey.saveFetchVideosByChannel,
        params
      );
      return response.data.result;
    },
    onSuccess: (data) => {
      console.log('youtube data by channel ', data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateSaveYoutubeDataByChannel, isLoadingYoutubeDataByChannel };
};

export const useSaveVideosBySearchApi = () => {
  const {
    mutate: mutateSaveVideosBySearchApi,
    isLoading: isLoadingSaveVideosBySearchApi,
  } = useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch.post(
        CKeys.apiQueryKey.saveFetchVideosBySearch,
        params
      );
      return response.data.result;
    },
    onSuccess: (data) => {
      console.log('youtube data by channel ', data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateSaveVideosBySearchApi, isLoadingSaveVideosBySearchApi };
};

export const useSaveVideosByPlaylistId = () => {
  const {
    mutate: mutateSaveVideosByPlaylistId,
    isLoading: isLoadingSaveVideosByPlaylistId,
  } = useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch.post(
        CKeys.apiQueryKey.saveFetchVideosByPlaylistId,
        params
      );
      return response.data.result;
    },
    onSuccess: (data) => {
      console.log('youtube data by playlistId ', data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateSaveVideosByPlaylistId, isLoadingSaveVideosByPlaylistId };
};

export const useSaveFetchAllVideosByPlaylistId = () => {
  const {
    mutate: mutateSaveFetchAllVideosByPlaylistId,
    isLoading: isLoadingSaveFetchAllVideosByPlaylistId,
  } = useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch.post(
        CKeys.apiQueryKey.saveFetchAllVideosByPlaylistId,
        params
      );
      return response.data.result;
    },
    onSuccess: (data) => {
      console.log('youtube data by playlistId ', data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    mutateSaveFetchAllVideosByPlaylistId,
    isLoadingSaveFetchAllVideosByPlaylistId,
  };
};

export const useUpdateShorsByPlaylistId = () => {
  const {
    mutate: mutateUpdateShorsByPlaylistId,
    isLoading: isLoadingUpdateShorsByPlaylistId,
  } = useMutation({
    mutationFn: async (params) => {
      const response = await apiFetch.post(
        CKeys.apiQueryKey.updateShortsByPlaylistId,
        params
      );
      return response.data.result;
    },
    onSuccess: (data) => {
      console.log('youtube data by playlistId ', data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    mutateUpdateShorsByPlaylistId,
    isLoadingUpdateShorsByPlaylistId,
  };
};
