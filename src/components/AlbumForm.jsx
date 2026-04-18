import { useState, useEffect } from "react";

function AlbumForm ({ addAlbum, updateAlbum, editingIndex, albumToEdit, selectedAlbum, setSelectedAlbum}) {
    const [artist, setArtist] = useState("");
    const [albumName, setAlbumName] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    // when editing 
    useEffect(() => {
        if (albumToEdit) {
            setArtist(albumToEdit.artist);
            setAlbumName(albumToEdit.albumName);
            setRating(Number(albumToEdit.rating));
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
            comment
        };

        if (editingIndex !== null) {
            updateAlbum(album);
        } else {
            addAlbum(album);
        }

        setSelectedAlbum(null); // 

        setArtist("");
        setAlbumName("");
        setRating("");
        setComment("");
    };

    return (
        <div className="form-container">
        <form className="input-form"
        onSubmit={handleSubmit} >
            
            <label htmlFor="artist">Artist</label>
            <input id="artist" required value={artist} onChange={(e) => setArtist(e.target.value)} />

            <label htmlFor="album name">Album Name</label>
            <input id="album name" required value={albumName} onChange={(e) => setAlbumName(e.target.value)} />

            <label htmlFor="rating">Rating 1-5</label>
            <input id="rating" type="number" min="1" max="5" step="1" required value={rating || ""} onChange={(e) => setRating(Number(e.target.value))} /> 

            <label htmlFor="comment">Comment</label>
            <textarea id="comment" required value={comment} onChange={(e) => setComment(e.target.value)} />

            <button className="add-album"> 
              {editingIndex !== null ? "Update Album" : "Add Album"}
            </button>

        </form>
        </div>
    );
}

export default AlbumForm;