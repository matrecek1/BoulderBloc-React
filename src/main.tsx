import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Root from "./routes/Root";
import Gyms, { loader as gymsLoader } from "./routes/gyms/Gyms";
import GymIndex, { loader as gymIndexLoader } from "./routes/gyms/GymIndex";
import WallIndex, { loader as wallIndexLoader } from "./components/walls/WallIndex";
import BoulderDetail, {loader as boulderIndexLoader} from "./routes/boulders/BoulderDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/gyms",
                element: <Gyms />,
                loader: gymsLoader,
            },
            {
                path: "/gyms/:gymId",
                element: <GymIndex />,
                loader: gymIndexLoader,
            },
            {
                path: "/gyms/:gymId/walls/:wallId",
                element: <WallIndex />,
                loader: wallIndexLoader,
            },
        ],
    },
    { path: "/gyms/:gymId/walls/:wallId/boulders/:boulderId", element:<BoulderDetail/>, loader: boulderIndexLoader },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
