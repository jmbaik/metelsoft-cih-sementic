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
    console.log('channel_response', response);
    const playListItems = response.data.items;
    console.log('playlistItems', playListItems);
    const playListIds = playListItems.map((v) => {
      return v.contentDetails.relatedPlaylists.uploads;
    });
    console.log('playListIds', playListIds);
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
