import { useEffect, useState } from "react";
import { IWall, RatingSubmissionState } from "../../types/Gym.types";
import Card from "react-bootstrap/Card"
import { LinkContainer } from "react-router-bootstrap";
import ReactStars from "react-stars";
import RatingSubmissionMessage from "../RatingSubmissionMessage";


function Wall({wall, showRatingModal, ratingState} : {wall:IWall, showRatingModal:any, ratingState:RatingSubmissionState}){
    const [ratingMessage, setRatingMessage] = useState("");
    const handleRatingStateChange = () => {
        switch (ratingState) {
            case "submitting":
                setRatingMessage("Rating is being submitted!");
                break;
            case "submitted":
                setRatingMessage("Rating submitted!");
                setTimeout(() => {
                    setRatingMessage("");
                }, 2000);
                break;
            case "failedSubmit":
                setRatingMessage("Rating Failed!");
                setTimeout(() => {
                    setRatingMessage("");
                }, 2000);
                break;
            default:
                setRatingMessage("");
                return <></>;
        }
    };
    useEffect(() => {
        handleRatingStateChange();
    }, [ratingState]);

    return (
        <Card
            bg="danger"
            text="white"
            className="mb-2">
            <Card.Body
                className="text-center"
                id={wall._id}>
                <Card.Title>{wall.name}</Card.Title>
                {wall.rating.averageRating !== "Not Rated" ? (
                    <Card.Subtitle
                        className="mx-auto"
                        style={{ width: "fit-content" }}>
                        <ReactStars
                            count={5}
                            value={wall.rating.averageRating}
                            edit={false}
                            size={24}
                            color2={"#ffd700"}
                        />
                    </Card.Subtitle>
                ) : (
                    <Card.Subtitle>Not Rated</Card.Subtitle>
                )}
                {ratingMessage !== "" && <RatingSubmissionMessage text={ratingMessage} />}
                <Card.Text>{wall.description}</Card.Text>
                <Card.Text>{wall.angle}°</Card.Text>
                <LinkContainer to={`walls/${wall._id}`}>
                    <Card.Link className="btn btn-warning">See Boulders!</Card.Link>
                </LinkContainer>
                <Card.Link
                    onClick={showRatingModal}
                    className="btn btn-warning">
                    Rate!
                </Card.Link>
            </Card.Body>
        </Card>
    );
}

export default Wall