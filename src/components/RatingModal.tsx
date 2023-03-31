import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-router-dom";
import ReactStars from "react-stars";


const RatingModal: React.FC<{handleSubmit:any,rating:number,closeModal:any, handleRatingChange:any}> = ({handleSubmit,rating,closeModal, handleRatingChange}) => {
    return (
        <>
            <Modal
                show={true}
                onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Rate the Gym!</Modal.Title>
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

export default RatingModal;
