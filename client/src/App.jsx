import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Headline from "./components/Headline";
import WebsiteHome from "./components/WebsiteHome";
import QuickLinks from "./components/QuickLinks";
import Catalog from "./pages/Catalog";
import App_From_original from "./App_From_original";
import NotFound from "./pages/NotFound.jsx";

function App() {
    return (
        <BrowserRouter>
            <Headline headline="Welcome to our store"/>
            <Navbar brand="MyPhoneCase"/>
            <Routes>
                <Route path="/" element={<WebsiteHome/>}/>
                <Route path="/Home" element={<App_From_original/>}/>
                <Route path="/Catalog" element={<Catalog/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <QuickLinks/>
        </BrowserRouter>
    );
}

export default App;
