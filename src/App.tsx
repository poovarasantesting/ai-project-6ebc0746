import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import EventCardGenerator from "@/components/EventCardGenerator";

export default function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gray-50 p-4">
        <Routes>
          <Route path="/" element={<EventCardGenerator />} />
        </Routes>
      </main>
      <Toaster />
    </BrowserRouter>
  );
}