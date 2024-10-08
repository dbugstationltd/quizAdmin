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
import RolePermission from "../pages/RolePermission";
import Admins from "../pages/Admins";
import Notification from "../pages/Notification";
import CreateRolePermission from "../pages/CreateRolePermission";
import EditRolePermission from "../pages/EditRolePermission";
import SubDomain from "../pages/SubDomain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "category", element: <Category /> },
      { path: "sub-category", element: <SubCategory /> },
      { path: "sub-category/:id", element: <Quiz /> },
      { path: "notification", element: <Notification /> },
      { path: "role-permission", element: <RolePermission /> },
      { path: "role-permission/create", element: <CreateRolePermission /> },
      { path: "role-permission/:id", element: <EditRolePermission /> },
      { path: "admins", element: <Admins /> },
      { path: "sub-domain", element: <SubDomain /> },
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
