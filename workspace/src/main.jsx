import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/Pages/HomePage.jsx";
import { HomeLayout } from "./components/Pages/HomeLayout.jsx";
import { HomeGridView } from "./components/Pages/HomeGridView.jsx";
import { MovieView } from "./components/Pages/MovieView.jsx";
import { WatchList } from "./components/Pages/watchlist.jsx";
import { WatchedList } from "./components/Pages/watched.jsx";
import { Welcome } from "./components/Pages/Welcome.jsx";
// import {};
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome/>,

  },
  {
    path: "Home",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {path: "TopRated/:identifier", element: <HomeGridView />}
      
    ],
  },
  {
    path: "Movie/:id",
    element: <MovieView/>

  },
  {
    path: "Watched",
    element: <WatchedList/>

  },
  {
    path: "ToWatch",
    element: <WatchList/>

  }

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>
);
