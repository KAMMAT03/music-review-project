import React from "react";
import '../styles/main.css'

export default function Main(props){
    return (
        <main>
            <nav className="main-nav">
                <form className="main-form" action="">
                    <input type="text" placeholder="Search an album" />
                    <button>OK</button>
                </form>
                <button className="myreviews-button" >My Reviews</button>
            </nav>
        </main>
    )
}