import { useRouteLoaderData, Link } from "react-router-dom";
import { IGym, IWall } from "../../types/Gym.types";
import Boulder from "./Boulder";


function BoulderList() {
    const wall = useRouteLoaderData("wallIndex") as IWall;
    return (
        <>
            <Link
                to={"boulders/newBoulder"}
                className="btn btn-danger w-100 mb-3 fs-3">
                New Boulder
            </Link>
            {wall.boulders && wall.boulders.length > 0 ? (
                wall.boulders.map((boulder) => {
                    return (
                        <Boulder
                            boulder={boulder}
                            key={boulder._id}
                        />
                    );
                })
            ) : (
                <h3>No Boulders</h3>
            )}
        </>
    );
}

export default BoulderList;
