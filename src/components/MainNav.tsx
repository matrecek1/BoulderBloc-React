import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useMatches, RouteObject } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { Button } from "react-bootstrap";

function MainNav() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar
                bg="light"
                className="border-bottom border-danger border-2 mx-2"
            >
                <Container>
                    <Nav>
                        <Button variant="outline-danger" className="mx-auto" style={{height:"45px", width:"45px"}}>
                            <AiOutlineLeft
                                onClick={() => navigate(-1)}
                                className="fs-1 w-100 my-auto mx-auto"
                            />
                        </Button>
                    </Nav>
                    <Navbar.Text className="mx-auto fs-2 text-black">
                        LokalBlok
                    </Navbar.Text>
                </Container>
            </Navbar>
        </>
    );
}

export default MainNav;
