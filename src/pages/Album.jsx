import React from "react";

export default function Album(props){
    const artistElements = !props.albumArtists ? [] : props.albumArtists.map((artist, index) => (
        <p
            style={{borderLeft: index ? 'solid' : 'none', borderWidth: '2px'}}
            key={artist.id}
            className="artist-element"
            >{artist.name}
        </p>
    ))

    return (
        <div className="album">
            <img
                className="album-cover"
                src={props?.albumCover}
                alt=""
            />
            <div className="album-info" >
                <p className="album-name" >{props?.albumName}</p>
                <div className="album-artists" >
                    {artistElements}
                </div>
            </div>
        </div>
    )
}