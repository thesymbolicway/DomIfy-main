import axios from 'axios';
import { userDataAPI, userPlaylistAPI } from '../env/beckend';

async function getUserData() {
    const request = await axios(userDataAPI)
    return request.data
}

async function createNewPlaylist(playlist) {
    const request = await axios.post(userPlaylistAPI, playlist)
    return request.data
}

async function getPlaylists() {
    const request = await axios(userPlaylistAPI)
    return request.data
}

async function getPlaylist(id) {
    const request = await axios(`${userPlaylistAPI}/${id}`)
    return request.data
}
async function searchPlaylists(query, token) {
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        params: {
          type: 'playlist',
          q: query,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.playlists.items;
    } catch (error) {
      console.error(error);
    }
  }
  
async function deletePlaylist(id) {
    const request = await axios.delete(`${userPlaylistAPI}/${id}`)
    return request
}

async function updatePlaylist(id, data) {
    const request = await axios.patch(`${userPlaylistAPI}/${id}`, data)
    return request
}

async function addTrackToPlaylist(playlistId, data) {
    const playlist = await getPlaylist(playlistId)
    const newTrackList = [...playlist.tracks, data]
    const request = await axios.patch(`${userPlaylistAPI}/${playlistId}`, {tracks: newTrackList})
    return request
}

async function removeTrackfromPlaylist(playlistId, trackId) {
    const playlist = await getPlaylist(playlistId)
    
    const newTrackList = playlist.tracks.filter(track => track !== trackId)
    
    const request = await axios.patch(`${userPlaylistAPI}/${playlistId}`, {tracks: newTrackList})
    return request.data
}


export {
    getUserData, 
    createNewPlaylist, 
    getPlaylists, 
    getPlaylist,
    deletePlaylist, 
    updatePlaylist,
    addTrackToPlaylist,
    removeTrackfromPlaylist,
    searchPlaylists
}