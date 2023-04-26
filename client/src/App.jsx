import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Headline from "./components/Headline";
import WebsiteHome from "./components/WebsiteHome";
import QuickLinks from "./components/QuickLinks";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";
import App_From_original from "./App_From_original";

function App() {
  return (
    <BrowserRouter>
      <Headline headline="Welcome to our store" />
      <Navbar brand="MyPhoneCase" />
      <Routes>
        <Route path="/" element={<WebsiteHome />} />
        <Route path="/Home" element={<App_From_original />} />
        <Route path="/Catalog" element={<Catalog />} />
      </Routes>
      <QuickLinks />
    </BrowserRouter>
  );
}

export default App;