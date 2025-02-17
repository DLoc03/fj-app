import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import Candidate from "./page/Candidate/Candidate";
import "./global.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Procedure from "./page/Procedure/Procedure";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/procedure" element={<Procedure />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
