import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CreateReview from "./CreateReview";
import Sidebar from "./Sidebar";
import Review from "./Review";
import icon from "../assets/home-icon.svg";
import '../styles/albumpage.css';

export default function AlbumPage(){
    const [createView, setCreateView] = React.useState(false);

    const [lastPage, setLastPage] = React.useState(false);
    
    const [reviews, setReviews] = React.useState([]);
    
    const [pageNo, setPageNo] = React.useState(1);
    
    const [album, setAlbum] = React.useState({});
    
    const { id } = useParams();

    const location = useLocation();

    const navigate = useNavigate();



    React.useEffect(() => {
        fetch(`http://localhost:8080/api/albums/${id}`)
        .then(response => response.json())
        .then(json => setAlbum(json));
    }, [])

    React.useEffect(() => {
        fetch(`http://localhost:8080/api/albums/${id}/reviews?pageNo=${pageNo}`)
        .then(response => response.json())
        .then(json => {
            setReviews(json.content.sort((a, b) => 
                Date.parse(b.dateOfPublication) - Date.parse(a.dateOfPublication)
            ));
            setLastPage(json.last);
        })
    }, [pageNo])

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [reviews])



    function changePage(event){
        event.target.name === 'back' ? setPageNo(prev => prev - 1) : setPageNo(prev => prev + 1);
    }

    function enableCreateView(){
        setCreateView(true);
    }

    function disableCreateView(){
        setCreateView(false);
    }

    function goToLogin(){
        navigate('/auth');
    }

    function goToMain(){
        navigate(`/search`, { state: location.state });
    }

    function parseJwt(token) {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          return null;
        }
    }



    function addReview(event, reviewObj){
        event.preventDefault();

        if (parseJwt(location.state.token) * 1000 <= Date.now()){
            navigate('/auth', { state: {message: 'Your session expired'} });
        }

        fetch("http://localhost:8080/api/reviews/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${location.state.token}`
            },
            body: JSON.stringify({
                ...reviewObj,
                albumId: id
            })
        }).then((response) => console.log(response));

        setTimeout(() => {
            window.location.reload();
        }, 500)
    }



    const reviewElements = !(reviews.length > 0) ? [] : reviews.map(reviewObj => {
        return (
            <Review key={reviewObj.id} reviewProps={reviewObj} goToAlbum={() => 0} detailed={false} />
        )
    })


    
    return (
        <div className="albumpage-main">
            <Sidebar
                albumImg={album.imageUrl} albumName={album.name}
                albumDate={album.releaseDate} albumTracks={album.trackList}
                albumArtists={album.artists}
            />
            {!createView ?  <div className="albumpage-reviews">
                <div className="albumpage-nav">
                    <button onClick={location.state !== null ? enableCreateView : goToLogin} className="albumpage-review-button">
                        {location.state !== null ? "Add Review" : "Sign in to add your review"}
                    </button>
                    <div onClick={goToMain} className="home-container">
                        <img className="home-icon" src={icon} alt="" />
                    </div>
                </div>
                {reviewElements}
                {reviews.length > 0 && <div className="page-switches">
                {pageNo > 1 && 
                    <button onClick={changePage} name="back" className="page-back" >◄</button>}
                {!(lastPage && pageNo === 1) && pageNo}
                {!lastPage && 
                    <button onClick={changePage} name="next" className="page-next" >►</button>}
            </div>}
            </div> : 
            <div className="createreview">
                <CreateReview funcReview={addReview} funcView={disableCreateView} />
            </div>
            }
        </div>
    )
}