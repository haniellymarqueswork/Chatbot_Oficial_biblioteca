import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbot from "../pages/Chatbot";
import Start from "../pages/Start";

export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
         <Route path="/" element={<Start />} />
        <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
        </BrowserRouter>
    );
}