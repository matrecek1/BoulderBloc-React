import { useRouteLoaderData, Link, useSubmit } from "react-router-dom";
import Gym from "./Gym";
import { IGym } from "../../types/Gym.types";
import { Button } from "react-bootstrap";
import { useState } from "react";
import RatingModal from "../RatingModal";

function GymList() {
    const gyms = useRouteLoaderData("gyms") as IGym[];
    const submit = useSubmit()

    const [showModal, setShowModal] = useState(false);
    const [currentlyRated, setCurrentlyRated] = useState("");
    const [currentRating, setCurrentRating] = useState(0);


    const handleCloseModal = () => {
        setCurrentlyRated("")
        return setShowModal(false);
    };
    const handleShowModal = (event: any) => {
        console.log(event.target.parentNode.id);
        setCurrentlyRated(event.target.parentNode.id);
        return setShowModal(true);
    };

    const handleRatingChange = (newRating:number) =>{
        setCurrentRating(newRating)
    }

    const handleModalSubmit = () =>{
        return submit({rating:currentRating.toString()}, {method:"post", action: `/gyms/${currentlyRated}/gymRating`})
    }

    return (
        <>
            {showModal && <RatingModal handleSubmit={handleModalSubmit} rating={currentRating} handleRatingChange={handleRatingChange} closeModal={handleCloseModal} />}
            <Link
                to={"newGym"}
                className="btn btn-danger w-100 mb-3 fs-3">
                New Gym
            </Link>
            {gyms.map((gym) => {
                return (
                    <Gym
                        key={gym._id}
                        gym={gym}
                        showRatingModal={handleShowModal}
                    />
                );
            })}
        </>
    );
}
export default GymList;
