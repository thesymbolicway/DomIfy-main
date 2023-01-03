import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function PlaylistHeader({ data, onDeletePlaylist, onChange, onUpdatePlaylist, personalPlaylist }) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);


    function onSaveChanges(e) {
        e.preventDefault();
        setShow(false)
        onUpdatePlaylist()
    };



    function renderEditButton() {
        if(personalPlaylist) {
            return <Button onClick={() => setShow(true)} size="sm" variant="dark">Edit</Button>
        } else {
            return null
        }
    }


    return (
        <div className="mb-40">
            <div className='mb-40'>
                <Button onClick={() => navigate(-1)} variant="secondary">Back</Button>
            </div>

            <Modal show={show} onHide={onSaveChanges}>
                <Modal.Header>
                    <Modal.Title>Edit Playlist</Modal.Title>
                </Modal.Header>
                
                <Form onSubmit={onSaveChanges}>
                    <Modal.Body>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Playlist Name</Form.Label>
                                <Form.Control value={data.name} onChange={onChange} type="text" placeholder="Create a new playlist!" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Playlist Description</Form.Label>
                                <Form.Control value={data.description} onChange={onChange} type="text" placeholder="Give me a description!" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Playlist Thumbnail</Form.Label>
                                <Form.Control value={data.image} onChange={onChange} type="text" placeholder="Give me a photo!" />
                            </Form.Group>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button size="sm" variant="dark" type='submit'>
                            Save Changes
                        </Button>
                        <Button size="sm" variant="danger" onClick={onDeletePlaylist}>
                            Delete Playlist
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <div className="playlist-header">
                <div className="playlist-header-thumbnail">
                    <img src={data.image} alt={data.description} />
                </div>
                <div className="playlist-header-data">
                    <h1>{data.name}</h1>
                    <h6>{data.description}</h6>
                    <p>Followers: {data.followers}</p>
                    {renderEditButton()}
                </div>
    
            </div>
            <div className="playlist-header-bar"></div>
        </div>

    );
}

export default PlaylistHeader;