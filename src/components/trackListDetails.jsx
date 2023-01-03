import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import { getPlaylists, addTrackToPlaylist } from '../services/backend';

function TrackListDetails({data, personalPlaylist, onDeleteTrack}) {
    const [userPlaylists, setUserPlaylists] = useState([])

    useEffect(() => {
        getPlaylists().then(setUserPlaylists)
    }, [])
    
    function renderTitle(data) {
        if(personalPlaylist) {
            return data.name
        }
        else {
            console.log(data);
            return data.track.name
        }
    }

    function renderArtist(data) {
        if(personalPlaylist) {
            console.log(data.artists[0].name);
            return data.artists[0].name
        } else {
            return (data.track.artists[0].name);
        }
    }
    
    function renderDuration(data) {
        let duration;
        if(personalPlaylist) {
            duration = data.duration_ms
        } else {
            duration = data.track.duration_ms;
        }
    
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
    
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }    

    function renderAlbum(data) {
        if(personalPlaylist) {
            return data.album.name;
        } else {
            return data.track.album.name;
        }
    }

    function onAddToPlaylist(playlistId, trackId) {
        addTrackToPlaylist(playlistId, trackId)
    }

    function renderAction(data) {
        if(personalPlaylist) {
            return (
                <Button onClick={() => onDeleteTrack(data.id)} size="sm" variant="secondary">Delete</Button>
            )
        }
        else {
            return (
                <DropdownButton onSelect={playlistId => onAddToPlaylist(playlistId, data.track.id)} id="addToPlaylist" title="Add me to a playlist">
                    {
                        userPlaylists.map(playlist => <Dropdown.Item eventKey={playlist.id} >{playlist.name}</Dropdown.Item>)
                    }
                </DropdownButton>
            )
        }
    }

    return (
        <div>
            <Table hover size="sm" >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Duration</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(track => {
                            return (
                            <tr>
                                <td>{renderTitle(track)}</td>
                                <td>{renderArtist(track)}</td>
                                <td>{renderAlbum(track)}</td>
                                <td>{renderDuration(track)}</td>
                                <td>{renderAction(track)}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default TrackListDetails;