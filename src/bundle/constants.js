export const CKeys = {
  // YOUTUBE_API_KEY: 'AIzaSyBiLtIN06CXDJ_fsp6mEe0njdZ_tfUbBsU',
  YOUTUBE_API_KEY: `${process.env.REACT_APP_API_KEY}`,
  youtubeDataQueryKey: {
    search: 'youtube-data-api/search',
  },
  youtubeDataApiUrl: {
    search: 'https://www.googleapis.com/youtube/v3/videos',
    playListItems: 'https://youtube.googleapis.com/youtube/v3/playlistItems',
    channel: 'https://youtube.googleapis.com/youtube/v3/channels',
  },
  apiQueryKey: {
    saveFetchVideosByChannel: '/youtube-data/save-videos-by-channel',
    saveFetchVideosBySearch: '/youtube-data/save-videos-by-search',
    saveFetchVideosByPlaylistId: '/youtube-data/save-videos-by-playlist',
    saveFetchAllVideosByPlaylistId: '/youtube-data/save-all-videos-by-playlist',
    updateShortsByPlaylistId: '/youtube-data/update-shorts-by-playlist',
    youtubePastor: '/youtube/pastor',
    celeb: '/youtube/celeb',
    sermon: '/youtube/sermon',
    mercy: '/youtube/mercy',
    ccm: '/youtube/ccm',
    faith: '/youtube/faith',
  },
  apiFetchUrl: {
    youtubePastor: '/youtube/pastor',
    celeb: '/youtube/celeb',
    sermon: '/youtube/sermon',
    mercy: '/youtube/mercy',
    ccm: '/youtube/ccm',
    faith: '/youtube/faith',
  },
  thumnailDefault: {
    width: 120,
    height: 90,
  },
  thumnailMedium: {
    width: 320,
    height: 180,
  },
  thumnailHigh: {
    width: 480,
    height: 360,
  },
};
