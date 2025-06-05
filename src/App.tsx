import React from "react";
import { Calculator } from "./components/Calculator";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">React Calculator</h1>
      <Calculator />
      <Toaster />
    </div>
  );
}

export default App;