import React from "react";
import Album from "./Album";

export default function Review({reviewProps, detailed, goToAlbum}){
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
                <div className="review-score">
                    <span style={{color: getColor()}}>{reviewProps.score}</span>
                </div>
            </div>
            <p className="review-content">{reviewProps.content}</p>
        </div>
    )
}