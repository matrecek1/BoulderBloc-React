import { IWall } from "../../types/Gym.types";
import Card from "react-bootstrap/Card"
import { LinkContainer } from "react-router-bootstrap";


function Wall({wall} : {wall:IWall}){
    return (
        <Card
            bg="danger"
            text="white"
            className="mb-2"
        >
            <Card.Body className="text-center">
                <Card.Title>{wall.name}</Card.Title>
                <Card.Text>{wall.description}</Card.Text>
                <Card.Text>{wall.angle}°</Card.Text>
                <LinkContainer to={`${wall._id}`}>
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

export default Wall