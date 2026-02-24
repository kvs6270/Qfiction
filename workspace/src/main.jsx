import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/Pages/HomePage.jsx";
import { HomeLayout } from "./components/Pages/HomeLayout.jsx";
import { HomePageMovieView } from "./components/Pages/HomePageMovieView.jsx";
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
     element: <div>Welcome</div>,
    
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
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>
);
