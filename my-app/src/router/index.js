import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthTabs from "../components/AuthTabs/AuthTabs";
import Chart from "../components/Chart/Chart";
import { RequireAuth } from "../components/RequireAuth/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <AuthTabs />,
    index: true,
  },
  {
    path: "/charts",
    element: (
      <RequireAuth>
        <Chart />
      </RequireAuth>
    ),
  },
]);
