import React from "react";

export default function CreateReview(props){
    const [currentScore, setCurrentScore] = React.useState(5);

    const [reviewObj, setReviewObj] = React.useState({
        title: "",
        content: "",
        score: 5
    })

    function handleChange(event) {
        const {name, value} = event.target;

        setReviewObj(prev => ({
            ...prev,
            [name]: value
        }))
        
        name === 'score' && setCurrentScore(event.target.value);
    }

    return (
        <form action="" className="review-form">
            <label htmlFor="title">Title: </label>
            <input
                onChange={handleChange}
                type="text"
                placeholder="Your title here..."
                id="title"
                name="title"
                value={reviewObj.title}
            />
            <label htmlFor="content">Content: </label>
            <textarea
                onChange={handleChange}
                name="content"
                id="content"
                cols="30"
                rows="10"
                placeholder="Write your review here..."
                value={reviewObj.content}
            ></textarea>
            <label htmlFor="score">Score: </label>
            <div className="create-score">
                <input
                    onChange={handleChange}
                    type="range"
                    id="score"
                    value={currentScore}
                    name="score"
                    min="1"
                    max="10"
                />
                <div className="review-score"
                    style={{fontSize: '25px', width: '40px', height: '40px'}}>
                    <span>{currentScore}</span>
                </div>
            </div>
            <div className="create-buttons">
                <button onClick={props.funcView} className="create-cancel">Cancel</button>
                <button onClick={(event) => {
                    props.funcReview(event, reviewObj);

                    setReviewObj({
                        title: "",
                        content: "",
                        score: 5
                    })
                }} className="create-button">Create</button>
            </div>
        </form>
    )
}