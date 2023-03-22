import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import { IGym } from "../../types/Gym.types";
import ReactStars from "react-stars";

function Gym({ gym }: { gym: IGym }) {
    console.log(gym);
    return (
        <Card
            bg="danger"
            text="white"
            className="mb-2"
        >
            <Card.Body className="text-center">
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
                <LinkContainer to={`/${gym._id}`}>
                    <Card.Link className="btn btn-warning">
                        See Walls!
                    </Card.Link>
                </LinkContainer>
                <LinkContainer to={"/gyms"}>
                    <Card.Link className="btn btn-warning">Rate!</Card.Link>
                </LinkContainer>
            </Card.Body>
        </Card>
    );
}

export default Gym;
