import React from "react";
import Nav from "./Nav";
import Review from "./Review";
import '../styles/userreviews.css'
import { useNavigate } from "react-router-dom";

export default function UserReviews(props){
    const [reviews, setReviews] = React.useState([]);

    const navigate = useNavigate;

    const [albumId, setAlbumId] = React.useState("");

    React.useEffect(() => {
        fetch(`http://localhost:8080/api/users/test13/reviews`)
        .then(response => response.json())
        .then(json => setReviews
            (json.content.sort((a, b) => 
                Date.parse(b.dateOfPublication) - Date.parse(a.dateOfPublication)
            )));
    }, [])

    React.useEffect(() => {
        console.log(albumId);
        albumId && navigate(`/album/${albumId}`);
    }, [albumId])

    function goToAlbum(event){
        setAlbumId(event.target.name);
    }

    const reviewElements = !(reviews.length > 0) ? [] : reviews.map(reviewObj => {
        return (
            <Review key={reviewObj.id} reviewProps={reviewObj} goToAlbum={goToAlbum} detailed={true} />
        )
    })

    return (
        <div className="userreviews">
            <Nav main={false} />
            {reviewElements}
        </div>
    )
}