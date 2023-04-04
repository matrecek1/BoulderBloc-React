import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-router-dom";
import ReactStars from "react-stars";
import {grades} from "../../types/Gym.types"

const SentBoulderModal: React.FC<{ closeModal: any }> = ({ closeModal }) => {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
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
                        />
                        <div>
                            <label htmlFor="grade">Grade</label>
                            <select
                                name="grade"
                                id="grade">
                                {grades.map((grade) => {
                                    return (
                                        <option
                                            key={grade}
                                            value={grade}>
                                            {grade}
                                        </option>
                                    );
                                })
                                }
                            </select>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={closeModal}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SentBoulderModal;
