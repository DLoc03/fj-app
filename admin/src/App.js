import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AuthProvider } from "./context/auth";
import { AuthProtect } from "./components/auth/authProtect";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import User from "./scenes/user/index";
import Job from "./scenes/job/index";
import Company from "./scenes/company/index";
import CompInfo from "./scenes/company/_id";
import AuthForm from "./components/auth/authForm";
import Form from "./scenes/user/_id";
import JobForm from "./scenes/job/_id";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {!isLoginPage && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
                <Route path="/login" element={<AuthForm />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route
                  path="/*"
                  element={
                    <AuthProtect>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/user" element={<User />} />
                        <Route path="user/form/:id" element={<Form />} />
                        <Route path="/company" element={<Company />} />
                        <Route path="/job" element={<Job />} />
                        <Route path="/comp-form" element={<CompInfo />} />
                        <Route path="job/:id" element={<JobForm />} />
                        <Route
                          path="/company/comp-form/:id"
                          element={<CompInfo />}
                        />
                      </Routes>
                    </AuthProtect>
                  }
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
