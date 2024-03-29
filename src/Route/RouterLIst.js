import ErrorPage from "../Componet/Common/Component/ErrorPage";
import AddBill from "../Componet/Page/AddBill";
import ChallanPage from "../Componet/Page/AddChallan";
import Admin from "../Componet/Page/Admin";
import Customers from "../Componet/Page/Customers";

import Dashboard from "../Componet/Page/Dashboard";
import Order from "../Componet/Page/Order";
import User from "../Componet/Page/User";

export const routerList = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/add-bill",
    component: AddBill,
  },
  {
    path: "/bill/:id",
    component: AddBill,
  },
  {
    path: "/add-challan",
    component: ChallanPage,
  },
  {
    path: "/challan/:id",
    component: ChallanPage,
  },

  {
    path: "/quotation",
    component: Order,
  },
  {
    path: "/quotation/:id",
    component: Order,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/customer/:id",
    component: User,
  },
  {
    path: "/admin",
    component: Admin,
  },
  {
    path: "*",
    component: ErrorPage,
  },
];
