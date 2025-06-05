import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CheckoutPage from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold mb-4">Home Page</h1><a href="/checkout" className="text-blue-600 underline">Go to Checkout</a></div>} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;