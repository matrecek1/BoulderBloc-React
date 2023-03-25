import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { IBoulder } from "../../types/Gym.types";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image"
import BoulderNav from "../../components/boulders/BoulderNav";
import BoulderFooter from "../../components/boulders/BoulderFooter";

function BoulderDetail() {
    const boulder = useLoaderData() as IBoulder
    return (
        <>
            <div className="d-flex flex-column h-100 w-100">
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
    } catch (err) {
        console.log(err);
        throw new Error("error");
    }
}
