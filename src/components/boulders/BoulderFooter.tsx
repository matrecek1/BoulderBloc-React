import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";


const BoulderFooter: React.FC<{boulderId:string}> = ({boulderId}) => {
    const boulders = useRouteLoaderData("wallIndex")
    console.log(boulders);
    return (
        <>
            <Stack
                direction="horizontal"
                className="flex-grow-1 bg-danger"
                gap={3}>
                <Button
                    variant="outline-light"
                    className="ms-4 me-auto"
                    style={{ height: "45px", width: "45px" }}>
                    <AiOutlineLeft className="fs-1 w-100 my-auto mx-auto" />
                </Button>
                <Button
                    variant="outline-light"
                    size="lg"
                    className="mx-auto">
                    Sent It!
                </Button>
                <Button
                    variant="outline-light"
                    className="ms-auto me-4"
                    style={{ height: "45px", width: "45px" }}>
                    <AiOutlineRight className="fs-1 w-100 my-auto mx-auto" />
                </Button>
            </Stack>
        </>
    );
};

export default BoulderFooter;
