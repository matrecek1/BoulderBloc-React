import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Gyms, { loader as gymsLoader } from "./routes/gyms/Gyms";
import GymIndex, { loader as gymIndexLoader } from "./routes/gyms/GymIndex";
import WallIndex, { loader as wallIndexLoader } from "./routes/walls/WallIndex";
import BoulderDetail, {
    loader as boulderIndexLoader,
} from "./routes/boulders/BoulderDetail";
import NewGym, { action as newGymAction } from "./routes/gyms/NewGym";
import NewWall, { action as newWallAction } from "./routes/walls/NewWall";
import NewBoulder, { action as newBoulderAction } from "./routes/boulders/NewBoulder";
import MainErrorElement from "./routes/MainErrorElement";
import { rateGymAction } from "./routes/gyms/features/rateGymAction";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <MainErrorElement />,
        children: [
            {
                path: "/gyms",
                id: "gyms",
                loader: gymsLoader,
                children: [
                    { index: true, element: <Gyms /> },
                    {
                        path: "/gyms/newGym",
                        element: <NewGym />,
                        action: newGymAction,
                    },
                    {
                        path: "/gyms/:gymId",
                        id: "gymIndex",
                        loader: gymIndexLoader,
                        children: [
                            { index: true, element: <GymIndex /> },
                            { path: "gymRating", action: rateGymAction },
                            {
                                path: "walls/newWall",
                                element: <NewWall />,
                                action: newWallAction,
                            },
                            {
                                path: "/gyms/:gymId/walls/:wallId",
                                id: "wallIndex",
                                loader: wallIndexLoader,
                                children: [
                                    { index: true, element: <WallIndex /> },
                                    {
                                        path: "/gyms/:gymId/walls/:wallId/boulders/newBoulder",
                                        element: <NewBoulder />,
                                        action: newBoulderAction,
                                    },
                                    {
                                        path: "/gyms/:gymId/walls/:wallId/boulders/:boulderId",
                                        element: <BoulderDetail />,
                                        loader: boulderIndexLoader,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
