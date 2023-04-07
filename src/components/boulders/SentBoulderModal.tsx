import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, useLoaderData, useParams, useSubmit } from "react-router-dom";
import ReactStars from "react-stars";
import { IBoulder } from "../../types/Gym.types";
import { grades } from "../../types/Gym.types";
import { Stack } from "react-bootstrap";

const SentBoulderModal: React.FC<{ closeModal: any }> = ({ closeModal }) => {
    const params = useParams()
    const submit = useSubmit()
    const [rating, setRating] = useState(0);
    const boulder = useLoaderData() as IBoulder;

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(rating);
        console.log(e.target.grade.value);
        const formData = new FormData();
        formData.append("bGrade", e.target.grade.value);
        formData.append("rating", rating.toString());
        submit(formData, { action:`/gyms/${params.gymId}/walls/${params.wallId}/boulders/${params.boulderId}`, method: "post"})
        closeModal();
    };

    return (
        <>
            <Modal
                show={true}
                onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Rate the boulder!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <ReactStars
                            count={5}
                            value={rating}
                            edit={true}
                            size={56}
                            color2={"#ffd700"}
                            onChange={handleRatingChange}
                            className="mb-1"
                        />
                        <div className="mb-3">
                            <label
                                className="form-label"
                                htmlFor="grade">
                                Grade:
                            </label>
                            <select
                                name="grade"
                                id="grade"
                                size={3}
                                defaultValue={boulder.grade.activeGrade}
                                className="form-control">
                                {grades.map((grade) => {
                                    return (
                                        <option
                                            key={grade}
                                            value={grade}>
                                            {grade}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <Stack>
                            <Button
                                className="mb-3"
                                variant="danger"
                                onClick={closeModal}>
                                Close
                            </Button>
                            <Button
                                className=""
                                variant="warning"
                                type="submit">
                                Save Changes
                            </Button>
                        </Stack>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SentBoulderModal;
