import { useLoaderData } from "react-router-dom";
import { IGym } from "../../types/Gym.types";
import Wall from "./Wall";

function WallList() {
    const gym = useLoaderData() as IGym;
    return (
        <>
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
