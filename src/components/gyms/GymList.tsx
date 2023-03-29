import { useRouteLoaderData, Link } from "react-router-dom";
import Gym from "./Gym";
import { IGym } from "../../types/Gym.types";
import { Button } from "react-bootstrap";

function GymList() {
    const gyms = useRouteLoaderData("gyms") as IGym[];
    return (
        <>
        <Link to={"newGym"} className="btn btn-danger w-100 mb-3 fs-3">New Gym</Link>
            {gyms.map((gym) => {
                return <Gym key={gym._id} gym={gym} />;
            })}
        </>
    );
}
export default GymList;
