import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

function MainNav() {
    return (
        <>
            <Navbar
                bg="dark"
                variant="dark"
            >
                <Container>
                    <Nav>
                        <LinkContainer to={"/"}>
                            <Nav.Link href="#home">Home</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default MainNav;
