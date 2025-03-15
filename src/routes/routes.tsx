import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import Home from "../page/home";
import Detail from "../page/detail";
import CatchPokemon from "../page/catch";
import MyPokemon from "../page/myPokemon";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Detail />,
        path: "/:id",
      },
      {
        element: <CatchPokemon/>,
        path: "/:id/catch"
      },
      {
        element: <MyPokemon/>,
        path: "/my-pokemon"
      }
    ],
  },
]);
