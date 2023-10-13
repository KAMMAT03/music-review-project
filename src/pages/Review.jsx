import React from "react";

export default function Review({reviewProps}){
    return (
        <div className="review">
            <div  className="review-header">
                <div className="review-info">
                    <h1 className="review-title">{reviewProps.title}</h1>
                    <h3 className="review-user">By: {reviewProps.username}</h3>
                </div>
                <div className="review-score">
                    <span>{reviewProps.score}</span>
                </div>
            </div>
            <p className="review-content">{reviewProps.content}</p>
        </div>
    )
}