import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import User from "./scenes/user";
import Invoices from "./scenes/invoices";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CompInfo from "./scenes/comp-info/index";
import Company from "./scenes/company";
import { AuthProvider } from "./auth/authContext";
import AuthForm from "./auth/authForm";
import { AuthProtect } from "./auth/authProtect";

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
                        <Route path="/company" element={<Company />} />
                        <Route path="/form" element={<Form />} />
                        <Route path="comp-form/" element={<CompInfo />} />
                        <Route path="user/form/:id" element={<Form />} />
                        <Route
                          path="company/comp-form/:id"
                          element={<CompInfo />}
                        />
                        <Route path="/invoices" element={<Invoices />} />
                        <Route path="/bar" element={<Bar />} />
                        <Route path="/faq" element={<FAQ />} />
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
