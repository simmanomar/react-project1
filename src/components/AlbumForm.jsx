import { useState, useEffect } from "react";

// REVIEW: This component takes 6 props — that's a lot. Consider grouping related props into an object
// or using React context to reduce prop drilling from App -> AlbumForm.

function AlbumForm({
  addAlbum,
  updateAlbum,
  editingIndex,
  albumToEdit,
  selectedAlbum,
  setSelectedAlbum,
}) {
  const [artist, setArtist] = useState("");
  const [albumName, setAlbumName] = useState("");
  // REVIEW: Rating is stored as a string because input onChange gives e.target.value (always a string).
  // Consider converting to a number: onChange={(e) => setRating(Number(e.target.value))}
  // so that comparisons and display work as expected.
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  // when editing
  useEffect(() => {
    if (albumToEdit) {
      setArtist(albumToEdit.artist);
      setAlbumName(albumToEdit.albumName);
      setRating(albumToEdit.rating);
      setComment(albumToEdit.comment);
    }
  }, [albumToEdit]);

  // the fill from the search
  useEffect(() => {
    if (selectedAlbum) {
      setArtist(selectedAlbum.artist);
      setAlbumName(selectedAlbum.albumName);
    }
  }, [selectedAlbum]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const album = {
      artist,
      albumName,
      rating,
      comment,
    };

    if (editingIndex !== null) {
      updateAlbum(album);
    } else {
      addAlbum(album);
    }

    setSelectedAlbum(null); // REVIEW: Empty comment here — remove it or add a meaningful description.

    setArtist("");
    setAlbumName("");
    setRating("");
    setComment("");
  };

  return (
    <div className="form-container">
      <form className="input-form" onSubmit={handleSubmit}>
        {/* REVIEW: The <label> elements are not linked to their <input> elements via htmlFor/id attributes.
                This is an accessibility issue — screen readers can't associate labels with inputs.
                Example: <label htmlFor="artist">Artist</label> <input id="artist" ... /> */}
        <label>Artist</label>
        <input
          required
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <label>Album Name</label>
        <input
          required
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />

        <label>Rating 1-5</label>
        {/* REVIEW: type="number" allows decimal values (e.g. 2.5). If you want integers only,
                add step="1" to restrict to whole numbers. */}
        <input
          type="number"
          min="1"
          max="5"
          required
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <label>Comment</label>
        <textarea
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="add-album">
          {editingIndex !== null ? "Update Album" : "Add Album"}
        </button>
        {/* REVIEW: There is no "Cancel" button when editing an album. If a user clicks Edit on a card,
                there's no way to exit edit mode without submitting. Add a cancel button that resets
                editingIndex to null and clears the form. */}
      </form>
    </div>
  );
}

export default AlbumForm;
