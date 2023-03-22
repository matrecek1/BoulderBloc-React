import axios from "axios";
import BoulderList from "../boulders/BoulderList";

function WallIndex() {
    return (
        <>
            <BoulderList />
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
