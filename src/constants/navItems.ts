import {
  BarChartRounded,
  CategoryRounded,
  EmojiEventsRounded,
  GridViewRounded,
  GroupsRounded,
  SettingsRounded,
} from "@mui/icons-material";
// import Dashboard from "../assets/icon/dashboard.svg?react";

const navItems = [
  {
    path: "/",
    title: "Dashboard",
    icon: GridViewRounded,
  },
  {
    path: "/user-management",
    title: "User Management",
    icon: GroupsRounded,
  },
  {
    path: "/category",
    title: "Category",
    icon: CategoryRounded,
  },
  {
    path: "/sub-category",
    title: "Sub Category",
    icon: BarChartRounded,
  },
  {
    path: "/reward-leaderboard",
    title: "Reward & Leaderboard",
    icon: EmojiEventsRounded,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: SettingsRounded,
  },
];

export default navItems;
