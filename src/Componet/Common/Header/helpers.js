import {
  AttachMoney,
  Dashboard,
  Note,
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
    label: "Quotation",
    icon: <Note />,
    path: "/Quotation",
  },
  {
    label: "Customer",
    icon: <PersonAddAlt />,
    path: "/customers",
  },
];
