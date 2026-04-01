//how it displays the albums in a card
//albumCard className so i can style in index.css

function AlbumCard({ album, index, deleteAlbum, setEditingIndex }) {
  
  return (
    <div className="albumCard" > 
      <h2>{album.albumName}</h2>
      <p>{album.artist}</p>
      <p>{album.rating} ⭐️ </p> 
      <p> "{album.comment}"</p> 

      <div className="albumCard-buttons">
      <button onClick={() => setEditingIndex(index)}>Edit</button>
      <button onClick={() => deleteAlbum(index)}>Delete</button>
    </div>
    </div>
  );
}

export default AlbumCard;