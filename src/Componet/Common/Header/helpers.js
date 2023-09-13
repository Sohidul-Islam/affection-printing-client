import {
  AttachMoney,
  Dashboard,
  PersonAddAlt,
  Receipt,
  ShoppingBag,
} from "@mui/icons-material";

export const menuList = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    path: "/",
  },
  {
    label: "Add Bill",
    icon: <AttachMoney />,
    path: "/add-bill",
  },
  {
    label: "Add Challan",
    icon: <Receipt />,
    path: "/add-challan",
  },
  {
    label: "Order",
    icon: <ShoppingBag />,
    path: "/order",
  },
  {
    label: "Customer",
    icon: <PersonAddAlt />,
    path: "/customers",
  },
];
