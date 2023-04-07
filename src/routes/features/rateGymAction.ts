import { ActionFunctionArgs, json, redirect, useNavigate } from "react-router-dom";
import axios from "axios";


export const rateGymAction = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const rating = Object.fromEntries(formData);
    try {
        const getResponse = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const url = `http://localhost:3000/gyms/${params.gymId}/ratings`
                    axios.patch(url, rating)
                        .then((response) => {
                            resolve(response);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }, 3000);
            });
        }
        const response = await getResponse();
        return response
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
};
