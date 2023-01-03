import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import PlaylistCard from './playlistCard';

function PlayListDetail({data}) {
  console.log(data)
  let navigate = useNavigate();

  function handleClick(playlistId) {
    navigate(`/${playlistId}`);
  }

  function goBack() {
    navigate(-1);  // navigate to the previous page in the history stack
  }

  return (
    < >
      <Button onClick={goBack}>Back</Button>
      {data.map(playlist => <PlaylistCard playlist={playlist} raiseClick={handleClick}/>)}
    </>
  );
}