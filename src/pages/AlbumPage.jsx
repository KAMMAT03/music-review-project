import React from "react";
import Tracks from "./Tracks";
import '../styles/albumpage.css';
import Review from "./Review";
import { useParams } from "react-router-dom";
import CreateReview from "./CreateReview";

export default function AlbumPage(){
    const { id } = useParams();

    const [createView, setCreateView] = React.useState(false);

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

    function enableCreateView(){
        setCreateView(true);
    }

    function disableCreateView(){
        setCreateView(false);
    }

    function addReview(event, reviewObj){
        event.preventDefault();

        fetch("http://localhost:8080/api/reviews/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MTMiLCJpYXQiOjE2OTc0OTAwNzUsImV4cCI6MTY5NzQ5MzY3NX0.IqEKibwAxCBQ7w4kSToLP-iHSiECEGsJReIGyhpm2cd1T4Tb3wp4_RNw9gTZIEmgAnLFp6OQ15oJZ76_atFOnw`
            },
            body: JSON.stringify({
                ...reviewObj,
                albumId: id
            })
        }).then((response) => console.log(response));

        // location.reload();
    }

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
            {!createView ?  <div className="albumpage-reviews">
                <button onClick={enableCreateView} className="albumpage-review-button">Add Review</button>
                {reviewElements}
            </div> : 
            <div className="createreview">
                <CreateReview funcReview={addReview} funcView={disableCreateView} />
            </div>
            }
        </div>
    )
}