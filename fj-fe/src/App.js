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
      <div className="App">
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = DefaultComponent;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.protected ? (
                      <ProtectedRoute>
                        <Layout>
                          <Page />
                        </Layout>
                      </ProtectedRoute>
                    ) : (
                      <Layout>
                        <Page />
                      </Layout>
                    )
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
