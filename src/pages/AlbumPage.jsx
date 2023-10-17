import React from "react";
import '../styles/albumpage.css';
import Review from "./Review";
import { useParams } from "react-router-dom";
import CreateReview from "./CreateReview";
import Sidebar from "./Sidebar";

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
        .then(json => setReviews
            (json.content.sort((a, b) => 
                Date.parse(b.dateOfPublication) - Date.parse(a.dateOfPublication)
            )));

    }, [])

    function enableCreateView(){
        setCreateView(true);
    }

    function disableCreateView(){
        setCreateView(false);
    }

    function addReview(reviewObj){
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
    }

    const reviewElements = !(reviews.length > 0) ? [] : reviews.map(reviewObj => {
        return (
            <Review key={reviewObj.id} reviewProps={reviewObj} />
        )
    })

    return (
        <div className="albumpage-main">
            <Sidebar
                albumImg={album.imageUrl} albumName={album.name}
                albumDate={album.releaseDate} albumTracks={album.trackList}
                albumArtists={album.artists}
            />
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