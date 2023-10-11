import React from "react";
import Album from "./Album";
import '../styles/main.css'

export default function Main(props){
    const [searchContent, setSearchContent] = React.useState("");

    const [pageNo, setPageNo] = React.useState(1);
    
    const [albums, setAlbums] = React.useState([]);

    function handleChange(event) {
        setSearchContent(event.target.value);
    }

    React.useEffect(() => {
        if (searchContent.length < 3) return;

        fetch(`http://localhost:8080/api/albums/search?content=${searchContent.replace(/\s/g,'')}&pageNo=${pageNo}`)
        .then(response => response.json())
        .then(json => setAlbums(json.content));
    }, [searchContent])

    const albumElements = albums && albums.map(album => (
        <Album
            key={album.id}
            albumName={album.name}
            albumArtists={album.artists}
            albumId={album.id}
            albumCover={album.imageUrl}
        />
    ))

    return (
        <main>
            <nav className="main-nav">
                <form className="main-form" action="">
                    <input
                        value={searchContent}
                        onChange={handleChange}
                        type="text"
                        placeholder="Search an album"
                    />
                </form>
                <button className="myreviews-button" >My Reviews</button>
            </nav>
            <button className="page-back" ></button>
            <ul className="main-albums">
                {albumElements}
            </ul>
            <button className="page-next" ></button>
        </main>
    )
}