import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getPlaylist, deletePlaylist, updatePlaylist, removeTrackfromPlaylist } from '../services/backend';
import { getMultipleTracks } from '../services/spotify';
import PlaylistHeader from '../components/playlistHeader';
import TrackListDetails from '../components/trackListDetails';


function PersonalPlaylistDetailPage() {
    const { playlistId } = useParams();

    const [playlistData, setPlaylistData] = useState({})
    const [playlistTracks, setPlaylistTracks] = useState([])

    useEffect(() => {
        getPlaylist(playlistId).then(res => {
            setPlaylistData(res)
            getMultipleTracks(res.tracks).then(setPlaylistTracks)
        })

    }, [])

    function onDeletePlaylist() {
        deletePlaylist(playlistId).then(() => {window.location.href = "/me"})
    }

    async function handleDeleteTrack(trackId) {
        await removeTrackfromPlaylist(playlistId, trackId)
        setPlaylistTracks(tracks => tracks.filter(track => track.id !== trackId))
    }

    function handleUpdate(e) {
        setPlaylistData(data => { return {...data, [e.target.id]: e.target.value}})
    }

    function handleSaveUpdatedPlaylist() {
        updatePlaylist(playlistId, playlistData)
    }


    return (
        <div>
            <PlaylistHeader
                data={playlistData}
                onDeletePlaylist={onDeletePlaylist}
                onChange={handleUpdate}
                onUpdatePlaylist={handleSaveUpdatedPlaylist}
                personalPlaylist={true}
            />

            <TrackListDetails 
                data={playlistTracks}
                onDeleteTrack={handleDeleteTrack}
                personalPlaylist={true}
            />



        </div>
    );
}

export default PersonalPlaylistDetailPage;