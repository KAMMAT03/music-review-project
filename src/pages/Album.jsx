import React from "react";

export default function Album(){
    return (
        <div className="album">
            <img
                className="album-cover"
                src="https://i.scdn.co/image/ab67616d0000b273881d8d8378cd01099babcd44"
                alt=""
            />
            <div className="album-info" >
                <p className="album-name" >UTOPIA</p>
                <p className="album-artist" >Travis Scott</p>
            </div>
        </div>
    )
}