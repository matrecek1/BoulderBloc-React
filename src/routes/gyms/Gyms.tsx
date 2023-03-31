import GymList from "../../components/gyms/GymList";
import axios, { AxiosError } from "axios";
import Root from "../../components/Root";
import MainNav from "../../components/MainNav";
import { ActionFunctionArgs, json } from "react-router-dom";

function Gyms({}) {
    return (
        <>
            <MainNav
                header={null}
                rating={null}
            />
            <Root Content={GymList} />
        </>
    );
}
export async function loader() {
    try {
        const { data } = await axios.get("http://localhost:3000/gyms");
        return data.gyms;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { message } = error;
            const { status } = error;
            if (status === 400) {
                throw json({ statusText: "Error: Bad Request" }, { status});
            } else {
                throw json({ statusText: `${message}` }, { status });
            }
        } else {
            throw json({ statusText: "Encountered unexpected error!", error });
        }
    }
}


export default Gyms;
