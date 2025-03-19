import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./global.css";
import { routes } from "./routes/index";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { ProtectedRoute } from "./utils/ProtectRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {routes.map(({ path, page: Page, protected: isProtected }) => (
              <Route
                key={path}
                path={path}
                element={
                  <DefaultComponent>
                    {isProtected ? (
                      <ProtectedRoute>
                        <Page />
                      </ProtectedRoute>
                    ) : (
                      <Page />
                    )}
                  </DefaultComponent>
                }
              />
            ))}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
