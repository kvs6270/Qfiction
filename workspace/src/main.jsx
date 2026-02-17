import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "./components/Pages/HomePage.jsx";
import { HomePageMovieView } from "./components/Pages/HomePageMovieView.jsx";
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
     element: <IntroPage />,
    
  },
    {
    path: "Home",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ":type:identifier", element: <HomePageMovieView /> }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
