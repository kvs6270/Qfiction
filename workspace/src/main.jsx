import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/Pages/HomePage.jsx";
import { HomeLayout } from "./components/Pages/HomeLayout.jsx";
import { HomeGridView } from "./components/Pages/HomeGridView.jsx";
import { MovieView } from "./components/Pages/MovieView.jsx";
import { WatchList } from "./components/Cogs/watchlist.jsx";
import { WatchedList } from "./components/Cogs/watched.jsx";
// import {};
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
