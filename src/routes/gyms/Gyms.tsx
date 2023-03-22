import { useLoaderData } from "react-router-dom";
import GymList from "../../components/gyms/GymList";
import axios from "axios";

function Gyms({}) {
    return (
        <>
            <GymList />
        </>
    );
}
export async function loader() {
    try {
        const { data } = await axios.get("http://localhost:3000/gyms");
        return data.gyms;
    } catch (err) {
        console.log(err);
        throw new Error("error");
    }
}
export default Gyms;
