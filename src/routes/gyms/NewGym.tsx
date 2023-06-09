import axios from "axios";
import { useFormik, Formik, Field } from "formik";
import { Container, Row, Col, Form, FormGroup, Button } from "react-bootstrap";
import { ActionFunctionArgs, json, redirect, useNavigate, useNavigation, useSubmit } from "react-router-dom";
import MainNav from "../../components/MainNav";
import WideButton from "../../components/WideButton";
import WideButtonSubmiting from "../../components/WideButtonSubmiting";
import { newGymSchema } from "../../schemas/formValidationSchemas";

const NewGym: React.FC = () => {
    const submit = useSubmit()
    const navigation = useNavigation()
    return (
        <>
            <MainNav
                header={"BoulderBlocApp"}
                rating={null}
            />
            <Container
                fluid
                className="w-100 h-100 mx-auto">
                <Formik
                    validationSchema={newGymSchema}
                    onSubmit={(values) => {
                        return submit(values, { method: "post" });
                    }}
                    initialValues={{
                        name: "",
                        description: "",
                    }}>
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors,
                    }) => (
                        <Form
                            className="mt-3"
                            noValidate
                            onSubmit={handleSubmit}>
                            <Form.Group
                                className="mb-3 fs-5 fw-semibold"
                                controlId="formGroupName">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    placeholder="Enter gym name."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.name && !!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 fs-5 fw-semibold"
                                controlId="formGroupDescription">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    placeholder="Enter description."
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={
                                        touched.description && !!errors.description
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {navigation.state === "submitting" ? (
                                <WideButtonSubmiting text="submitting"/>
                            ) : (
                                <WideButton text="Submit!"/>
                            )}
                        </Form>
                    )}
                </Formik>
            </Container>
        </>
    );
};
export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    try {
        const response = await axios.post("http://localhost:3000/gyms", values);
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

export default NewGym;
