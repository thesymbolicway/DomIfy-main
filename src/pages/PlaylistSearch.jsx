import React, { useState } from 'react';
import { searchPlaylists, handlePreviewClick } from './spotify';

const PlaylistSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playlists, setPlaylists] = useState([]);

  const debouncedSearch = debounce((query) => {
    searchPlaylists(query).then((results) => {
      setPlaylists(results);
    });
  }, 250);

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearchInput} />
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <button onClick={() => handlePreviewClick(playlist.id)}>
              Preview
            </button>
            {playlist.name}
          </li>
        ))}
      </ul>
      <audio id="preview-audio" />
    </div>
  );
};

export default PlaylistSearch;