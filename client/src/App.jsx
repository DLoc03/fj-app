import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { routes, protectedRoutes } from "./routes/index";
import DefaultComponent from "./components/layout/DefaultLayout/index";
import PrivateRoute from "./routes/ProtectedRoutes";
import DefaultProfile from "./components/layout/DefaultLayout/profile";

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

        <Route element={<PrivateRoute />}>
          {protectedRoutes.map(({ path, page: Page }) => (
            <Route
              key={path}
              path={path}
              element={
                <DefaultProfile>
                  <Page />
                </DefaultProfile>
              }
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
