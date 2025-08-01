import { createBrowserRouter } from "react-router-dom";
import Layout from "../modules/Layout";
import AnimePage from "../modules/AnimePage/AnimePage";
import SingleAnime from "../modules/AnimePage/SingleAnime";
import NotFound from "../components/NotFound";
import FilterPage from "../modules/AnimePage/FilterPage";
import HomePage from "../modules/HomePage/HomePage";
const PublicRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "page/:page",
        element: <AnimePage />,
      },
      {
        path: "your-anime",
        element: <FilterPage />,
      },
      {
        path: "details/:id",
        element: <SingleAnime />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default PublicRouter;

// const PublicRouter = createBrowserRouter([
//     {
//         path: "/",
//         element: <Layout />
//     },
//     {
//         path: "/:page",
//         element: <AnimePage />
//     },
//     {
//         path: "/your-anime",
//         element: <FilterPage />
//     },
//     {
//         path: "/details/:id",
//         element: <SingleAnime />
//     },
//     {
//         path: "*",
//         element: <NotFound />,
//     }
// ])