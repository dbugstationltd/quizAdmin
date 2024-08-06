import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import PublicRoute from "./PublicRoute";
import ResetPassword from "../pages/ResetPassword";
import Level from "../pages/Level";
import GrammerQuizzes from "../pages/GrammerQuizzes";
import UserManagement from "../pages/UserManagement";
import LevelQuestions from "../pages/LevelQuestions";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import Story from "../pages/Story";
import Leaderboard from "../pages/Leaderboard";
import Feedback from "../pages/Feedback";
import SupportTicket from "../pages/SupportTicket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "/category", element: <Category /> },
      { path: "/sub-category", element: <SubCategory /> },
      { path: "content-management/level", element: <Level /> },
      { path: "content-management/level/:id", element: <LevelQuestions /> },
      { path: "content-management/quizzes", element: <GrammerQuizzes /> },
      { path: "content-management/story", element: <Story /> },
      { path: "reward-leaderboard", element: <Leaderboard /> },
      { path: "feedback-support/support-ticket", element: <SupportTicket /> },
      { path: "feedback-support/feedback", element: <Feedback /> },
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
