import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Root from "./routes/Root";
import Gyms, { loader as gymsLoader } from "./routes/gyms/Gyms";
import GymIndex, { loader as gymIndexLoader } from "./routes/gyms/GymIndex";
import WallIndex, { loader as wallIndexLoader } from "./components/walls/WallIndex";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Gyms />,
                loader: gymsLoader,
            },
            { path: "/:gymId", element: <GymIndex />, loader: gymIndexLoader },
            {
                path: "/:gymId/:wallId",
                element: <WallIndex />,
                loader: wallIndexLoader
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
