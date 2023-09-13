import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Componet/Common/Header";
import Provider from "./Componet/Common/theme/index";
import { routerList } from "./Route/RouterLIst";
import Dashboard from "./Componet/Page/Dashboard";
import { Box } from "@mui/material";
import AuthContextProvider from "./globalContext/authProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header />
            <ToastContainer />
            <Box sx={{ padding: { xs: "20px 20px", lg: "20px 40px" } }}>
              <Routes>
                {routerList.map(({ path, component: Component }, index) => (
                  <Route key={index} path={path} element={<Component />} />
                ))}
              </Routes>
            </Box>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
