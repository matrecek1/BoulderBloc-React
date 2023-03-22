import { useLoaderData } from "react-router-dom";
import { IGym, IWall } from "../../types/Gym.types";
import Boulder from "./Boulder";


function BoulderList() {
    const wall = useLoaderData() as IWall;
    return (
        <>
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
                <h3>No walls</h3>
            )}
        </>
    );
}

export default BoulderList;
