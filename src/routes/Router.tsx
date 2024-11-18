import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage"
import AboutPage from "../pages/AboutPage/AboutPage";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/about",
                element: <AboutPage />
            },
            {
                path: "/projects",
                element: <ProjectsPage />
            }
        ]
    }
]);