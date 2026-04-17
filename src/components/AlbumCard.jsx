//how it displays the albums in a card
//albumCard className so i can style in index.css

function AlbumCard({ album, index, deleteAlbum, setEditingIndex }) {
  return (
    <div className="albumCard">
      <h2>{album.albumName}</h2>
      <p>{album.artist}</p>
      {/* REVIEW: If rating is empty or undefined, this will render just "⭐️" with no number.
          Consider a conditional render: {album.rating && <p>{album.rating} ⭐️</p>} */}
      <p>{album.rating} ⭐️ </p>
      {/* REVIEW: Same issue — if comment is empty, this renders empty quotes "". 
          Consider guarding: {album.comment && <p>"{album.comment}"</p>} */}
      <p> "{album.comment}"</p>

      <div className="albumCard-buttons">
        {/* REVIEW: The delete button has no confirmation dialog. A user could accidentally delete an album
          with no way to undo it. Consider adding a window.confirm() or a confirmation step. */}
        <button onClick={() => setEditingIndex(index)}>Edit</button>
        <button onClick={() => deleteAlbum(index)}>Delete</button>
      </div>
    </div>
  );
}

export default AlbumCard;
