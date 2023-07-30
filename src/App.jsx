import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ROUTES } from "./constants/ROUTES";
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  const user = {
    role: "CLIENT",
  };

  return (
    <div>
      <Routes>
        {ROUTES.map(
          (route) =>
            route.roles.find((role) => role === user.role) && (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            )
        )}
      </Routes>
      <ToastContainer />
      <Analytics />
    </div>
  );
};

export default App;
