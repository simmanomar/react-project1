import { useState } from "react"; // useState makes components remember data (album, search input +++)
import AlbumForm from "./components/AlbumForm";
import Header from "./components/Header";
import AlbumCard from "./components/AlbumCard";

function App() {
  const [albums, setAlbums] = useState([]); //list of saved albums, setAlbum = function to update it
  const [editingIndex, setEditingIndex] = useState(null); //remembers the album being edited

  const [searchResults, setSearchResults] = useState([]); //stores albums from the API (the search)
  const [selectedAlbum, setSelectedAlbum] = useState(null); //stores album you clicked from search
  const [artistQuery, setArtistQuery] = useState(""); //stores the user input in search box

  // REVIEW: No loading state for the API call. Consider adding a `const [isLoading, setIsLoading] = useState(false)`
  // so you can show a spinner or "Loading..." text while the fetch is in progress.

  //adding an album, adds a new one to the list
  const addAlbum = (newAlbum) => {
    setAlbums([...albums, newAlbum]); // takes everything inside albums and copies it, adding the new one at the end
  };

  // deleting an album from the list
  const deleteAlbum = (indexToDelete) => {
    const updatedAlbums = albums.filter((_, index) => index !== indexToDelete);
    setAlbums(updatedAlbums); //updates the state -> and the ui automatically
  };

  // edits - here we get the updated album
  const updateAlbum = (updatedAlbum) => {
    const updatedAlbums = albums.map(
      (
        album,
        index, // loops through all albums
      ) => (index === editingIndex ? updatedAlbum : album), //if we edit, replace album. if not, leave it as is
    );
    setAlbums(updatedAlbums); //saves changes
    setEditingIndex(null); //leaves edit mode
  };

  // the actual fetch part of it all
  const fetchAlbums = (artist) => {
    if (!artist) return;

    // REVIEW: The artist name is not URL-encoded. If the user types something with special characters
    // (e.g. "AC/DC", "Guns N' Roses"), the URL will break. Use encodeURIComponent(artist) like:
    // fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&entity=album&limit=25`)
    fetch(
      `https://itunes.apple.com/search?term=${artist}&entity=album&limit=25`,
    ) //searches the API for artist, gives a list of artists back
      .then((res) => res.json())
      .then((data) => {
        // REVIEW: The variable name `albums` here shadows the state variable `albums` from the outer scope.
        // This can be confusing and could lead to bugs. Rename to something like `fetchedAlbums` or `searchAlbums`.
        const albums = data.results.map((item) => ({
          //converts the api info to my format (album, artist etc)
          id: item.collectionId,
          albumName: item.collectionName,
          artist: item.artistName,
          cover: item.artworkUrl100,
        }));

        setSearchResults(albums); //saves results & updates ui
      })
      // REVIEW: The error is only logged to the console. The user has no idea if the search failed.
      // Consider setting an error state and displaying a message in the UI.
      .catch((err) => console.error(err)); //error log if errors occur
  };

  return (
    // REVIEW: Inline style `padding: "5rem"` is used here while CSS classes are used everywhere else.
    // Move this to a CSS class for consistency.
    <div style={{ padding: "5rem" }}>
      <Header />

      <div className="search-container">
        <div>
          <input
            type="text"
            placeholder="Type in an artist"
            value={artistQuery}
            onChange={(e) => {
              const value = e.target.value;
              setArtistQuery(value);
              setSearchResults([]); // clear while typing
            }}
          />

          <button onClick={() => fetchAlbums(artistQuery)}>Search</button>
        </div>
      </div>

      {searchResults.length > 0 && ( // the results from the search displaying, from the array
        <>
          <h2>Search Results</h2>
          {/* REVIEW: Inline styles here again — this flex layout should be a CSS class for consistency. */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {searchResults.map((album) => (
              <div
                key={album.id}
                className="albumCard"
                onClick={() => {
                  setSelectedAlbum(album); //save selected
                  setSearchResults([]); // clears the search after selecting an album
                }}
              >
                {/* REVIEW: The search result cards don't show the album cover art even though it's fetched
                                from the API (album.cover). Consider displaying it with an <img> tag. */}
                <h3>{album.albumName}</h3>
                <p>{album.artist}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <AlbumForm // here we pass the functions into the form
        addAlbum={addAlbum}
        updateAlbum={updateAlbum}
        editingIndex={editingIndex}
        albumToEdit={albums[editingIndex]}
        selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum}
      />

      <h2>My Albums</h2>
      <div className="album-grid">
        {/* REVIEW: Using array index as the `key` prop is problematic when items can be deleted or reordered.
            When you delete item 0, item 1 becomes index 0 and React may not re-render correctly.
            Give each album a unique id (e.g. Date.now() or a uuid) when it's created, and use that as the key. */}
        {albums.map(
          (
            album,
            index, // the saved albums, a loop
          ) => (
            <AlbumCard //shows each album in a card underneath form with all info
              key={index}
              album={album}
              index={index}
              deleteAlbum={deleteAlbum}
              setEditingIndex={setEditingIndex}
            />
          ),
        )}
      </div>

      {/* REVIEW: The project requirements mention "Feedback should be provided for user actions (e.g. item added, item deleted)."
            There is currently no user-facing feedback when an album is added, edited, or deleted.
            Consider adding a toast/notification message or a simple status message. */}
    </div>
  );
}

export default App;
