import { useRouteLoaderData, Link, useSubmit, useFetcher } from "react-router-dom";
import Gym from "./Gym";
import { IGym, RatingSubmissionState } from "../../types/Gym.types";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import RatingModal from "../RatingModal";

function GymList() {
    const gyms = useRouteLoaderData("gyms") as IGym[];
    const fetcher = useFetcher();

    const [showModal, setShowModal] = useState(false);
    const [currentlyRated, setCurrentlyRated] = useState("");
    const [rating, setRating] = useState(0);

    const handleCloseModal = () => {
        return setShowModal(false);
    };
    const handleShowModal = (event: any) => {
        setCurrentlyRated(event.target.parentNode.id);
        return setShowModal(true);
    };

    useEffect(() => {
    }, [fetcher.state]);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };
    const handleModalSubmit = () => {
        fetcher.submit(
            { rating: rating.toString() },
            { method: "post", action: `/gyms/${currentlyRated}/gymRating` }
        );
        handleCloseModal();
    };
    
    return (
        <>
            {showModal && (
                <RatingModal
                    handleSubmit={handleModalSubmit}
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                    closeModal={handleCloseModal}
                />
            )}
            <Link
                to={"newGym"}
                className="btn btn-danger w-100 mb-3 fs-3">
                New Gym
            </Link>
            {gyms.map((gym) => {
                const isBeingRated = ():RatingSubmissionState => {
                    if (currentlyRated === gym._id) {
                        if (fetcher.state !== "idle") {
                            return "submitting";
                        }
                        if (fetcher.state === "idle") {
                            if(fetcher.data){
                                if(fetcher.data.status === 201){
                                    return "submitted";
                                } else {
                                    return "failedSubmit";
                                }
                            }
                        }
                    } 
                    return "idle";
                }
                return (
                    <Gym
                        key={gym._id}
                        gym={gym}
                        showRatingModal={handleShowModal}
                        ratingState={isBeingRated()}
                    />
                );
            })}
        </>
    );
}
export default GymList;
