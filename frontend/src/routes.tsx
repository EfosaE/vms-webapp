import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";


const router = createBrowserRouter([
  // {
  //   path: "/",
  //   Component: Root,
  //   errorElement: <ErrorPage />, // Handles errors
  //   children: [
  //     {
  //       path: "shows/:showId",
  //       Component: Show,
  //       loader: async ({ request, params }) => {
  //         const response = await fetch(`/api/show/${params.showId}.json`, {
  //           signal: request.signal,
  //         });
  //         if (!response.ok) throw new Response("Not Found", { status: 404 });
  //         return response.json();
  //       },
  //     },
  //   ],
  // },
  {
    path:"/login",
    Component: Login,
  }
]);

export default router;
