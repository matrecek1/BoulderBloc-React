import { IBoulder } from "../../types/Gym.types";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

function Boulder({ boulder }: { boulder: IBoulder }) {
    return (
        <Card
            bg="danger"
            text="white"
            className="mb-2"
        >
            <Card.Body className="text-center">
                <Card.Title className="fs-2">{boulder.name}</Card.Title>
                <Card.Text className="fs-3">{boulder.grade.activeGrade}</Card.Text>
                <LinkContainer to={`boulders/${boulder._id}`}>
                    <Card.Link className="btn btn-warning">
                        See Boulder!
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
