import Dashboard from "./views/Dashboard";
import Notifications from "./views/Notifications.jsx";
import UserProfile from "./views/UserProfile.jsx";
import GenerateSchedule from "./views/GenarateSchedule";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/genarate-schedule",
    name: "Generate Schedule",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-notes",
    component: GenerateSchedule,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  }
];
export default routes;
