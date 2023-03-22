import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MainNav from "../components/MainNav";
import { Outlet } from "react-router-dom";
function Root() {
    return (
        <>
            <MainNav />
            <Container fluid>
                <Row>
                    <Col bg="dark" sm={2}>
                    </Col>
                    <Col sm={8}>
                        <Outlet />
                    </Col>
                    <Col sm={2}></Col>
                </Row>
            </Container>
        </>
    );
}

export default Root;
