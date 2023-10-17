import React from "react";
import '../styles/albumpage.css';
import Review from "./Review";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CreateReview from "./CreateReview";
import Sidebar from "./Sidebar";

export default function AlbumPage(){
    const { id } = useParams();

    const location = useLocation();

    const navigate = useNavigate();

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

    function goToLogin(){
        navigate('/auth');
    }

    function addReview(reviewObj){
        fetch("http://localhost:8080/api/reviews/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${location.state.token}`
            },
            body: JSON.stringify({
                ...reviewObj,
                albumId: id
            })
        }).then((response) => console.log(response));
    }

    const reviewElements = !(reviews.length > 0) ? [] : reviews.map(reviewObj => {
        return (
            <Review key={reviewObj.id} reviewProps={reviewObj} goToAlbum={() => 0} detailed={false} />
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
                <button onClick={location.state !== null ? enableCreateView : goToLogin} className="albumpage-review-button">
                    {location.state !== null ? "Add Review" : "Sign in to add your review"}
                </button>
                {reviewElements}
            </div> : 
            <div className="createreview">
                <CreateReview funcReview={addReview} funcView={disableCreateView} />
            </div>
            }
        </div>
    )
}