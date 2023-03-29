import axios from "axios";
import BoulderList from "../../components/boulders/BoulderList";
import Root from "../../components/Root";
import MainNav from "../../components/MainNav";
import { useRouteLoaderData } from "react-router-dom";
import { IWall } from "../../types/Gym.types";

function WallIndex() {
    const wall = useRouteLoaderData("wallIndex") as IWall;
    return (
        <>
            <MainNav
                header={wall.name}
                rating={wall.rating.averageRating}
            />
            <Root Content={BoulderList} />
        </>
    );
}

export default WallIndex;

export async function loader({ params }: any) {
    try {
        const { data } = await axios.get(
            `http://localhost:3000/gyms/${params.gymId}/walls/${params.wallId}`
        );
        return data.wall;
    } catch (err) {
        console.log(err);
        throw new Error("error");
    }
}
