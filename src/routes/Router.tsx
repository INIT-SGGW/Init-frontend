import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage"
import AboutPage from "../pages/AboutPage/AboutPage";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import ProjectPage from "../pages/ProjectPage/ProjectPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

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
                path: "/projekty",
                element: <ProjectsPage />
            },
            {
                path: "/projekty/:projectName",
                element: <ProjectPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
]);