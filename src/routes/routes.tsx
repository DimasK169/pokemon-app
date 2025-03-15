import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import Home from "../page/home";
import Detail from "../page/detail";

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
        path: "/detail/",
      },
    ],
  },
]);
