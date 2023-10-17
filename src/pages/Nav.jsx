import React from "react";

export default function Nav(props){
    return (
        <nav className="main-nav">
            <div className="home-container">
                <img className="home-icon" src="home-icon.svg" alt="" />
            </div>
            <form className="main-form" action="">
                <input
                    value={props.searchValue}
                    onChange={event => props.handleChange(event)}
                    type="text"
                    placeholder="Search an album"
                />
            </form>
            <button className="myreviews-button" >My Reviews</button>
        </nav>
    )
}