import axios from 'axios';
import { 
    getSpotifyAPIToken, 
    getSpotifyGenres, 
    clientId, 
    clientSecret, 
    getSpotifyPlaylists,
    getSpotifyPlaylistData,
    getMultipleSpotifyTracks
} from '../env/spotify'


async function getAuthToken() {
    const request = await axios(getSpotifyAPIToken, {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)      
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })

      return request.data.access_token;
}

async function getGenres(accessToken) {
    const request = await axios(getSpotifyGenres, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + accessToken}
    })

    return request.data.categories.items;
}

async function searchPlaylists(query, token) {
    const request = await axios(`https://api.spotify.com/v1/search?type=playlist&q=${query}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    return request.data.playlists.items;
}

const getTrackPreview = async (trackId) => {
    const token = await getAuthToken();
    const response = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data.preview_url;
  };

  const playTrackPreview = (previewUrl) => {
    const audioElement = document.getElementById('preview-audio');
    audioElement.src = previewUrl;
    audioElement.play();
  };
  
  const handlePreviewClick = async (trackId) => {
    const previewUrl = await getTrackPreview(trackId);
    playTrackPreview(previewUrl);
  };

async function getPlaylists(genreId, token) {
    const request = await axios(getSpotifyPlaylists(genreId), {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    })

    return request.data.playlists.items;
}

async function getPlaylistData(playlistId, token) {
    const request = await axios(getSpotifyPlaylistData(playlistId), {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    })

    return request.data;
}


async function getMultipleTracks(trackArr) {
    const token = await getAuthToken()
    const request = await axios(getMultipleSpotifyTracks(trackArr), {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
        
    })
    return request.data.tracks
}

export {
    getAuthToken, 
    getGenres, 
    getPlaylists,
    getPlaylistData,
    getMultipleTracks,
    searchPlaylists,
    getTrackPreview,
    playTrackPreview,
    handlePreviewClick,
    getSpotifyAPIToken,
}