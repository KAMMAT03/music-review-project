import React from "react";
import Tracks from "./Tracks";

export default function Sidebar(props){
    const artistElements = !props.albumArtists ? [] : props.albumArtists.map((artist, index) => (
        <p
            style={{
                    borderLeft: index ? 'solid' : 'none',
                    borderWidth: '2px',
                    paddingLeft: index ? '10px' : '0px',
                    paddingRight: index === props.albumArtists.length - 1 ? '0px' : '10px'}}
            key={artist.id}
            className="artist-element"
            >{artist.name}
        </p>
    ))

    return (
        <div className="albumpage-info">
            <img
                className="albumpage-cover"
                src={props.albumImg}
                alt=""
            />
            <h1 className="albumpage-name">{props.albumName}</h1>
            <div className="albumpage-artists">
                {artistElements}
            </div>
            <p className="albumpage-date">Released: {props.albumDate}</p>
            <p>Tracklist:</p>
            <div className="albumpage-tracklist">
                <Tracks tracklist={props.albumTracks} />
            </div>
        </div>
    )
}