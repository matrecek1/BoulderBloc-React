import { useRouteLoaderData, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { IGym } from "../../types/Gym.types";
import ReactStars from "react-stars";
import WallList from "../../components/walls/WallList";
import Root from "../Root";
import MainNav from "../../components/MainNav";

function GymIndex() {
    const gym = useRouteLoaderData("gymIndex") as IGym;
    return (
        <>
        <MainNav header={gym.name} rating={gym.rating.averageRating}/>
        <Root Content={WallList}/>
        </>
    );
}
export async function loader({ params }: any) {
    try {
        const { data } = await axios.get(
            "http://localhost:3000/gyms/" + params.gymId
        );
        return data.gym;
    } catch (err) {
        console.log(err);
        throw new Error("error");
    }
}

export default GymIndex;
