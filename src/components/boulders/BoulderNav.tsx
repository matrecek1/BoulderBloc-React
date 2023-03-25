import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AiOutlineLeft } from "react-icons/ai";
import { Grade } from "../../types/Gym.types";


const BoulderNav: React.FC<{ header: string, grade:Grade     }> = ({header, grade}) => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar
                bg="danger"
                className=""
            >
                <Container className="row w-100 px-0 mx-0">
                    <Nav className="col-4">
                        <Button
                            variant="outline-light"
                            className="ms-3 me-auto"
                            style={{ height: "45px", width: "45px" }}
                        >
                            <AiOutlineLeft
                                onClick={() => navigate(-1)}
                                className="fs-1 w-100 my-auto mx-auto"
                            />
                        </Button>
                    </Nav>
                    <Navbar.Text className="col-4 text-center fs-2 text-light">
                        {header}
                    </Navbar.Text>
                    <Navbar.Text className="col-4 text-end fs-2 text-light">
                        {grade}
                    </Navbar.Text>
                </Container>
            </Navbar>
        </>
    );
};

export default BoulderNav;
