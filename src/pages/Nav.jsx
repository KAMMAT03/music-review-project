import React from "react";
import icon from "../assets/home-icon.svg";

export default function Nav(props){

    return (
        <nav className="main-nav">
            <div onClick={props.goToMain} className="home-container">
                <img className="home-icon" src={icon} alt="" />
            </div>
            {props.main ? <form className="main-form" action="">
                <input
                    value={props.searchValue}
                    onChange={event => props.handleChange(event)}
                    type="text"
                    placeholder="Search an album"
                />
            </form> : 
            <div className="userreview-nav-title">
                <span>{props.username}'s reviews</span>
            </div>
            }
            <button
                className="myreviews-button"
                onClick={props.authorized ? props.goToUserReviews : props.goToLogin}
            >{props.authorized ? "My Reviews" : "Sign in"}</button>
            {props.authorized && <button onClick={props.logOut} className="myreviews-button">Log Out</button>}
        </nav>
    )
}