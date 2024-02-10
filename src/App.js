import Provider from "./Componet/Common/theme/index";

import AuthContextProvider from "./globalContext/authProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Router from "./Router";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  // const navigation = useNavigate();
  // console.log({ navigation });
  return (
    <Provider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <Router />
        </QueryClientProvider>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
