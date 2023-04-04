import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import styles from "./BoulderFooter.module.css";
import { IWall } from "../../types/Gym.types";

const BoulderFooter: React.FC<{ boulderId: string }> = ({ boulderId }) => {
    const navigate = useNavigate();
    const { boulders } = useRouteLoaderData("wallIndex") as IWall;

    const indexOfActiveBoulder = boulders!.findIndex(
        (boulder) => boulder._id === boulderId
    );

    const nextBoulder = boulders![indexOfActiveBoulder + 1];
    const prevBoulder = boulders![indexOfActiveBoulder - 1];

    const handleNextBoulder = () => {
        if (nextBoulder) {
            navigate(`../boulders/${nextBoulder._id}`);
        }
    };
    const handlePrevBoulder = () => {
        if (prevBoulder) {
            navigate(`../boulders/${prevBoulder._id}`);
        }
    };
    return (
        <>
            <Stack
                direction="horizontal"
                className="flex-grow-1 bg-danger"
                gap={3}>
                <Button
                    onClick={handlePrevBoulder}
                    variant="outline-light"
                    className={`${styles.arrowButton} ms-4 me-auto ${prevBoulder ? "" : " disabled"}`}
                    >
                    <AiOutlineLeft className="fs-1 w-100 my-auto mx-auto" />
                </Button>
                <Button
                    variant="outline-light"
                    size="lg"
                    className="mx-auto">
                    Sent It!
                </Button>
                <Button
                    onClick={handleNextBoulder}
                    variant="outline-light"
                    className={`${styles.arrowButton} ms-auto me-4 ${nextBoulder ? "" : " disabled"}`}
                    >
                    <AiOutlineRight className="fs-1 w-100 my-auto mx-auto" />
                </Button>
            </Stack>
        </>
    );
};

export default BoulderFooter;
