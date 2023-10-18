import React from "react";
import Nav from "./Nav";
import Review from "./Review";
import '../styles/userreviews.css'
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UserReviews(props){
    const [reviews, setReviews] = React.useState([]);

    const [albumId, setAlbumId] = React.useState("");

    const [pageNo, setPageNo] = React.useState(1);

    const [lastPage, setLastPage] = React.useState(false);

    const { username } = useParams();

    const location = useLocation();

    const navigate = useNavigate();



    React.useEffect(() => {
        fetch(`http://localhost:8080/api/users/${username}/reviews?pageNo=${pageNo}`)
        .then(response => response.json())
        .then(json => {
            setReviews(json.content.sort((a, b) => 
                Date.parse(b.dateOfPublication) - Date.parse(a.dateOfPublication)
            ));
            setLastPage(json.last);
        })
    }, [pageNo])

    React.useEffect(() => {
        albumId && navigate(`/album/${albumId}`, { state: location.state });
    }, [albumId])

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [reviews])



    function changePage(event){
        event.target.name === 'back' ? setPageNo(prev => prev - 1) : setPageNo(prev => prev + 1);
    }

    function goToAlbum(event){
        setAlbumId(event.target.name);
    }

    function goToMain(){
        navigate(`/search`, { state: location.state });
    }

    function goToUserReviews(){
        window.location.reload();
    }

    function goToLogin(){
        navigate('/auth');
    }



    const reviewElements = !(reviews.length > 0) ? [] : reviews.map(reviewObj => {
        return (
            <Review key={reviewObj.id} reviewProps={reviewObj} goToAlbum={goToAlbum} detailed={true} />
        )
    })



    return (
        <div className="userreviews">
            <Nav
                main={false}
                goToMain={goToMain}
                authorized={location.state !== null}
                goToLogin={goToLogin}
                goToUserReviews={goToUserReviews}
                username={location.state.username}  
            />
            {reviewElements}
            {reviews.length > 0 && <div className="page-switches">
                {pageNo > 1 && 
                    <button onClick={changePage} name="back" className="page-back" >◄</button>}
                {!(lastPage && pageNo === 1) && pageNo}
                {!lastPage && 
                    <button onClick={changePage} name="next" className="page-next" >►</button>}
            </div>}
        </div>
    )
}