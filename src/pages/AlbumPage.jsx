import React from "react";
import Tracks from "./Tracks";
import '../styles/albumpage.css';

export default function AlbumPage(){
    const [album, setAlbum] = React.useState({});

    React.useEffect(() => {
        fetch(`http://localhost:8080/api/albums/18NOKLkZETa4sWwLMIm0UZ`)
        .then(response => response.json())
        .then(json => console.log(json));
    }, [])

    return (
        <div className="albumpage-main">
            <div className="albumpage-info">
                <img
                    className="albumpage-cover"
                    src="https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44"
                    alt=""
                />
                <h1 className="albumpage-name">UTOPIA</h1>
                <div className="albumpage-artists">
                    <p>Travis Scott</p>
                </div>
                <p className="albumpage-date">Released: 2023-07-28</p>
                <p>Tracklist:</p>
                <div className="albumpage-tracklist">
                    <Tracks />
                </div>
            </div>
        </div>
    )
}