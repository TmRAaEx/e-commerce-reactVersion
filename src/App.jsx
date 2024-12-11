import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import HeaderComp from './components/Header';
import FooterComp from "./components/footer.jsx";
import ProductPage from "./pages/product.jsx";

function App() {
    return (
        <BrowserRouter>
            <HeaderComp/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/product" element={<ProductPage/>}/>
            </Routes>
            <FooterComp/>
        </BrowserRouter>
    );
}

export default App;
