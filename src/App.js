import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/Home";
import Nav from "./components/nav/index";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="drinks/:slug" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
