import axios from 'axios';
import { CKeys } from '../../bundle/constants';

function getItemsByPlayListId(playListId) {}

export const YoutubeChannelSaveItems = async (params) => {
  let response = [];
  const channelId = params.channelId;
  try {
    const _channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${CKeys.YOUTUBE_API_KEY}`;
    response = await axios.get(_channel_url);
    const playListItems = response.items.contentDetails.uploads;
    console.log('playlistitems', playListItems);
    const items = playListItems.map((val, idx) => {
      return getItemsByPlayListId(val);
    });
    return items;
  } catch (e) {
    alert(e.message);
  }
};
