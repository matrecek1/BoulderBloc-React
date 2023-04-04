import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { IGym, RatingSubmissionState } from "../../types/Gym.types";
import ReactStars from "react-stars";
import { useEffect, useState } from "react";
import RatingSubmissionMessage from "../RatingSubmissionMessage";

function Gym({
    gym,
    showRatingModal,
    ratingState,
}: {
    gym: IGym;
    showRatingModal: any;
    ratingState: RatingSubmissionState;
}) {
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
                id={gym._id}>
                <Card.Title>{gym.name}</Card.Title>
                {gym.rating.averageRating !== "Not Rated" ? (
                    <Card.Subtitle
                        className="mx-auto"
                        style={{ width: "fit-content" }}>
                        <ReactStars
                            count={5}
                            value={gym.rating.averageRating}
                            edit={false}
                            size={24}
                            color2={"#ffd700"}
                        />
                    </Card.Subtitle>
                ) : (
                    <Card.Subtitle>Not Rated</Card.Subtitle>
                )}
                {ratingMessage !== "" && <RatingSubmissionMessage text={ratingMessage} />}
                <Card.Text>{gym.description}</Card.Text>
                <LinkContainer to={`/gyms/${gym._id}`}>
                    <Card.Link className="btn btn-warning">See Walls!</Card.Link>
                </LinkContainer>
                <Button
                    variant="warning"
                    className="ms-4"
                    onClick={showRatingModal}>
                    Rate!
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Gym;
