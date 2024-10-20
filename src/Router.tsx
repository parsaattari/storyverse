import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage initialValue="0" />} />
        <Route path="/create" element={<LandingPage initialValue="1" />} />
        <Route path="/explore" element={<LandingPage initialValue="2" />} />
        <Route path="/account" element={<LandingPage initialValue="3" />} />
      </Routes>
    </Router>
  );
}

export default App;