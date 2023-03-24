import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

const BoulderFooter: React.FC<{}> = () => {
    return (
        <>
            <Stack
                direction="horizontal"
                className="flex-grow-1 bg-danger"
                gap={3}>
                <Button
                    variant="outline-light"
                    size="lg"
                    className="ms-3">
                    Rate
                </Button>
                <Button
                    variant="outline-light"
                    size="lg"
                    className="mx-auto">
                    Sent It!
                </Button>
                <Button
                    variant="outline-light"
                    size="lg"
                    className="me-3">
                    Rate
                </Button>
            </Stack>
        </>
    );
};

export default BoulderFooter;
