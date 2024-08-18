import {
  AccessibilityNewRounded,
  BarChartRounded,
  CategoryRounded,
  GridViewRounded,
  GroupsRounded,
  SettingsRounded,
  SupervisorAccountRounded,
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
    path: "/role-permission",
    title: "Role & Permission",
    icon: AccessibilityNewRounded,
  },
  {
    path: "/admins",
    title: "Admins",
    icon: SupervisorAccountRounded,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: SettingsRounded,
  },
];

export default navItems;
