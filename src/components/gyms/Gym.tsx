import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { IGym } from "../../types/Gym.types";
import ReactStars from "react-stars";

function Gym({ gym, showRatingModal }: { gym: IGym, showRatingModal:any }) {
    return (
        <Card
            bg="danger"
            text="white"
            className="mb-2"
        >
            <Card.Body className="text-center" id={gym._id}>
                <Card.Title>{gym.name}</Card.Title>
                {gym.rating.averageRating !== "Not Rated" ? (
                    <Card.Subtitle
                        className="mx-auto"
                        style={{ width: "fit-content" }}
                    >
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
                <Card.Text>{gym.description}</Card.Text>
                <LinkContainer to={`/gyms/${gym._id}`}>
                    <Card.Link className="btn btn-warning">
                        See Walls!
                    </Card.Link>
                </LinkContainer>
                    <Button variant="warning" className="ms-4" onClick={showRatingModal}>Rate!</Button>
            </Card.Body>
        </Card>
    );
}

export default Gym;
