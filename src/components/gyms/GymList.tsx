import { useLoaderData } from "react-router-dom";
import Gym from "./Gym";
import { IGym } from "../../types/Gym.types";

function GymList() {
    const gyms = useLoaderData() as IGym[];
    return (
        <>
            {gyms.map((gym) => {
                return <Gym key={gym._id} gym={gym} />;
            })}
        </>
    );
}
export default GymList;
