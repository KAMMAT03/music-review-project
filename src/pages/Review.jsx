import React from "react";
import Album from "./Album";
import trash from "../assets/trash-icon.svg";
import { useNavigate } from "react-router-dom";

export default function Review({reviewProps, detailed, goToAlbum, username, token, parseJwt}){
    const navigate = useNavigate();

    const [displayDelete, setDisplayDelete] = React.useState(false);

    function deleteReview(){
        if (parseJwt(location.state.token).exp * 1000 <= Date.now()){
            navigate('/auth', { state: {message: 'Your session expired'} });
            return;
        }

        fetch(`http://localhost:8080/api/reviews/${reviewProps.id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => console.log(response));

        setTimeout(() => window.location.reload(), 300);
    }

    function enableDisplayDelete(){
        setDisplayDelete(true);
    }

    function disableDisplayDelete(){
        setDisplayDelete(false);
    }

    function getColor(){
        let color;
        if (reviewProps.score < 4){
            color = "red";
        } else if (reviewProps.score < 7){
            color = "yellow";
        } else{
            color = "rgb(52, 255, 52)";
        }
        return color;
    }

    return (
        <div className="review">
            {detailed && <Album
                goToAlbum={goToAlbum}
                key={reviewProps.albumId}
                albumName={reviewProps.albumDetails.name}
                albumArtists={reviewProps.albumDetails.artists}
                albumId={reviewProps.albumId}
                albumCover={reviewProps.albumDetails.imageUrl}
                reviewView={true}
            />}
            <div  className="review-header">
                <div className="review-info">
                    <h1 className="review-title">{reviewProps.title}</h1>
                    <h3 className="review-user">By: {reviewProps.username}</h3>
                </div>
                {displayDelete &&
                <div className="delete-confirm">
                    <p>Are you sure you want to delete this review?</p>
                    <div className="delete-confirm-buttons">
                        <button onClick={disableDisplayDelete} className="delete-cancel">Cancel</button>
                        <button onClick={deleteReview} className="delete-button-confirm">Delete</button>
                    </div>
                </div>}
                {username === reviewProps.username &&
                <>
                    <button className="review-edit">Edit</button>
                    <div onClick={enableDisplayDelete} className="review-trash-container">
                        <img src={trash} alt="" className="review-trash" />
                    </div>
                </>}
                <div className="review-score">
                    <span style={{color: getColor()}}>{reviewProps.score}</span>
                </div>
            </div>
            <p className="review-content">{reviewProps.content}</p>
        </div>
    )
}