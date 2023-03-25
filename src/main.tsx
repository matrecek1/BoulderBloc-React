import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    Link,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Gyms, { loader as gymsLoader } from "./routes/gyms/Gyms";
import GymIndex, { loader as gymIndexLoader } from "./routes/gyms/GymIndex";
import WallIndex, {
    loader as wallIndexLoader,
} from "./components/walls/WallIndex";
import BoulderDetail, {
    loader as boulderIndexLoader,
} from "./routes/boulders/BoulderDetail";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/gyms",
                id: "gyms",
                loader: gymsLoader,
                children: [
                    { index: true, element: <Gyms /> },
                    {
                        path: "/gyms/:gymId",
                        id: "gymIndex",
                        loader: gymIndexLoader,
                        children: [
                            { index: true, element: <GymIndex /> },
                            {
                                path: "/gyms/:gymId/walls/:wallId",
                                id: "wallIndex",
                                loader: wallIndexLoader,
                                children: [
                                    { index: true, element: <WallIndex /> },
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
