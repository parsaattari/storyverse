import {BrowserRouter,  Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import App from "./App";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<LandingPage initialValue="1" />} />
        <Route path="/explore" element={<LandingPage initialValue="2" />} />
        <Route path="/account" element={<LandingPage initialValue="3" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;