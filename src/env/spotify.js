const clientId = '8f77a38b09dd495184f0045984941e4a';
const clientSecret = 'e76b4f0e42f64d3d957d7542f7530a79';

const getSpotifyAPIToken = 'https://accounts.spotify.com/api/token'
const getSpotifyGenres = 'https://api.spotify.com/v1/browse/categories?locale=sv_US'
const getSpotifyPlaylists = genreId => `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=20`
const getSpotifyPlaylistData = playlistId => `	https://api.spotify.com/v1/playlists/${playlistId}`
const getMultipleSpotifyTracks = trackArr => `https://api.spotify.com/v1/tracks?ids=${trackArr}`


export {
    clientId, 
    clientSecret, 
    getSpotifyAPIToken, 
    getSpotifyGenres,
    getSpotifyPlaylists,
    getSpotifyPlaylistData,
    getMultipleSpotifyTracks
}