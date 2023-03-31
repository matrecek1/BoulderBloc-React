import { ActionFunctionArgs, json, redirect, useNavigate } from "react-router-dom";
import axios from "axios";


export const rateGymAction = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const rating = Object.fromEntries(formData);
    console.log(rating);
    try {
        const url = `http://localhost:3000/gyms/${params.gymId}/ratings`
        const response = await axios.patch(url, rating);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { message } = error;
            const { status } = error;
            if (status === 400) {
                throw json({ statusText: "Error: Bad Request" }, { status });
            } else {
                throw json({ statusText: `${message}` }, { status });
            }
        } else {
            throw json({ statusText: "Encountered unexpected error!", error });
        }
    }
    return redirect('/gyms')
};
