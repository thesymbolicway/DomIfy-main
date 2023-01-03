import React, { useState, useEffect } from 'react';
import { getAuthToken, getGenres, getPlaylists, getPlaylistData, searchPlaylists, handlePreviewClick, getTrackPreview, playTrackPreview } from '../services/spotify'
import DropDown from '../components/dropdown';
import PlayListDetail from '../components/playlistList';
import PlaylistFeed from '../components/playlistFeed';


function PlaylistPage({selectedGenre, setSelectedGenre}) {

    const [token, setToken] = useState('');
    const [listOfGenres, setListOfGenres] = useState([])
    const [listOfPlaylists, setListOfPlaylists] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searching, setSearching] = useState(false)

    useEffect(() => {
        getAuthToken().then(token => {
            setToken(token)
            getGenres(token).then(setListOfGenres)
            getPlaylists(selectedGenre, token).then(setListOfPlaylists)
        })
    }, []);

    useEffect(() => {
        if (searchQuery.length > 2 && searching) {
            searchPlaylists(searchQuery, token).then(setSearchResults)
        }
    }, [searchQuery, searching, token])
    
    function onGenreChange(genre) {
        setSelectedGenre(genre)
        getPlaylists(genre, token).then(setListOfPlaylists)
    }
    function onSearchInputChange(e) {
        setSearchQuery(e.target.value)
    }

  const handlePreviewClick = async (trackId) => {
    const previewUrl = await getTrackPreview(trackId);
    playTrackPreview(previewUrl);
  };
    
    function toggleSearch() {
        setSearching(!searching)
    }

    return (
        <div className='playlist-page'>
            <div className='playlist-page-card'>
                <h1 className='mb-20'>Search For Playlist</h1>
                <DropDown
                options={listOfGenres}
                raiseChange={onGenreChange}
                value={selectedGenre}
                />
                <input type='text' placeholder='Search for playlist' onChange={onSearchInputChange} />
                <button onClick={toggleSearch}>Search</button>
            </div>
    
            {
                searching ? 
                <PlaylistFeed 
                    data={searchResults} 
                    personalPlaylist={false}
                />
                :
                <PlaylistFeed 
                    data={listOfPlaylists} 
                    personalPlaylist={false}
                    handlePreviewClick={handlePreviewClick}
                />
            }
        </div>
    );
}

export default PlaylistPage;