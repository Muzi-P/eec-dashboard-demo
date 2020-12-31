import Dashboard from "./views/Dashboard";
import Notifications from "./views/Notifications.jsx";
import UserProfile from "./views/UserProfile.jsx";
import Settings from "./views/Settings.jsx";
import GenerateSchedule from "./views/GenarateSchedule";
import Schedules from "./views/Schedules";
import DrainageModels from "./views/DrainageModel";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/genarate-schedule",
    name: "Generate Schedule",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-notes",
    component: GenerateSchedule,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/drainage-models",
    name: "Drainage Models",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-calendar-60",
    component: DrainageModels,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-settings-gear-63",
    component: Settings,
    layout: "/admin",
  },
  {
    path: "/schedules",
    name: "Schedules",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-notes",
    component: Schedules,
    layout: "/admin",
  },
];
export default routes;
