import React from "react";

export default function Album(props){
    const artistElements = !props.albumArtists ? [] : props.albumArtists.map((artist, index) => (
        <p
            style={{
                borderLeft: index ? 'solid' : 'none',
                borderWidth: '2px',
                paddingLeft: index ? '10px' : '0px',
                paddingRight: index === props.albumArtists.length - 1 ? '0px' : '10px'        
            }}
            key={artist.id}
            className="artist-element"
            >{artist.name}
        </p>
    ))

    return (
        <div className={props.reviewView ? "album-style-review" : "album"} >
            <img
                name={props?.albumId} onClick={event => props.goToAlbum(event)}
                className="album-cover"
                src={props?.albumCover}
                alt=""
            />
            <div className="album-info" >
                <button
                    className="album-name"
                    name={props?.albumId} onClick={event => props.goToAlbum(event)}
                 >{props?.albumName}</button>
                <div className="album-artists" >
                    {artistElements}
                </div>
            </div>
        </div>
    )
}