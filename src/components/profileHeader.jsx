import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ProfileHeader({data, onCreateNewPlaylist }) {
    const [show, setShow] = useState(false);

    function onSaveChanges(e) {
        e.preventDefault();
        setShow(false)
        onCreateNewPlaylist(e)
    };



    const { name, city, image } = data
    return (
        <div className="mb-40">

            <div className="playlist-header">
                <div className="playlist-header-thumbnail">
                    <img src={image} alt={name} />
                </div>
                <div>                    
                    <div className="playlist-header-data">
                        <h1>{name}</h1>
                        <h6>{city}</h6>
                    </div>
                    <Button onClick={() => setShow(true)} variant="primary" size="sm">Create a New Playlist</Button>
                </div>
            </div>

            <Modal show={show} onHide={onSaveChanges}>
                <Modal.Header>
                    <Modal.Title>Edit Playlist</Modal.Title>
                </Modal.Header>
                
                <Form onSubmit={onSaveChanges}>
                    <Modal.Body>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Playlist Name</Form.Label>
                                <Form.Control type="text" placeholder="Create a new playlist!" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Playlist Description</Form.Label>
                                <Form.Control type="text" placeholder="Give me a description!" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Playlist Thumbnail</Form.Label>
                                <Form.Control type="text" placeholder="Give me a photo!" />
                            </Form.Group>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button size="sm" variant="dark" onClick={() => setShow(false)}>
                            Discard New Playlist
                        </Button>

                        <Button size="sm" variant="primary" type='submit'>
                            Save New Playlist
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <div className="playlist-header-bar"></div>
        </div>
    );
}

export default ProfileHeader;