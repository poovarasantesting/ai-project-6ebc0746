import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, CreditCard, Lock, Truck } from "lucide-react";

// Form type definitions
type ShippingFormData = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type PaymentFormData = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
};

// Mock cart items
const cartItems = [
  {
    id: 1,
    name: "Basic T-Shirt",
    price: 19.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 49.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=80"
  }
];

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  
  const { register: registerShipping, handleSubmit: handleShippingSubmit, formState: { errors: shippingErrors } } = 
    useForm<ShippingFormData>();
  
  const { register: registerPayment, handleSubmit: handlePaymentSubmit, formState: { errors: paymentErrors } } = 
    useForm<PaymentFormData>();
  
  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  const onShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep("payment");
    window.scrollTo(0, 0);
  };
  
  const onPaymentSubmit = (data: PaymentFormData) => {
    console.log("Payment data:", data);
    console.log("Shipping data:", shippingData);
    setStep("confirmation");
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (step === "payment") {
      setStep("shipping");
    } else if (step === "confirmation") {
      setStep("payment");
    }
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shopping
        </Link>
        <h1 className="text-3xl font-bold">Checkout</h1>
        
        {/* Checkout Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step === "shipping" || step === "payment" || step === "confirmation" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                1
              </div>
              <span className="text-sm">Shipping</span>
            </div>
            <div className="h-1 flex-1 mx-4 bg-gray-200">
              <div className={`h-full ${step === "payment" || step === "confirmation" ? "bg-blue-600" : "bg-gray-200"}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step === "payment" || step === "confirmation" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                2
              </div>
              <span className="text-sm">Payment</span>
            </div>
            <div className="h-1 flex-1 mx-4 bg-gray-200">
              <div className={`h-full ${step === "confirmation" ? "bg-blue-600" : "bg-gray-200"}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step === "confirmation" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                3
              </div>
              <span className="text-sm">Confirmation</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === "shipping" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Shipping Information
              </h2>
              
              <form onSubmit={handleShippingSubmit(onShippingSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input 
                      type="text"
                      className={`w-full p-2 border rounded-md ${shippingErrors.fullName ? "border-red-500" : "border-gray-300"}`}
                      placeholder="John Doe"
                      {...registerShipping("fullName", { required: "Full name is required" })}
                    />
                    {shippingErrors.fullName && <p className="text-red-500 text-xs mt-1">{shippingErrors.fullName.message}</p>}
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input 
                      type="email"
                      className={`w-full p-2 border rounded-md ${shippingErrors.email ? "border-red-500" : "border-gray-300"}`}
                      placeholder="john.doe@example.com"
                      {...registerShipping("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Please enter a valid email"
                        }
                      })}
                    />
                    {shippingErrors.email && <p className="text-red-500 text-xs mt-1">{shippingErrors.email.message}</p>}
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Street Address</label>
                    <input 
                      type="text"
                      className={`w-full p-2 border rounded-md ${shippingErrors.address ? "border-red-500" : "border-gray-300"}`}
                      placeholder="123 Main St"
                      {...registerShipping("address", { required: "Address is required" })}
                    />
                    {shippingErrors.address && <p className="text-red-500 text-xs mt-1">{shippingErrors.address.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input 
                      type="text"
                      className={`w-full p-2 border rounded-md ${shippingErrors.city ? "border-red-500" : "border-gray-300"}`}
                      placeholder="New York"
                      {...registerShipping("city", { required: "City is required" })}
                    />
                    {shippingErrors.city && <p className="text-red-500 text-xs mt-1">{shippingErrors.city.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">State / Province</label>
                    <input 
                      type="text"
                      className={`w-full p-2 border rounded-md ${shippingErrors.state ? "border-red-500" : "border-gray-300"}`}
                      placeholder="NY"
                      {...registerShipping("state", { required: "State is required" })}
                    />
                    {shippingErrors.state && <p className="text-red-500 text-xs mt-1">{shippingErrors.state.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP / Postal Code</label>
                    <input 
                      type="text"
                      className={`w-full p-2 border rounded-md ${shippingErrors.zipCode ? "border-red-500" : "border-gray-300"}`}
                      placeholder="10001"
                      {...registerShipping("zipCode", { required: "ZIP code is required" })}
                    />
                    {shippingErrors.zipCode && <p className="text-red-500 text-xs mt-1">{shippingErrors.zipCode.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select 
                      className={`w-full p-2 border rounded-md ${shippingErrors.country ? "border-red-500" : "border-gray-300"}`}
                      {...registerShipping("country", { required: "Country is required" })}
                    >
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                    {shippingErrors.country && <p className="text-red-500 text-xs mt-1">{shippingErrors.country.message}</p>}
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {step === "payment" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button 
                onClick={goBack}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shipping
              </button>
              
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </h2>
              
              <div className="mb-4 flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">Secure Payment Processing</span>
                </div>
                <div className="flex space-x-2">
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Visa" className="h-8" />
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196561.png" alt="MasterCard" className="h-8" />
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196539.png" alt="American Express" className="h-8" />
                </div>
              </div>
              
              <form onSubmit={handlePaymentSubmit(onPaymentSubmit)}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input 
                      type="text"
                      className={`w-full p-2 border rounded-md ${paymentErrors.cardNumber ? "border-red-500" : "border-gray-300"}`}
                      placeholder="4242 4242 4242 4242"
                      {...registerPayment("cardNumber", { 
                        required: "Card number is required",
                        pattern: {
                          value: /^[0-9]{16}$/,
                          message: "Please enter a valid 16-digit card number"
                        }
                      })}
                    />
                    {paymentErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{paymentErrors.cardNumber.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Name on Card</label>
                    <input 
                      type="text"
                      className={`w-full p-2 border rounded-md ${paymentErrors.cardName ? "border-red-500" : "border-gray-300"}`}
                      placeholder="John Doe"
                      {...registerPayment("cardName", { required: "Name on card is required" })}
                    />
                    {paymentErrors.cardName && <p className="text-red-500 text-xs mt-1">{paymentErrors.cardName.message}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry Date</label>
                      <input 
                        type="text"
                        className={`w-full p-2 border rounded-md ${paymentErrors.expiryDate ? "border-red-500" : "border-gray-300"}`}
                        placeholder="MM/YY"
                        {...registerPayment("expiryDate", { 
                          required: "Expiry date is required",
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                            message: "Please use MM/YY format"
                          }
                        })}
                      />
                      {paymentErrors.expiryDate && <p className="text-red-500 text-xs mt-1">{paymentErrors.expiryDate.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input 
                        type="text"
                        className={`w-full p-2 border rounded-md ${paymentErrors.cvv ? "border-red-500" : "border-gray-300"}`}
                        placeholder="123"
                        {...registerPayment("cvv", { 
                          required: "CVV is required",
                          pattern: {
                            value: /^[0-9]{3,4}$/,
                            message: "CVV must be 3 or 4 digits"
                          }
                        })}
                      />
                      {paymentErrors.cvv && <p className="text-red-500 text-xs mt-1">{paymentErrors.cvv.message}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Place Order (${total.toFixed(2)})
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {step === "confirmation" && (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been placed successfully.</p>
                <p className="text-sm text-gray-500 mb-6">Order #: ORD-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
              </div>
              
              <div className="mb-6 text-left p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">Order Details</h3>
                <div className="space-y-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link to="/" className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Continue Shopping
                </Link>
                <button className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
                  View Order Details
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex py-3 border-b">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 border-b pb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between py-4 font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            {step !== "confirmation" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm">
                <p className="font-medium mb-2">Need Help?</p>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <a href="#" className="hover:text-blue-600">Shipping Policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">Returns & Exchanges</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">Contact Support</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}