import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { routes, protectedRoutes } from "./routes/index";
import DefaultComponent from "./components/layout/DefaultLayout/index";
import PrivateRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, page: Page }) => (
          <Route
            key={path}
            path={path}
            element={
              <DefaultComponent>
                <Page />
              </DefaultComponent>
            }
          />
        ))}

        {protectedRoutes.map(({ path, page: Page }) => (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute>
                <DefaultComponent>
                  <Page />
                </DefaultComponent>
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
