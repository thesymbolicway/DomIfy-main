import React, { useState, useEffect } from 'react';
import PlaylistForm from "../components/playlistForm";
import ProfileHeader from '../components/profileHeader';
import PlaylistFeed from '../components/playlistFeed';
import { getUserData, createNewPlaylist, getPlaylists } from '../services/backend'

function PersonalPlaylistPage() {
    const [userData, setUserData] = useState({})
    const [userPlaylists, setUserPlaylists] = useState([])
    const [makingPlaylist, setMakingPlaylist] = useState(false)

    useEffect(() => {
        getUserData().then(setUserData)
        getPlaylists().then(setUserPlaylists)
    }, [])

    function handleSubmit(e) {
        e.preventDefault()


        const newPlaylist = {
            name: e.target.name.value,
            description: e.target.description.value,
            image: e.target.image.value,
            followers: 0, 
            tracks: []
        }

        createNewPlaylist(newPlaylist).then(res => setUserPlaylists(data => [...data, res]))

    }


    return (
        <div>
            <ProfileHeader 
                data={userData}
                playlistData={''}
                onCreateNewPlaylist={handleSubmit}
            />
            
            {
                makingPlaylist ? <PlaylistForm raiseSubmit={handleSubmit} onDiscardPlaylist={() => setMakingPlaylist(false)} /> : null
            }
            <PlaylistFeed 
                data={userPlaylists}
                personalPlaylist={true}
            />
        </div>
    )
}

export default PersonalPlaylistPage;