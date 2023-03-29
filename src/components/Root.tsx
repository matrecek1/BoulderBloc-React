import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Root:React.FC<{Content:React.ElementType}> = (props) => {
    return (
        <>
            <Container
                fluid
                className="mt-3 mx-auto"
                style={{ width: "100%" }}>
                <Row>
                    <Col
                        bg="dark"
                        sm={2}></Col>
                    <Col sm={8}>
                        <props.Content />
                    </Col>
                    <Col sm={2}></Col>
                </Row>
            </Container>
        </>
    );
};

export default Root;
