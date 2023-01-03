import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PersonalPlaylistCard from './personalPlaylistCard';

function PlaylistFeed({ data, personalPlaylist, handlePreviewClick}) {
  
  function getImage(playlist) {
    if(!personalPlaylist) {
      return playlist.images[0].url;
    }
    else {
      return playlist.image;
    }
  }
    return (
      <Row md={4} className="g-4">
        {data.map(playlist =>
          <Col>
              <PersonalPlaylistCard 
                data={playlist}
                image={getImage(playlist)}
                personalPlaylist={personalPlaylist}
                key={playlist.id}
                handlePreviewClick={handlePreviewClick}
              />
          </Col>
        )}
      </Row>
    );
}

export default PlaylistFeed;