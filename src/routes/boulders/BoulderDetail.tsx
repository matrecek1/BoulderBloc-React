import axios from "axios";
import { json, useLoaderData } from "react-router-dom";
import { IBoulder } from "../../types/Gym.types";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image"
import BoulderNav from "../../components/boulders/BoulderNav";
import BoulderFooter from "../../components/boulders/BoulderFooter";
import SentBoulderModal from "../../components/boulders/SentBoulderModal";

function BoulderDetail() {
    const boulder = useLoaderData() as IBoulder
    const handleCloseModal = () => {
        console.log("close modal");
    }
    return (
        <>
            <div className="d-flex flex-column h-100 w-100">
                <SentBoulderModal closeModal={handleCloseModal}/>
                <BoulderNav
                    header={boulder.name}
                    grade={boulder.grade.activeGrade}
                />
                <Container className="w-100 h-auto px-0">
                    <Image
                        src={boulder.imgUrl}
                        className="img-fluid"
                        alt="..."
                    />
                </Container>
                <BoulderFooter boulderId={boulder._id}/>
            </div>
        </>
    );
}

export default BoulderDetail

export async function loader({ params }: any) {
    try {
        const { data } = await axios.get(
            `http://localhost:3000/gyms/${params.gymId}/walls/${params.wallId}/boulders/${params.boulderId}`
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { message } = error;
            const { status } = error;
            if (status === 400) {
                throw json({ statusText: "Error: Bad Request" }, { status });
            } else {
                throw json({ statusText: `${message}` }, { status });
            }
        } else {
            throw json({ statusText: "Encountered unexpected error!", error });
        }
    }
}
