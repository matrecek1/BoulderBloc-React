import axios from "axios";
import { Formik} from "formik";
import { Container, Row, Col, Form, FormGroup, Button } from "react-bootstrap";
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
import { newWallSchema } from "../../schemas/formValidationSchemas";

const NewWall: React.FC = () => {
    const submit = useSubmit();
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
                    validationSchema={newWallSchema}
                    onSubmit={(values) => {
                        return submit(values, { method: "post" });
                    }}
                    initialValues={{
                        name: "",
                        description: "",
                        angle: "",
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
                                    placeholder="Enter Wall name."
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
                            <Form.Group
                                className="mb-3 fs-5 fw-semibold"
                                controlId="formGroupAngle">
                                <Form.Label>Angle:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="angle"
                                    value={values.angle}
                                    placeholder="Enter angle of wall."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.angle && !!errors.angle}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.angle}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {navigation.state === "submitting" ? (
                                <WideButtonSubmiting text="Submitting!"/>
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
export const action = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    console.log(values);
    console.log('params :>> ', params);
    try {
        axios
            .post(`http://localhost:3000/gyms/${params.gymId}/walls`, values)
            .then((response) => {
                console.log(response.data.savedWall);
                //Maybe flash message with respnose?
            })
            .catch((error) => {
                const errorResponse = error.response;
                const errorMessage = errorResponse.data.error;
                const statusCode = errorResponse.status;
                if (statusCode === 400) {
                    throw json({ message: "Error: Bad Request" }, { status: 400 });
                } else if (statusCode === 401) {
                    throw json({ message: `Error: Unauthorized` }, { status: 401 });
                } else {
                    throw json({ message: `${errorMessage}` });
                }
            });
    } catch (error) {
        throw json({ message: "Error: Failed to create Wall." });
    }
    return redirect(`/gyms/${params.gymId}/walls`);
};

export default NewWall;
