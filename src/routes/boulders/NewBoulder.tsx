import axios from "axios";
import { useFormik} from "formik";
import { Container, Form} from "react-bootstrap";
import {
    ActionFunctionArgs,
    json,
    redirect,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import MainNav from "../../components/MainNav";
import WideButton from "../../components/WideButton";
import WideButtonSubmiting from "../../components/WideButtonSubmiting";
import { newBoulderSchema } from "../../schemas/formValidationSchemas";
import { grades } from "../../types/Gym.types";

const NewBoulder: React.FC = () => {
    const submit = useSubmit();
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            image: "",
            bGrade: "7A",
        },
        validationSchema: newBoulderSchema,
        onSubmit: (values) => {
            console.log(values);
            return submit({image:values.image}, {method:"post"})
        },
    });
    return (
        <>
            <MainNav
                header={"BoulderBlocApp"}
                rating={null}
            />
            <Container
                fluid
                className="w-100 h-100 mx-auto">
                <Form
                    onSubmit={formik.handleSubmit}
                    encType="multipart/form-data"
                    noValidate>
                    <Form.Group
                        className="mb-3 mt-3"
                        controlId="boulderForm.name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.name && !!formik.errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="boulderForm.description">
                        <Form.Label>description</Form.Label>
                        <Form.Control
                            className="form-control"
                            type="text"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                formik.touched.description && !!formik.errors.description
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="boulderForm.bGrade">
                        <Form.Label>Choose boulder grade:</Form.Label>
                        <Form.Select
                            className={
                                formik.touched.bGrade && formik.errors.bGrade
                                    ? "form-select is-invalid"
                                    : "form-select"
                            }
                            id="bGrade"
                            name="bGrade"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.bGrade && !!formik.errors.bGrade}
                            value={formik.values.bGrade}>
                            {grades.map((grade) => {
                                return (
                                    <option
                                        key={grade}
                                        value={grade}>
                                        {grade}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.bGrade}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="mb-3">
                        <label className="form-label">Choose boulder image:</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className={`form-control  ${
                                formik.touched.image && formik.errors.image
                                    ? "is-invalid"
                                    : ""
                            }`}
                            onBlur={formik.handleBlur}
                            onChange={(e) => {
                                formik.setFieldValue("image", e.currentTarget.files![0]);
                            }}
                        />
                        {formik.touched.image && formik.errors.image ? (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.image}
                            </Form.Control.Feedback>
                        ) : null}
                    </div>
                    <WideButton text="Submit" />
                </Form>
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
                throw json({ message: "Error: Bad Request" }, { status: 400 });
            } else {
                throw json({ message: `${message}` }, { status });
            }
        } else {
            throw json({ message: "Encountered unexpected error!", error });
        }
    }
    return redirect(`/gyms/${params.gymId}/walls/${params.wallId}`);
};

export default NewBoulder;
