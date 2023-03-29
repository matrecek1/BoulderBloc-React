import { useRouteLoaderData, Link } from "react-router-dom";
import { IGym } from "../../types/Gym.types";
import Wall from "./Wall";

function WallList() {
    const gym = useRouteLoaderData("gymIndex") as IGym;
    return (
        <>
            <Link
                to={"walls/newWall"}
                className="btn btn-danger w-100 mb-3 fs-3">
                New Wall
            </Link>
            {gym.walls && gym.walls.length > 0 ? (
                gym.walls.map((wall) => {
                    return (
                        <Wall
                            wall={wall}
                            key={wall._id}
                        />
                    );
                })
            ) : (
                <h3>No walls</h3>
            )}
        </>
    );
}

export default WallList;
