import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import PublicRoute from "./PublicRoute";
import ResetPassword from "../pages/ResetPassword";
import UserManagement from "../pages/UserManagement";
import Quiz from "../pages/Quiz";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import Leaderboard from "../pages/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "/category", element: <Category /> },
      { path: "/sub-category", element: <SubCategory /> },
      { path: "sub-category/:id", element: <Quiz /> },
      { path: "reward-leaderboard", element: <Leaderboard /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },
]);

export default router;
