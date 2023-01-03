function PlaylistCard({playlist, raiseClick}) {
    return (
        <div className='card'>
            <h2 key={playlist.id} onClick={() => raiseClick(playlist.id)} >{playlist.name}</h2>
            <img src={playlist.image}></img>
            <h4>{playlist.description}</h4>
        </div>
    );
}

export default PlaylistCard;