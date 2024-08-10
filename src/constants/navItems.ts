import {
  BarChartRounded,
  CategoryRounded,
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
    path: "/settings",
    title: "Settings",
    icon: SettingsRounded,
  },
];

export default navItems;
