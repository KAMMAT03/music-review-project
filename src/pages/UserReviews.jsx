import React from "react";
import Nav from "./Nav";
import Review from "./Review";
import '../styles/userreviews.css'
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UserReviews(props){
    const [reviews, setReviews] = React.useState([]);

    const { username } = useParams();

    const location = useLocation();

    const navigate = useNavigate();

    const [albumId, setAlbumId] = React.useState("");

    React.useEffect(() => {
        fetch(`http://localhost:8080/api/users/${username}/reviews`)
        .then(response => response.json())
        .then(json => setReviews
            (json.content.sort((a, b) => 
                Date.parse(b.dateOfPublication) - Date.parse(a.dateOfPublication)
            )));
    }, [])

    React.useEffect(() => {
        console.log(albumId);
        albumId && navigate(`/album/${albumId}`, { state: location.state });
    }, [albumId])

    function goToAlbum(event){
        setAlbumId(event.target.name);
    }

    function goToMain(){
        navigate(`/search`, { state: location.state });
    }

    function goToUserReviews(){
        window.location.reload();
    }

    function goToLogin(){
        navigate('/auth');
    }

    const reviewElements = !(reviews.length > 0) ? [] : reviews.map(reviewObj => {
        return (
            <Review key={reviewObj.id} reviewProps={reviewObj} goToAlbum={goToAlbum} detailed={true} />
        )
    })

    return (
        <div className="userreviews">
            <Nav
                main={false}
                goToMain={goToMain}
                authorized={location.state !== null}
                goToLogin={goToLogin}
                goToUserReviews={goToUserReviews}
                username={location.state.username}  
            />
            {reviewElements}
        </div>
    )
}