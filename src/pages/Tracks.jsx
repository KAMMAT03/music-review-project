import React from "react";

export default function Tracks(props){
    const trackList = props?.tracklist && props.tracklist.map((track, index) => {
        const artistElements = getArtists(track);
        
        return (
            <div key={track.name} className="track-grid">
                <span className="track-index">{index + 1}</span>
                <div className="track-info">
                    <h4>{track.name}</h4>
                    <div className="track-artists">
                        {artistElements}
                    </div>
                </div>
            </div>
        )
    })

    function getArtists(track){
        return track.artists.map((artist, index) => (
            <p
                style={{
                        fontSize: '14px',
                        borderLeft: index ? 'solid' : 'none',
                        borderWidth: '2px',
                        paddingLeft: index ? '10px' : '0px',
                        paddingRight: index === track.artists.length - 1 ? '0px' : '10px'}}
                key={artist.id}
                className="artist-element"
                >{artist.name}
            </p>
        ))
    }

    return (
        <div className="tracks">
            {trackList}
        </div>
    )
}