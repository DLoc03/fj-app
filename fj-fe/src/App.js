import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./global.css";
import { routes } from "./routes/index";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";

function App() {
  return (
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
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
