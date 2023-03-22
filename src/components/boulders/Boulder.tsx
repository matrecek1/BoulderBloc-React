import { IBoulder } from "../../types/Gym.types";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

function Boulder({ boulder }: { boulder: IBoulder }) {
    console.log(boulder);
    console.log(boulder.imgUrl);
    return (
        <Card
            bg="danger"
            text="white"
            className="mb-2"
        >
            <Card.Body className="text-center">
                <Card.Img
                    variant="top"
                    src={boulder.imgUrl}
                />
                <Card.Title>{boulder.name}</Card.Title>
                <Card.Text>{boulder.description}</Card.Text>
                <LinkContainer to={`${boulder._id}`}>
                    <Card.Link className="btn btn-warning">
                        See Boulders!
                    </Card.Link>
                </LinkContainer>
                <LinkContainer to={"/gyms"}>
                    <Card.Link className="btn btn-warning">Rate!</Card.Link>
                </LinkContainer>
            </Card.Body>
        </Card>
    );
}

export default Boulder;
