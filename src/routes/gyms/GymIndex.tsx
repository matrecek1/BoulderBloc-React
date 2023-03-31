import { useRouteLoaderData, useLocation, useParams, json } from "react-router-dom";
import axios from "axios";
import { IGym } from "../../types/Gym.types";
import ReactStars from "react-stars";
import WallList from "../../components/walls/WallList";
import Root from "../../components/Root";
import MainNav from "../../components/MainNav";

function GymIndex() {
    const gym = useRouteLoaderData("gymIndex") as IGym;
    return (
        <>
            <MainNav
                header={gym.name}
                rating={gym.rating.averageRating}
            />
            <Root Content={WallList} />
        </>
    );
}
export async function loader({ params }: any) {
    try {
        const { data } = await axios.get("http://localhost:3000/gyms/" + params.gymId);
        return data.gym;
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

export default GymIndex;
