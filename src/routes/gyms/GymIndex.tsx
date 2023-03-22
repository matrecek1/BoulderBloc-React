import { useLoaderData, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { IGym } from "../../types/Gym.types";
import ReactStars from "react-stars";
import WallList from "../../components/walls/WallList";

function GymIndex() {
    const gym = useLoaderData() as IGym;
    return (
        <>
            <div>
                <h3 className="w-100 text-center mt-1">{gym.name}</h3>
                <div
                    className="mx-auto"
                    style={{ width: "fit-content" }}
                >
                    <ReactStars
                        count={5}
                        value={
                            gym.rating.averageRating !== "Not Rated"
                                ? gym.rating.averageRating
                                : 0
                        }
                        edit={false}
                        size={24}
                        color2={"#ffd700"}
                    />
                </div>
            </div>
            <WallList />
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
