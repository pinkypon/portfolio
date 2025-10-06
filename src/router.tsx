import { BrowserRouter, Route, Routes } from "react-router-dom";
import Taskly from "./pages/taskly";
import ChatAI from "./pages/chat-ai";
import LandingPage from "./App"; // This is your landing page

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects/taskly" element={<Taskly />} />
        <Route path="/projects/chatai" element={<ChatAI />} />
      </Routes>
    </BrowserRouter>
  );
}
