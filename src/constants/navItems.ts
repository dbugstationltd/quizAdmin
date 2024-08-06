import {
  AssessmentRounded,
  BarChartRounded,
  CategoryRounded,
  ConfirmationNumberRounded,
  EmojiEventsRounded,
  ForumRounded,
  GridViewRounded,
  GroupsRounded,
  HeadsetMicRounded,
  MarkChatUnreadRounded,
  MarkEmailUnreadRounded,
  NotificationsActiveRounded,
  NotificationsRounded,
  Person2Rounded,
  PieChartRounded,
  SettingsRounded,
  ShowChartRounded
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
    title: "Notification",
    icon: NotificationsRounded,
    subItems: [
      {
        path: "/notification/push-notification",
        title: "Push Notification",
        icon: MarkChatUnreadRounded,
      },
      {
        path: "/notification/email-notification",
        title: "Email Notification",
        icon: MarkEmailUnreadRounded,
      },
      {
        path: "/notification/Reminder-notification",
        title: "Reminder Notification",
        icon: NotificationsActiveRounded,
      },
    ],
  },
  {
    path: "/reward-leaderboard",
    title: "Reward & Leaderboard",
    icon: EmojiEventsRounded,
  },
  {
    title: "Analytics & Report",
    icon: AssessmentRounded,
    subItems: [
      {
        path: "/analytics-reports/user-reports",
        title: "User Reports",
        icon: ShowChartRounded,
      },
      {
        path: "/analytics-reports/engagement",
        title: "Engagement",
        icon: Person2Rounded,
      },
      {
        path: "/analytics-reports/session",
        title: "Session",
        icon: PieChartRounded,
      },
    ],
  },
  {
    title: "Feedback & Support",
    icon: HeadsetMicRounded,
    subItems: [
      {
        path: "/feedback-support/support-ticket",
        title: "Support Ticket",
        icon: ConfirmationNumberRounded,
      },
      {
        path: "/feedback-support/feedback",
        title: "Feedback",
        icon: ForumRounded,
      },
    ],
  },
  {
    path: "/settings",
    title: "Settings",
    icon: SettingsRounded,
  },
];

export default navItems;
