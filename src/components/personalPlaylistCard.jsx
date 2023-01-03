import React, { useRef } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function PersonalPlaylistCard({ data, image, personalPlaylist, handlePreviewClick }) {
  const navigate = useNavigate();
   const audioRef = useRef();


   console.log(handlePreviewClick);
  function getNavigation() {
    if (personalPlaylist) {
      navigate(`/me/${data.id}`);
    } else {
      navigate(`/${data.id}`);
    }
  }
  function playPreview() {
    handlePreviewClick(data.trackId).then((previewUrl) => {
      audioRef.current.src = previewUrl;
      audioRef.current.play();
    });
  }

  return (
    <>
      <Card onClick={getNavigation} style={{ width: '18rem' }}>
        <img className="playlist-card-img" src={image} alt="" />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
          <button onClick={playPreview}>Preview</button>
        </Card.Body>
      </Card>
      <audio ref={audioRef} />
    </>
  );
}

export default PersonalPlaylistCard;
