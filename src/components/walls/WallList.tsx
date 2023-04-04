import { useRouteLoaderData, Link, useFetcher, useParams } from "react-router-dom";
import { IGym, RatingSubmissionState } from "../../types/Gym.types";
import Wall from "./Wall";
import { useEffect, useState } from "react";
import RatingModal from "../RatingModal";

function WallList() {
    const gym = useRouteLoaderData("gymIndex") as IGym;
    const {gymId} = useParams()
    const fetcher = useFetcher();

    const [showModal, setShowModal] = useState(false);
    const [currentlyRated, setCurrentlyRated] = useState("");
    const [rating, setRating] = useState(0);

    const handleCloseModal = () => {
        return setShowModal(false);
    };
    const handleShowModal = (event: any) => {
        console.log(event.target.parentNode.id);
        setCurrentlyRated(event.target.parentNode.id);
        return setShowModal(true);
    };

    useEffect(() => {}, [fetcher.state]);

    const handleRatingChange = (newRating: number) => {
        console.log(newRating);
        setRating(newRating);
    };
    const handleModalSubmit = () => {
        fetcher.submit(
            { rating: rating.toString() },
            { method: "post", action: `/gyms/${gymId}/walls/${currentlyRated}/wallRating` }
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
                to={"walls/newWall"}
                className="btn btn-danger w-100 mb-3 fs-3">
                New Wall
            </Link>
            {gym.walls && gym.walls.length > 0 ? (
                gym.walls.map((wall) => {
                    const isBeingRated = (): RatingSubmissionState => {
                        if (currentlyRated === wall._id) {
                            if (fetcher.state !== "idle") {
                                return "submitting";
                            }
                            if (fetcher.state === "idle") {
                                if (fetcher.data) {
                                    if (fetcher.data.status === 201) {
                                        return "submitted";
                                    } else {
                                        return "failedSubmit";
                                    }
                                }
                            }
                        }
                        return "idle";
                    };
                    return (
                        <Wall
                            wall={wall}
                            key={wall._id}
                            showRatingModal={handleShowModal}
                            ratingState={isBeingRated()}
                        />
                    );
                })
            ) : (
                <h3>No walls</h3>
            )}
        </>
    );
}

export default WallList;
