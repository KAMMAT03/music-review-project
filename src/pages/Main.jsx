import React from "react";
import Album from "./Album";
import '../styles/main.css'
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

export default function Main(props){
    const [searchContent, setSearchContent] = React.useState("");

    const navigate = useNavigate();

    const [albumId, setAlbumId] = React.useState("");

    const [pageNo, setPageNo] = React.useState(1);
    
    const [albums, setAlbums] = React.useState([]);

    function handleChange(event) {
        setSearchContent(event.target.value);
    }

    function changePage(event){
        event.target.name === 'back' ? setPageNo(prev => prev - 1) : setPageNo(prev => prev + 1);
    }

    React.useEffect(() => {
        console.log(albumId);
        albumId && navigate(`/album/${albumId}`);
    }, [albumId])

    function goToAlbum(event){
        setAlbumId(event.target.name);
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
      }, [searchContent, pageNo])

    React.useEffect(() => {
        if (searchContent.length < 3) {
            setAlbums([]);
            return;
        }

        fetch(`http://localhost:8080/api/albums/search?content=${searchContent.replace(/\s/g,'')}&pageNo=${pageNo}`)
        .then(response => response.json())
        .then(json => setAlbums(json.content));
    }, [searchContent, pageNo])

    const albumElements = albums && albums.map(album => (
        <Album
            func={goToAlbum}
            key={album.id}
            albumName={album.name}
            albumArtists={album.artists}
            albumId={album.id}
            albumCover={album.imageUrl}
        />
    ))

    return (
        <main className="main">
            <Nav handleChange={handleChange} searchValue={searchContent} main={true} />
            {
                albums.length === 0 &&
                <div className="main-title">
                    <h1>Music Review APP</h1>
                    <h2>THE place to share your music opinions!</h2>
                </div>
            }
            <ul className="main-albums">
                {albumElements}
            </ul>
            {albums.length > 0 && <div className="page-switches">
                {pageNo > 1 && 
                    <button onClick={changePage} name="back" className="page-back" >⇦</button>}
                {pageNo}
                {pageNo < 5 && 
                    <button onClick={changePage} name="next" className="page-next" >⇨</button>}
            </div>}
        </main>
    )
}