import axios from "axios";
import { useFormik, Formik, Field, ErrorMessage } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import {
    ActionFunctionArgs,
    json,
    redirect,
    useNavigate,
    useNavigation,
    useParams,
    useSubmit,
} from "react-router-dom";
import MainNav from "../../components/MainNav";
import WideButton from "../../components/WideButton";
import WideButtonSubmiting from "../../components/WideButtonSubmiting";
import { newBoulderSchema } from "../../schemas/formValidationSchemas";
import { grades } from "../../types/Gym.types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const NewBoulder: React.FC = () => {
    const navigate = useNavigate();
    const { gymId, wallId } = useParams();

    const [file, setFile] = useState(null);
    const [invalidFile, setInvalidFile] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    type FormData = yup.InferType<typeof newBoulderSchema>;
    
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(newBoulderSchema) });

    const handleFileUpload = (event: any) => {
        if (event.target.files[0].size > 3000000) {
            setInvalidFile(true);
            event.target.value = null
        } else {
            setInvalidFile(false)
            setFile(event.target.files[0]);
        }
    };

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("bGrade", data.bGrade);
        formData.append("image", file!);
        try {
            setSubmitting(true)
            setTimeout(async() => {
                const response = await axios.post(
                    `http://localhost:3000/gyms/${gymId}/walls/${wallId}/boulders`,
                    formData
                );
                setSubmitting(false)
                navigate(`/gyms/${gymId}/walls/${wallId}`);
            }, 1000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { message } = error;
                const { status } = error;
                if (status === 400) {
                    throw json({ message: "Error: Bad Request" }, { status: 400 });
                } else {
                    throw json({ message: `${message}` }, { status });
                }
            } else {
                throw json({ message: "Encountered unexpected error!", error });
            }
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        trigger(event.target.name as keyof FormData);
    };

    return (
        <>
            <MainNav
                header={"BoulderBlocApp"}
                rating={null}
            />
            <Container
                fluid
                className="my-3 w-100 h-100">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                    method="post">
                    <div>
                        <label
                            className="form-label"
                            htmlFor="name">
                            Boulder name:
                        </label>
                        <input
                            className={`form-control ${
                                errors.name?.message ? "is-invalid" : ""
                            }`}
                            type="text"
                            id="name"
                            autoComplete="off"
                            {...register("name", { required: true })}
                            onBlur={handleBlur}
                        />
                        <div className="invalid-feedback">{errors.name?.message}</div>
                    </div>
                    <div>
                        <label
                            className="form-label"
                            htmlFor="description">
                            Write description:
                        </label>
                        <input
                            className={`form-control ${
                                errors.name?.message ? "is-invalid" : ""
                            }`}
                            type="text"
                            id="description"
                            autoComplete="off"
                            {...register("description", { required: true })}
                            onBlur={handleBlur}
                        />
                        <div className="invalid-feedback">
                            {errors.description?.message}
                        </div>
                    </div>
                    <div>
                        <label
                            className="form-label"
                            htmlFor="bGrade">
                            Choose grade:
                        </label>
                        <input
                            className={`form-control ${
                                errors.bGrade?.message ? "is-invalid" : ""
                            }`}
                            type="text"
                            id="bGrade"
                            autoComplete="off"
                            {...register("bGrade", { required: true })}
                            onBlur={handleBlur}
                        />
                        <div className="invalid-feedback">{errors.bGrade?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label
                            className="form-label"
                            htmlFor="file">
                            Choose image:
                        </label>
                        <input
                            className={`form-control ${invalidFile ? "is-invalid" : ""}`}
                            type="file"
                            id="file"
                            onChange={handleFileUpload}
                            required
                        />
                        <div className="invalid-feedback">File is to large! Maximum is 3 mb.</div>
                    </div>
                    {submitting ? (
                        <WideButtonSubmiting text="Submitting.." />
                    ) : (
                        <WideButton text="Submit" />
                    )}
                </form>
            </Container>
        </>
    );
};
export const action = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    try {
        console.log(values);
        //const response = await axios.post(
        //   `http://localhost:3000/gyms/${params.gymId}/walls/${params.wallId}/boulders`,
        //   values
        //);
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
    return redirect(`/gyms/${params.gymId}/walls/${params.wallId}`);
};

export default NewBoulder;
