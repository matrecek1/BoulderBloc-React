import axios from "axios";
import {
    ActionFunctionArgs,
    json,
    redirect,
    useLoaderData,
    useParams,
} from "react-router-dom";
import { IBoulder } from "../../types/Gym.types";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import BoulderNav from "../../components/boulders/BoulderNav";
import BoulderFooter from "../../components/boulders/BoulderFooter";
import SentBoulderModal from "../../components/boulders/SentBoulderModal";
import { useState } from "react";

function BoulderDetail() {
    const boulder = useLoaderData() as IBoulder;
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
        console.log("open modal");
    };
    const handleCloseModal = () => {
        setShowModal(false);
        console.log("close modal");
    };
    return (
        <>
            <div className="d-flex flex-column h-100 w-100">
                {showModal && <SentBoulderModal closeModal={handleCloseModal} />}
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
                <BoulderFooter openSentModal={handleOpenModal} boulderId={boulder._id} />
            </div>
        </>
    );
}

export default BoulderDetail;

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

export const action = async ({ request, params }: ActionFunctionArgs) => {
    console.log("im here");
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
        const getResponse = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const url = `http://localhost:3000/gyms/${params.gymId}/walls/${params.wallId}/boulders/${params.boulderId}/sentBoulder`;
                    axios
                        .post(url, data)
                        .then((response) => {
                            resolve(response);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }, 3000);
            });
        };
        const response = await getResponse();
        return redirect(
            `/gyms/${params.gymId}/walls/${params.wallId}/boulders/${params.boulderId}`
        );
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
    return redirect(
        `/gyms/${params.gymId}/walls/${params.wallId}/boulders/${params.boulderId}`
    );
};
