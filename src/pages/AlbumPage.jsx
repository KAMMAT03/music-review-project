import React from "react";
import Tracks from "./Tracks";
import '../styles/albumpage.css';
import Review from "./Review";
import { useParams } from "react-router-dom";

export default function AlbumPage(){
    const { id } = useParams();

    const [album, setAlbum] = React.useState({});

    const [reviews, setReviews] = React.useState([]);

    React.useEffect(() => {
        fetch(`http://localhost:8080/api/albums/${id}`)
        .then(response => response.json())
        .then(json => setAlbum(json));

        fetch(`http://localhost:8080/api/albums/${id}/reviews`)
        .then(response => response.json())
        .then(json => setReviews(json.content));

    }, [])

    const artistElements = !album.artists ? [] : album.artists.map((artist, index) => (
        <p
            style={{
                    borderLeft: index ? 'solid' : 'none',
                    borderWidth: '2px',
                    paddingLeft: index ? '10px' : '0px',
                    paddingRight: index === album.artists.length - 1 ? '0px' : '10px'}}
            key={artist.id}
            className="artist-element"
            >{artist.name}
        </p>
    ))

    const reviewElements = !(reviews.length > 0) ? [] : reviews.map(reviewObj => {
        return (
            <Review key={reviewObj.id} reviewProps={reviewObj} />
        )
    })

    return (
        <div className="albumpage-main">
            <div className="albumpage-info">
                <img
                    className="albumpage-cover"
                    src={album?.imageUrl}
                    alt=""
                />
                <h1 className="albumpage-name">{album?.name}</h1>
                <div className="albumpage-artists">
                    {artistElements}
                </div>
                <p className="albumpage-date">Released: {album.releaseDate}</p>
                <p>Tracklist:</p>
                <div className="albumpage-tracklist">
                    <Tracks tracklist={album.trackList} />
                </div>
            </div>
            <div className="albumpage-reviews">
                <button className="albumpage-review-button">Add Review</button>
                {reviewElements}
            </div>
        </div>
    )
}